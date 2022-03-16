import React, {useContext, useEffect, useRef} from 'react'
import { ThemeCentext } from '../../Layouts/layout'
import { Button } from '../Button'
import  {SocketCtxProvider} from './SocketContext'
const VideoPlayer = () => {
  const { teacherPeer, teacherVid, joined } = useContext(SocketCtxProvider)
  const {darkTheme} = useContext(ThemeCentext);

  useEffect(() => {
    if( teacherPeer.current ){
      teacherPeer.current.on("stream", stream => {
        teacherVid.current.srcObject = stream;
      })
    }
  }, [teacherPeer, joined]);

  return (
  <>
    <div className='absolute h-screen w-4/5 '>
      {
        teacherVid ? 
        <video ref={teacherVid} muted autoPlay width='100%' height='100%'/> :
        <div>البث منقطع حاليا</div>
      }
    </div>
  </>)
}

export default VideoPlayer


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