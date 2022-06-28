import AuthLayout from '../../FrontEnd/components/auth/authLayout';
import SignForm from '../../FrontEnd/components/auth/signForm';
import { useRouter } from 'next/router';
const Signup = ({ ...props }) => {
  const router = useRouter();
  if (props.user) router.push('/dashboard');
  return <>{!props.user && <AuthLayout page="signUp" form={<SignForm />} />}</>;
};
export default Signup;
