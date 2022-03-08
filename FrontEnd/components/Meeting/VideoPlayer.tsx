import React, {useContext} from 'react'
import { ThemeCentext } from '../../Layouts/layout'
import { Button } from '../Button'
import SocketContext, {SocketCtxProvider} from './SocketContext'
const VideoPlayer = () => {
  const { myVideo, stream, callAccepted, callEnded, userVideo, me, callUser, answerCall, joined, call, leaveCall } = useContext(SocketCtxProvider)
  const {darkTheme} = useContext(ThemeCentext);

  return (
  <>
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
    {
      stream && 
      <div className='w-64 h-92 fixed top-[70%] right-10'>
        <video ref={myVideo} muted autoPlay width='100%' height='100%'/>
      </div>
    }
    {
      callAccepted && !callEnded && 
      <div className='w-1/2'>
        <p 
          className='absolute text-3xl text-lightColor'
          onClick={()=>leaveCall()}
        >X</p>
        <video ref={userVideo} muted autoPlay width='100%' height='100%'/>
      </div>
    }

  </>)
}

export default VideoPlayer