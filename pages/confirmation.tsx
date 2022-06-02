import { NextPage } from 'next';
import React from 'react';

const Confirmation: NextPage = () => {
  return (
    <div className="text-3xl flex justify-center items-center h-screen">
      <p className="w-4/5">
        لم تقم بتأكيد بريدك الالكتروني ، الرجاء القيام بذلك لاستخدام الموقع
      </p>
    </div>
  );
};

export default Confirmation;
