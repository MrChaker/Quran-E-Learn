import React, { useContext } from 'react'
import SocketContext from '../../FrontEnd/components/Meeting/SocketContext'
import VideoPlayer from '../../FrontEnd/components/Meeting/VideoPlayer'
import useIsAuth from '../../hooks/useIsAuth'
import { UserContext } from '../_app'
const MeetRoom = () => {
  /* useIsAuth() */
  const { user } = useContext(UserContext) ;

  return (
    <SocketContext Room = { "MeetRoom" }  >
      <VideoPlayer />
    </SocketContext>
  )
}

export default MeetRoom