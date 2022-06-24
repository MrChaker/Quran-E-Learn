import { GetServerSidePropsContext } from 'next';
import TeachersList from '../../FrontEnd/components/teachers/TeachersList';
import { getUserProps } from '../../FrontEnd/getUserProps';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await getUserProps(context.req.headers.cookie);
}

const Teachers = ({ ...props }) => {
  return <TeachersList user={props.user} />;
};

export default Teachers;
