import { io, Socket } from "socket.io-client"
import Peer from "simple-peer"
import React, { createContext, MutableRefObject, useContext, useEffect, useRef, useState } from "react"
import { NextPageContext } from "next"
import Router from "next/router"
import { UserInterface } from "../../../BackEnd/Utils/userInterface"
import { UserContext } from "../../../pages/_app"

type PeerUser = {user: UserInterface | null , socketID: string}

interface SocketContextType {
  teacherPeer: MutableRefObject<Peer.Instance>,
  teacherVid: MutableRefObject<HTMLVideoElement>,
  stream: MediaStream,
  joined: PeerUser[],
  peersRef: MutableRefObject<{peerUser: PeerUser,peer: Peer.Instance}[]>,
  talkingStudent: MutableRefObject<MediaStream>
}
export const SocketCtxProvider = createContext<SocketContextType>(null!)
const socket = io(process.env.NEXT_PUBLIC_URL || 'http://localhost:8000');
     
const SocketContext = ( {children, Room, user} : {children: any, Room: string | string[] | undefined, user: UserInterface | null } ) => {


  const teacherID = useRef<string | string[] | undefined>(Room?.slice(6));
  const [joined, setJoined] = useState<PeerUser[]>([]);

  const stream = useRef<MediaStream>(null!);
  const peersRef = useRef<{peerUser: PeerUser,peer: Peer.Instance}[]>([]);
  const teacherPeer = useRef<Peer.Instance>(null!);
  const teacherVid  = useRef<HTMLVideoElement>(null!);

  const talkingStudent = useRef<MediaStream>(null!)

  useEffect(() => {
    if( user?._id == teacherID.current  ){
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        stream.current = currentStream
        console.log(stream.current)
        teacherVid.current.srcObject = currentStream;
        socketLogique();
      });
    }else{
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        stream.current = currentStream;
        console.log(stream.current)
        socketLogique();
      });
    }
  }, []);

    const socketLogique = ()=>{
      socket.emit("user joined", {user, Room});
      
      socket.on('roomates', (joinedUsers)=>{
        const peers: Peer.Instance[] = [];
        joinedUsers.forEach((joinedUser:PeerUser) => {

            if( joinedUser.user?._id !== user?._id ){
            const peer = createPeer( {user: user, socketID: socket.id} , stream.current, joinedUser);
            peersRef.current.push({
                peerUser: joinedUser,
                peer,
            })  
            peers.push(peer);
            if ( joinedUser.user?._id == teacherID.current){
              teacherPeer.current = peer;
              /* peer.on('stream', stream =>{
                teacherVid.current.srcObject = stream
              })  */
            }
          }
        })
        setJoined(joinedUsers.filter((j: any) => j.user._id !== user?._id))
      })
      
      socket.on("connenct with joining user", ({signal, joiningUser, userConnecting})=>{
        const peer = addPeer(signal, joiningUser, stream.current, userConnecting);
        peersRef.current.push({
            peerUser: joiningUser,
            peer,
        });
        setJoined([...joined, joiningUser])
      })

      socket.on('recieved returning signal', ({signal, returnedFrom})=>{
        const item = peersRef.current.find(p => p.peerUser.socketID == returnedFrom.socketID );
        console.log(signal)
        item?.peer.signal(signal);
      })

      socket.on("user left", (joinedUsers)=>{
          setJoined(joinedUsers)
      })
    }  

  const createPeer = ( from: PeerUser ,stream: MediaStream, userToSignal: PeerUser)=>{

    const peer = new Peer({ initiator: true, trickle: false, stream });
    
    peer.on('signal', (signal) => {
      socket.emit('send signal', { signal, Room, from, userToSignal });
    });

    return peer
  }

  const addPeer = (signal: Peer.SignalData, joiningUser: PeerUser, stream: MediaStream, addTo: PeerUser )=>{
      const peer = new Peer({
          initiator: false, 
          trickle: false,
          stream,
      });
      console.log(stream);
      peer.on("signal", (sg) => {
          console.log(sg)
          socket.emit("returning signal", { sg, joiningUser, returnedFrom: addTo })
      })
      
      peer.signal(signal);

      return peer;
  }
  
  return (
    <> 
      <SocketCtxProvider.Provider value={{
        
        teacherPeer,

        teacherVid,

        stream: stream.current,
        
        joined,

        peersRef,

        talkingStudent
      }}>
        {children}
      </SocketCtxProvider.Provider>
      </>
  )
}  


export default SocketContext