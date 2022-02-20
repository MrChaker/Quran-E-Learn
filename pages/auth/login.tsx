import { NextPage } from "next";
import { Button } from "../../FrontEnd/components/Button"
import { useContext, useRef } from 'react'
import { UserContext } from '../_app';
import Router from 'next/router'
import Link from 'next/link';
interface SignEvent extends Event{
  target: SignEventTarget;
}
interface SignEventTarget extends EventTarget{
  name?: HTMLInputElement;
  email: HTMLInputElement;
  password: HTMLInputElement;
}

const Signup :NextPage = () => {
  const { user } = useContext(UserContext);
  const formRef = useRef<HTMLFormElement>(null!);
  const email = useRef<HTMLLabelElement>(null!);
  const pass = useRef<HTMLLabelElement>(null!);

  const emailLogin = async (e: SignEvent)=>{
    e.preventDefault();
    if( dataIsValid() ){
        const res = await fetch('/auth/loginAPI', {
            method : "POST",
            headers:{
                 'Content-Type' : 'application/json'
            },
            body : JSON.stringify({ email: e.target?.email.value, password: e.target?.password.value })
        });

        const result = await res.json();
        pass.current.innerText = result.failure || '';
        if ( result.success ){
            location.assign('/')
        }
    }else{

    }
  }

  const CheckLength = ()=>{
      if ( formRef.current.password.value.length < 8 ){
          if ( formRef.current.password.value.length == 0 ){
              pass.current.innerText = 'ادخل كلمة السّر  '
          }else{
              pass.current.innerText = ' كلمة السّر قصيرة '
          }
          return false
      }else{
          pass.current.innerText = '';
          return true
      }
  }
  const dataIsValid = ()=>{
    let b = true ;
    if ( formRef.current.email.value == '' ){
        email.current.innerText = 'املئ الفراغ من فضلك' ;
        b = false
    }else{
        email.current.innerText = '' ;
    }
    return b && CheckLength()
  }
  if (user.isAuthenticated){
    Router.push('/')
  }
  return (
    <div className="flex py-20 justify-center items-center ">
      <div className="Auth">   
        <form 
          dir="rtl" 
          onSubmit={(event: any)=>emailLogin(event)}
          ref={formRef}
        >
            <input type="text" placeholder="الايميل" name="email"/>
            <label htmlFor="emailErr" ref={email}></label>
            <input type="password" placeholder="كلمة السّر" name="password" onChange={CheckLength}/>
            <label htmlFor="passErr" ref={pass}></label>
            <Button 
              color = "var(--main-color)"
              txtColor="#ffffff"
              text = "تسجيل الدّخول"
              block
              size = "1.25rem"
              type = "submit"
            />
        </form>
        <p>
          ليس لديك حساب ؟ 
          <Link href="/auth/signup">
            <a> انشئ حساب </a>
          </Link>
        </p>
      </div>
    </div>
  )
}
export default Signup
