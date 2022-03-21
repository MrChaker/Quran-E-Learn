import React, {  useRef, useState } from 'react'
import { useThemeContext } from '../../Context/themeContext';
import { Button } from '../Button';
import { emailSign,  CheckLength, dataIsValid, CheckPass } from './functions';

const SignForm = () => {
  const { darkTheme } = useThemeContext();
  const formRef = useRef<HTMLFormElement>(null!);
  const c_pass = useRef<HTMLLabelElement>(null!);
  const name = useRef<HTMLLabelElement>(null!);
  const email = useRef<HTMLLabelElement>(null!);
  const pass = useRef<HTMLLabelElement>(null!);

  const [ passValidLength, setPassValidLength ] = useState(false);
  const [ passEqual, setPassEqual ] = useState(false);


  return (
    <form 
          dir="rtl" 
          onSubmit={
            (event: any) => emailSign( 
                event,
                dataIsValid([{
                  input: formRef.current.email,
                  errLabel: email.current
                 }],
                 [{
                  input: formRef.current.email,
                  errLabel: email.current,
                  options: { validation: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ }
                 }]) && passValidLength && passEqual ,
                {
                  name: event.target?.Name.value,
                  email: event.target?.email.value,
                  password: event.target?.password.value,
                  sex: event.target?.sex.value
                },
                email.current,
                '/auth/sign'
              ) 
          }
          ref={formRef}
        >
            {/* <label htmlFor="name">الاسم</label> */}
            <input type="text" placeholder="الاسم" name="Name"/>
            <label htmlFor="nameErr" ref={name}></label>
            <input type="text" placeholder="الايميل" name="email"/>
            <label htmlFor="emailErr" ref={email}></label>
            <input type="password" placeholder="كلمة السّر" name="password" onChange={
                () => setPassValidLength(CheckLength({
                  input: formRef.current.password,
                  errLabel: pass.current 
                }))
            }/>
            <label htmlFor="passErr" ref={pass}></label>
            <input type="password" placeholder="تأكيد كلمة السّر" name="c_password" onChange={
                () => setPassEqual(CheckPass(
                  formRef.current.password  ,
                  {
                    input: formRef.current.c_password,
                    errLabel: c_pass.current 
                  })
                )
            } />
            <label htmlFor="c_passErr" ref={c_pass} ></label>
            <div className="flex gap-4 items-center w-full">
              <label htmlFor="sex" className="notErr m-2"> الجنس</label>
              <label className="notErr mr-8"> ذكر </label>
              <input type="radio" id="male" name="sex" value="male" checked/>
              <label className="notErr"> أنثى </label>
              <input type="radio" id="female" name="sex" value="female"/>
            </div>
            
            <Button
              color = { !darkTheme ? "var(--main-color)" : "var(--light-color)" }
              txtColor={ darkTheme ? "var(--main-color)" : "var(--light-color)" }
              text = "تسجيل حسابك"
              block
              size = "1.25rem"
              type = "submit"
            />
        </form>
  )
}

export default SignForm