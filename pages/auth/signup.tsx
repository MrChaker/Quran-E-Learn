import { GetServerSidePropsContext, NextPage } from 'next';
import AuthLayout from '../../FrontEnd/components/auth/authLayout';
import SignForm from '../../FrontEnd/components/auth/signForm';
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
const Signup: NextPage = () => {
  return (
    <>
      <AuthLayout page="signUp" form={<SignForm />} />
    </>
  );
};
export default Signup;
