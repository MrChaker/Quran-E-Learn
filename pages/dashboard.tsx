import { NextPage } from 'next';
import { useContext } from 'react';
import StudentDashboard from '../FrontEnd/components/dashboard/studentDash';
import TeacherDash from '../FrontEnd/components/dashboard/teacherDash';
import { UserContext } from '../FrontEnd/Context/userContext';
import useIsAuth from '../FrontEnd/hooks/useIsAuth';

const Dashboard: NextPage = () => {
  useIsAuth();

  const { user } = useContext(UserContext);
  if (!user.info?.roles?.teacher) return <StudentDashboard />;
  else return <TeacherDash />;
};

export default Dashboard;
