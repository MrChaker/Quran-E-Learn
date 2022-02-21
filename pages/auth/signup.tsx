import { NextPage } from "next";
import { Button } from "../../FrontEnd/components/Button"
import { useContext, useRef } from 'react'
import { UserContext } from '../_app';
import { useThemeContext } from "../../FrontEnd/Layouts/layout";
import Router from 'next/router'
import Link from 'next/link';
import Swal from "sweetalert2";
interface SignEvent extends Event{
  target: SignEventTarget;
}
interface SignEventTarget extends EventTarget{
  name: HTMLInputElement;
  email: HTMLInputElement;
  password: HTMLInputElement;
}

const Signup :NextPage = () => {
  const { darkTheme } = useThemeContext();
  const { user } = useContext(UserContext);
  const formRef = useRef<HTMLFormElement>(null!);
  const c_pass = useRef<HTMLLabelElement>(null!);
  const name = useRef<HTMLLabelElement>(null!);
  const email = useRef<HTMLLabelElement>(null!);
  const pass = useRef<HTMLLabelElement>(null!);

  const emailSign = async (e: SignEvent)=>{
    e.preventDefault();
    if( dataIsValid() ){
        const res = await fetch('/auth/sign', {
            method : "POST",
            headers:{
                 'Content-Type' : 'application/json'
            },
            body : JSON.stringify({ name: e.target?.name.value, email: e.target?.email.value, password: e.target?.password.value })
        });

        const result = await res.json();
        if ( result.err ) { Swal.fire('لقد حدث خطأ ، حاول مرة اخرى') }
        email.current.innerText = result.emailErr || '';
        if ( result.success ){
            location.assign('/')
        }
    }else{

    }
  }

  const CheckPass = ()=>{
    if (formRef.current.c_password.value != formRef.current.password.value ){
      c_pass.current.innerText = ' كلمتي السّر غير متشابهتين '
      return false
    }else{
      c_pass.current.innerText = ''
      return true
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
      if ( formRef.current.Name.value == '' ){
          name.current.innerText = 'املئ الفراغ من فضلك' ;
          b = false
      }else{
          name.current.innerText = '' ;
      }
      if ( formRef.current.email.value == '' ){
          email.current.innerText = 'املئ الفراغ من فضلك' ;
          b = false
      }else{
          email.current.innerText = '' ;
      }
      
      return b && CheckLength() && CheckPass()
  }
  if (user.isAuthenticated){
    Router.push('/')
  }
  return (
    <div className="flex py-4 justify-center items-center text-darkColor dark:text-lightColor ">
      <div className="Auth">   
        <p className="text-4xl mb-4">
          أنشىء حسابك المجاني   
        </p>
        {<p>
          لديك حساب ؟ 
          <Link href="/auth/login">
            <a> سجل الدخول </a>
          </Link>
        </p>}
        <form 
          dir="rtl" 
          onSubmit={(event: any)=>emailSign(event)}
          ref={formRef}
        >
            {/* <label htmlFor="name">الاسم</label> */}
            <input type="text" placeholder="الاسم" name="Name"/>
            <label htmlFor="nameErr" ref={name}></label>
            <input type="text" placeholder="الايميل" name="email"/>
            <label htmlFor="emailErr" ref={email}></label>
            <input type="password" placeholder="كلمة السّر" name="password" onChange={CheckLength}/>
            <label htmlFor="passErr" ref={pass}></label>
            <input type="password" placeholder="تأكيد كلمة السّر" name="c_password" onChange={CheckPass} />
            <label htmlFor="c_passErr" ref={c_pass} ></label>
            <Button 
              color = { !darkTheme ? "var(--main-color)" : "var(--light-color)" }
              txtColor={ darkTheme ? "var(--main-color)" : "var(--light-color)" }
              text = "تسجيل حسابك"
              block
              size = "1.25rem"
              type = "submit"
            />
        </form>
        
      </div>
    </div>
  )
}
export default Signup
