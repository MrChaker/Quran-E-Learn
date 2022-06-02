import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import React, {
  createContext,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from 'react';

import { UserInterface } from '../../interfaces/userInterface';
import { UserContext } from './userContext';

type PeerUser = { user: UserInterface | null; socketID: string };

interface SocketContextType {
  teacherPeer: MutableRefObject<{
    peer: Peer.Instance | null;
    socketID: string | null;
  }>;
  teacherVid: MutableRefObject<HTMLVideoElement>;
  stream: MediaStream;
  joined: PeerUser[];
  peersRef: MutableRefObject<{ peerUser: PeerUser; peer: Peer.Instance }[]>;
  talkingStudent: MutableRefObject<MediaStream>;
}
export const SocketCtxProvider = createContext<SocketContextType>(null!);
const socket = io(process.env.NEXT_PUBLIC_URL || 'http://localhost:8000');

const SocketContext = ({
  children,
  Room,
  user,
}: {
  children: any;
  Room: string | string[] | undefined;
  user: UserInterface | null;
}) => {
  const teacherID = useRef<string | string[] | undefined>(Room?.slice(6));
  const [joined, setJoined] = useState<PeerUser[]>([]);

  const stream = useRef<MediaStream>(null!);
  const peersRef = useRef<{ peerUser: PeerUser; peer: Peer.Instance }[]>([]);
  const teacherPeer = useRef<{
    peer: Peer.Instance | null;
    socketID: string | null;
  }>(null!);
  const teacherVid = useRef<HTMLVideoElement>(null!);

  const talkingStudent = useRef<MediaStream>(null!);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        stream.current = currentStream;
        if (user?._id == teacherID.current) {
          teacherVid.current.srcObject = currentStream;
        }
        socketLogique();
      });
  }, []);

  const socketLogique = () => {
    socket.emit('user joined', { user, Room });

    socket.on('roomates', ({ joinedUsers }) => {
      joinedUsers.forEach((joinedUser: PeerUser) => {
        if (
          joinedUser.user?._id == teacherID.current &&
          joinedUser.user?._id !== user?._id
        ) {
          const peer = createPeer(
            { user: user, socketID: socket.id },
            stream.current,
            joinedUser
          );
          teacherPeer.current = { peer, socketID: joinedUser.socketID };
        }
      });
      setJoined(joinedUsers.filter((j: any) => j.user._id !== user?._id));
    });

    socket.on(
      'connenct with joining user',
      ({ signal, joiningUser, userConnecting }) => {
        const peer = addPeer(
          signal,
          joiningUser,
          stream.current,
          userConnecting
        );
        peersRef.current.push({
          peerUser: joiningUser,
          peer,
        });
        setJoined([...joined, joiningUser]);
      }
    );

    socket.on('recieved returning signal', ({ signal, returnedFrom }) => {
      /* const item = peersRef.current.find(p => p.peerUser.socketID == returnedFrom.socketID );
        console.log(signal)
        item?.peer.signal(signal); */
      teacherPeer.current.peer?.signal(signal);
      /* stream.current.getVideoTracks().forEach(track =>{
          track.enabled = false
        }) */
    });

    socket.on('user left', ({ joinedUsers, socket }) => {
      setJoined(joinedUsers.filter((j: any) => j.user._id !== user?._id));
      const peerToDestroy = peersRef.current.find(
        (peer) => peer.peerUser.socketID === socket
      );
      peerToDestroy?.peer.destroy();
      peersRef.current = peersRef.current.filter(
        (peer) => peer.peerUser.socketID !== socket
      );
      if (teacherPeer.current.socketID === socket) {
        teacherPeer.current.peer = null;
        teacherPeer.current.socketID = null;
        teacherVid.current = new HTMLVideoElement();
      }
    });
  };

  const createPeer = (
    from: PeerUser,
    stream: MediaStream,
    userToSignal: PeerUser
  ) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on('signal', (signal) => {
      socket.emit('send signal', { signal, Room, from, userToSignal });
    });

    return peer;
  };

  const addPeer = (
    signal: Peer.SignalData,
    joiningUser: PeerUser,
    stream: MediaStream,
    addTo: PeerUser
  ) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });
    peer.on('signal', (sg) => {
      socket.emit('returning signal', { sg, joiningUser, returnedFrom: addTo });
    });

    peer.signal(signal);

    return peer;
  };

  return (
    <>
      <SocketCtxProvider.Provider
        value={{
          teacherPeer,

          teacherVid,

          stream: stream.current,

          joined,

          peersRef,

          talkingStudent,
        }}
      >
        {children}
      </SocketCtxProvider.Provider>
    </>
  );
};

export default SocketContext;
