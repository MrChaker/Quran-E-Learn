import { io } from "socket.io-client"
import Peer from "simple-peer"
import React, { createContext, MutableRefObject, useContext, useEffect, useRef, useState } from "react"
import { NextPageContext } from "next"
import Router from "next/router"
import { UserInterface } from "../../../BackEnd/Utils/userInterface"
import { UserContext } from "../../../pages/_app"

type CallType = {
  isReceivingCall: boolean,
  from: string,
  name: string,
  signal: any
}
interface SocketContextType {
  call: CallType,
  callAccepted: boolean,
  myVideo: MutableRefObject<HTMLVideoElement>,
  userVideo: MutableRefObject<HTMLVideoElement>,
  stream: MediaStream,
  name: string,
  setName: (name: string) => void,
  callEnded: boolean,
  me: string,
  callUser: (id: string) => void,
  leaveCall: () => void,
  answerCall: () => void,
  joined: string[]
}
export const SocketCtxProvider = createContext<SocketContextType>(null!)

const socket = io(process.env.NEXT_PUBLIC_URL || 'http://localhost:8000');


const SocketContext = ( {children, Room} : {children: any, Room: string | null } ) => {
  const [callAccepted, setCallAccepted] = useState<boolean>(false);
  const [callEnded, setCallEnded] = useState<boolean>(false);
  /* {id: string, state: boolean}[] */
  const [name, setName] = useState('');

  const [call, setCall] = useState<CallType>({
    isReceivingCall: false,
    from: '',
    name: '',
    signal: null
  });
  
  const [me, setMe] = useState('');
  const [ stream, setStream ] = useState<MediaStream>(null!);

  const myVideo = useRef<HTMLVideoElement>(null!)
  const userVideo = useRef<HTMLVideoElement>(null!);
  const connectionRef = useRef<Peer.Instance>(null!);
  const [ joined, setJoined ] = useState<string[]>([null!]);

  
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
      });

    socket.emit("user joined", Room)
    
    socket.on('roomates', (joinedUsers)=>{
      console.log(joinedUsers);
      setJoined(joinedUsers)
    })
    
    socket.on('me', (id) =>{ 
      setMe(id);
    });
    
    socket.on('callUser/client', ({ from, name: callerName, signal }) => {
      console.log(from + 'to' + callerName)
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });

    socket.on("userLeft/client", (id)=>{
      
    })

  }, []);

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({ initiator: false, trickle: false, stream });
    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id: string) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    
    connectionRef.current.destroy();
    socket.emit("user left",  Room)
    Router.push("/");
  };

  return (
    <> 
    <SocketCtxProvider.Provider value={{
      call,
      callAccepted,
      myVideo,
      userVideo,
      stream,
      name,
      setName,
      callEnded,
      me,
      callUser,
      leaveCall,
      answerCall,
      joined
    }}>
      {children}
    </SocketCtxProvider.Provider>
    </>
  )
  
}

export default SocketContext