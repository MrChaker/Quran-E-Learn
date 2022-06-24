import { GetServerSidePropsContext } from 'next';
import AuthLayout from '../../FrontEnd/components/auth/authLayout';
import LoginForm from '../../FrontEnd/components/auth/loginForm';
import { getUserProps } from '../../FrontEnd/getUserProps';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const res = await getUserProps(context.req.headers.cookie);
  if (res.props?.user)
    return {
      redirect: {
        permanent: false,
        destination: '/dashboard',
      },
    };
  return { props: {} }; // noredirection
}

const Login = () => {
  return <AuthLayout page="login" form={<LoginForm />} />;
};
export default Login;
