import { useEffect } from 'react';
import Router from 'next/router';

const useIsAuth = (isTeacher: boolean = false) => {
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (!storedUser.isAuthenticated || (isTeacher && !storedUser.isTeacher))
      Router.push('/auth/login');
    if (!storedUser.isConfirmed) {
      Router.push('/confirmation');
    }
  }, []);
};

export default useIsAuth;
