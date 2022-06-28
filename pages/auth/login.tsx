import { useRouter } from 'next/router';
import AuthLayout from '../../FrontEnd/components/auth/authLayout';
import LoginForm from '../../FrontEnd/components/auth/loginForm';

const Login = ({ ...props }) => {
  const router = useRouter();
  if (props.user) router.push('/dashboard');
  return <AuthLayout page="login" form={<LoginForm />} />;
};
export default Login;
