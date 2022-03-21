import { NextPage } from "next";
import { useContext } from 'react'
import { UserContext } from '../../FrontEnd/Context/userContext'
import Router from 'next/router'
import AuthLayout from "../../FrontEnd/components/auth/authLayout";
import SignForm from "../../FrontEnd/components/auth/signForm";

const Signup :NextPage = () => {
  const { user } = useContext(UserContext);
  if (user.isAuthenticated){
    Router.push('/')
  }
  return (
    <AuthLayout page="signUp" form={<SignForm />}/>
  )
}
export default Signup
