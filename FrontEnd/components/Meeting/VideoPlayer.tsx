import React, { useContext, useEffect } from 'react';
import { SocketCtxProvider } from '../../Context/SocketContext';

const VideoPlayer = () => {
  const { teacherPeer, teacherVid, joined, peersRef } =
    useContext(SocketCtxProvider);

  useEffect(() => {
    if (teacherPeer.current) {
      teacherPeer.current.peer?.on('stream', (stream) => {
        teacherVid.current.srcObject = stream;
      });
    }
  }, [teacherPeer, joined]);

  useEffect(() => {
    if (peersRef.current) {
      peersRef.current.forEach((peer) => {
        if (peer.peer != teacherPeer.current.peer) {
          peer.peer.on('stream', (stream) => {
            const audio = new Audio();
            audio.srcObject = stream;
            audio.play();
          });
        }
      });
    }
  }, [peersRef]);

  return (
    <>
      <div className=" h-screen w-4/5 left-0  ">
        {teacherVid ? (
          <video ref={teacherVid} autoPlay muted width="100%" height="100%" />
        ) : (
          <div>البث منقطع حاليا</div>
        )}
      </div>
    </>
  );
};

export default VideoPlayer;

/* 
<Button
      color={darkTheme ? "var(--light-color)" : `var(--main-color)`}
      txtColor={darkTheme ? `var(--main-color)` : "var(--light-color)"}
      text="call me"
      size="0.8rem"
      rounded
      onClick={()=>{callUser(me); answerCall()}}
    />
    {
      call.isReceivingCall &&
      <div className='text-lightColor text-4xl'>
        {call.from} is calling you
        <Button
          color={darkTheme ? "var(--light-color)" : `var(--main-color)`}
          txtColor={darkTheme ? `var(--main-color)` : "var(--light-color)"}
          text="answer call"
          size="0.8rem"
          rounded
          onClick={()=>{answerCall()}}
        />
      </div>
    }
    {
      joined &&
      <div className=''>
        {
          joined.slice(0).map((j, i)=>(
            <>
              {
               j != me && <p 
              key={i}
              onClick={()=>{
                callUser(j);
              }}
              >{j}</p>
              }
            </>
          ))
        }
      </div>
    }
*/
