import Router from 'next/router';

const useIsAuth = (user: any, teacherOnly?: boolean, studentOnly?: boolean) => {
  if (!user) {
    Router.push('/auth/login');
    return;
  }
  if (!user.roles.teacher && teacherOnly) {
    Router.push('/dashboard');
    return;
  }
  if (user.roles.teacher && studentOnly) {
    Router.push('/dashboard');
    return;
  }
};

export default useIsAuth;
