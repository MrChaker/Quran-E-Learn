import axios from 'axios';
import { UserInterface } from '../interfaces/userInterface';
import jwt, { Secret } from 'jsonwebtoken';

export async function getUserProps(
  cookie: any,
  teacherOnly?: boolean,
  studentOnly?: boolean
) {
  /* const loggedIn = verifyToken(cookie); */

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
    const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/auth/user`, {
      withCredentials: true,
      headers: {
        cookie,
      },
    });
    return res.data;
  } catch (err) {
    return null;
  }
};

const verifyToken = (cookie: string): boolean => {
  const jwtSecret: Secret = process.env.JWT_SECRET || '';
  console.log(cookie.slice(4));
  jwt.verify(cookie.slice(4), jwtSecret, async (err: any) => {
    if (err) {
      console.log(err);
      return false;
    }
  });
  return true;
};
