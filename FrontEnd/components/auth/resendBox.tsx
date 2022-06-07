import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';
import { Button } from '../general/Button';

const ResendBox = () => {
  const resendInput = useRef<HTMLInputElement>(null!);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);

  const resend = async (email: string) => {
    setLoading(true);
    const res = await fetch(`/auth/resendEmail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    if (res.status == 200) setSent(true);
    else setErr(true);
    setLoading(false);
  };
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-3xl rounded-xl p-6 bg-lighterColor">
      {err && <div className="bg-red-200 p-2 ">بريد خاطئ، اعد المحاولة</div>}
      {!sent ? (
        <>
          <input
            type="text"
            className="input"
            style={{ width: '100%' }}
            placeholder="ادخل بريدك الالكتروني"
            ref={resendInput}
          />
          <Button
            text="اعادة ارسال"
            color="var(--main-color)"
            txtColor="var(--light-color)"
            block
            leftIcon={
              loading ? (
                <FontAwesomeIcon icon="circle-notch" className="spinner" />
              ) : (
                <></>
              )
            }
            onClick={() => {
              resend(resendInput.current.value);
            }}
          />
        </>
      ) : (
        <p> تم اعادة الارسال </p>
      )}
    </div>
  );
};

export default ResendBox;
