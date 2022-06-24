import SocketContext from '../../FrontEnd/Context/SocketContext';
import VideoPlayer from '../../FrontEnd/components/Meeting/VideoPlayer';
import Chat from '../../FrontEnd/components/Meeting/Chat';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next';
import { getUserProps } from '../../FrontEnd/getUserProps';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await getUserProps(context.req.headers.cookie);
}

const MeetRoom = ({ ...props }) => {
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
