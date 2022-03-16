import React, { useContext, useEffect } from 'react'
import SocketContext from '../../FrontEnd/components/Meeting/SocketContext'
import VideoPlayer from '../../FrontEnd/components/Meeting/VideoPlayer'
import Chat from '../../FrontEnd/components/Meeting/Chat'

import useIsAuth from '../../hooks/useIsAuth'
import { UserContext } from '../_app'
import {useRouter} from "next/router"
const MeetRoom = () => {
  useIsAuth();
  const { user } = useContext(UserContext)
  const Router = useRouter();
  const { MeetRoom } = Router.query
  return (
    <>
      {
        user.info && MeetRoom &&
        <SocketContext user={user.info} Room = { `room//${MeetRoom}` }  >
          <VideoPlayer />
          <Chat />
        </SocketContext>
      }
    </>
  )
}

export default MeetRoom