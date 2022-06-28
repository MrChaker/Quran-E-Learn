import SocketContext from '../../FrontEnd/Context/SocketContext';
import VideoPlayer from '../../FrontEnd/components/Meeting/VideoPlayer';
import Chat from '../../FrontEnd/components/Meeting/Chat';
import { useRouter } from 'next/router';
import useIsAuth from '../../FrontEnd/hooks/useIsAuth';

const MeetRoom = ({ ...props }) => {
  useIsAuth(props.user);
  const Router = useRouter();
  const { MeetRoom } = Router.query;
  return (
    <>
      {MeetRoom && (
        <SocketContext user={props.user} Room={`room//${MeetRoom}`}>
          <div className="flex flex-row-reverse justify-between h-screen w-full ">
            <VideoPlayer />
            <Chat />
          </div>
        </SocketContext>
      )}
    </>
  );
};

/* MeetRoom.getLayout = function getLayout(page: ReactElement ) {
  return(
    <MeetLayout>
      {page}
    </MeetLayout>
  )
} */

export default MeetRoom;
