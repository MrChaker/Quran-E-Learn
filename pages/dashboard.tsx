import { GetServerSidePropsContext } from 'next';
import StudentDashboard from '../FrontEnd/components/dashboard/studentDash';
import TeacherDash from '../FrontEnd/components/dashboard/teacherDash';

import { getUserProps } from '../FrontEnd/getUserProps';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await getUserProps(context.req.headers.cookie);
}

const Dashboard = ({ ...props }) => {
  if (!props.user.roles?.teacher) return <StudentDashboard user={props.user} />;
  else return <TeacherDash user={props.user} />;
};

export default Dashboard;
