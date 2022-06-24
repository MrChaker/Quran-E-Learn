import axios from 'axios';
import { UserInterface } from '../interfaces/userInterface';
export async function getUserProps(
  cookie: any,
  teacherOnly?: boolean,
  studentOnly?: boolean
) {
  const user: UserInterface = await fetchUser(cookie);
  if (!user)
    return {
      redirect: {
        permanent: false,
        destination: '/auth/login',
      },
    };
  if (!user.roles?.teacher && teacherOnly)
    return {
      redirect: {
        permanent: false,
        destination: '/dashboard',
      },
    };
  if (user.roles?.teacher && studentOnly)
    return {
      redirect: {
        permanent: false,
        destination: '/dashboard',
      },
    };
  return { props: { user } };
}

const fetchUser = async (cookie: string) => {
  try {
    const res = await axios.get(`http://localhost:8000/auth/user`, {
      withCredentials: true,
      headers: {
        cookie,
      },
    });
    return res.data;
  } catch (err) {
    console.log('err');
    return null;
  }
};
