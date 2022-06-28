import StudentDashboard from '../FrontEnd/components/dashboard/studentDash';
import TeacherDash from '../FrontEnd/components/dashboard/teacherDash';
import useIsAuth from '../FrontEnd/hooks/useIsAuth';

const Dashboard = ({ ...props }) => {
  useIsAuth(props.user);
  if (!props.user) return <></>;
  if (!props.user.roles?.teacher) return <StudentDashboard user={props.user} />;
  else return <TeacherDash user={props.user} />;
};

export default Dashboard;
