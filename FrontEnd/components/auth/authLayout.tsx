import Link from 'next/link'
import React from 'react'

type PropsType = {
  page: "login" | "signUp",
  form: JSX.Element
}
const AuthLayout = (props: PropsType) => {
  return (
    <>
      <div className="flex py-4 justify-center items-center text-darkColor dark:text-lightColor">
      <div className="Auth">   
        <p className="text-4xl mb-4">
          {
            props.page == "login" 
            ? 'تسجيل الدّخول الى حسابك' : 'أنشىء حسابك المجاني   '
          }
        </p>
        <p>
          {
            props.page == "login" 
            ? 'ليس لديك حساب ؟' : 'لديك حساب ؟  '
          }
          
          <Link href={`/auth/${props.page == "login" ? 'signup' : 'login'}`}>
            <a> 
            {
              props.page == "login" 
              ? 'انشئ حساب ' : 'سجّل دخولك  '
            }
            </a>
          </Link>
        </p>
          { props.form }
        </div>
      </div>
    </>
  )
}

export default AuthLayout