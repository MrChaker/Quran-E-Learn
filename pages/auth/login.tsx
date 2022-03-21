import { NextPage } from "next"
import { useContext } from 'react'
import Router from 'next/router'
import { UserContext } from '../../FrontEnd/Context/userContext'
import AuthLayout from "../../FrontEnd/components/auth/authLayout";
import LoginForm from "../../FrontEnd/components/auth/loginForm";

const Login :NextPage = () => {
  const { user } = useContext(UserContext)
  if (user.isAuthenticated){
    Router.push('/')
  }
  return (
    <AuthLayout page="login" form={<LoginForm />}/>
  )
}
export default Login
