import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';
import { useThemeContext } from '../../Context/themeContext';
import { Button } from '../general/Button';
import { emailSign, CheckLength, dataIsValid } from './functions';
import ResendBox from './resendBox';
const LoginForm = () => {
  const { darkTheme } = useThemeContext();

  const formRef = useRef<HTMLFormElement>(null!);
  const email = useRef<HTMLLabelElement>(null!);
  const pass = useRef<HTMLLabelElement>(null!);
  const confirmation = useRef<HTMLDivElement>(null);
  const [passValid, setPassValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const [resendEmail, setResendEmail] = useState(false);

  const submit = (event: any) => {
    let passValidOnSubmit = CheckLength({
      input: formRef.current.password,
      errLabel: pass.current,
    });
    setLoading(true);
    emailSign(
      event,
      (dataIsValid(
        [
          {
            input: formRef.current.email,
            errLabel: email.current,
            errMessage: 'املئ الفراغ من فضلك',
          },
        ],
        [
          {
            input: formRef.current.email,
            errLabel: email.current,
            errMessage: 'ادخل ايميل صحيح من فضلك',
            options: {
              validation: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            },
          },
        ]
      ) &&
        passValid) ||
        passValidOnSubmit,
      {
        email: event.target?.email.value,
        password: event.target?.password.value,
      },
      '/auth/loginAPI',
      confirmation.current,
      undefined,
      pass.current
    ).then(() => setLoading(false));
  };

  return (
    <>
      <form dir="rtl" onSubmit={(event: any) => submit(event)} ref={formRef}>
        <div
          ref={confirmation}
          className="p-4 bg-red-100 rounded-lg border border-red-600 text-center w-full hidden"
        >
          الرجاء تأكيد البريد الالكتروني<br></br> لم تصلك رسالة ؟
          <span
            className="cursor-pointer text-blue-700 mr-2"
            onClick={() => {
              setResendEmail(true);
            }}
          >
            اعادة ارسال رسالة التأكيد
          </span>
        </div>
        <input type="text" placeholder="الايميل" name="email" />
        <label htmlFor="emailErr" ref={email}></label>
        <input
          type="password"
          placeholder="كلمة السّر"
          name="password"
          onChange={() =>
            setPassValid(
              CheckLength({
                input: formRef.current.password,
                errLabel: pass.current,
              })
            )
          }
        />
        <label htmlFor="passErr" ref={pass}></label>
        <Button
          color={!darkTheme ? 'var(--main-color)' : 'var(--light-color)'}
          txtColor={darkTheme ? 'var(--main-color)' : 'var(--light-color)'}
          text="تسجيل الدّخول"
          block
          size="1.25rem"
          type="submit"
          leftIcon={
            loading ? (
              <FontAwesomeIcon icon="circle-notch" className="spinner" />
            ) : undefined
          }
        />
        {resendEmail && <ResendBox />}
      </form>
    </>
  );
};

export default LoginForm;
