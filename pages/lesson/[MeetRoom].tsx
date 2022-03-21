import React, { ReactElement, useContext } from 'react'
import SocketContext from '../../FrontEnd/Context/SocketContext'
import VideoPlayer from '../../FrontEnd/components/Meeting/VideoPlayer'
import Chat from '../../FrontEnd/components/Meeting/Chat'

import useIsAuth from '../../FrontEnd/hooks/useIsAuth'
import { UserContext } from '../../FrontEnd/Context/userContext'
import {useRouter} from "next/router"
import  MeetLayout  from '../../FrontEnd/Layouts/meetLayout'
const  MeetRoom = () => {
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

/* MeetRoom.getLayout = function getLayout(page: ReactElement ) {
  return(
    <MeetLayout>
      {page}
    </MeetLayout>
  )
} */

export default MeetRoom