import { useEffect } from 'react';
import Router from 'next/router';

const useIsAuth = (isTeacher: boolean = false) => {
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (
      !storedUser.isAuthenticated &&
      (!isTeacher || (isTeacher && !storedUser.isTeacher))
    )
      Router.push('/auth/login');
  }, []);
};

export default useIsAuth;
