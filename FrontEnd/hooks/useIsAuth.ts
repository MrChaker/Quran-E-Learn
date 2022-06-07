import { useEffect } from 'react';
import Router from 'next/router';
import { deCrypt } from '../../BackEnd/Utils/crypting';

const useIsAuth = (isTeacher: boolean = false) => {
  useEffect(() => {
    const storedUser = JSON.parse(
      deCrypt(
        localStorage.getItem('currentUser') || '',
        process.env.NEXT_PUBLIC_CRYPT
      ) || '{}'
    );
    if (!storedUser.isAuthenticated || (isTeacher && !storedUser.isTeacher))
      Router.push('/auth/login');
  }, []);
};

export default useIsAuth;
