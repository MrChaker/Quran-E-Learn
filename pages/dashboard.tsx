import { NextPage } from 'next';
import React from 'react';
import useIsAuth from '../FrontEnd/hooks/useIsAuth';

const Dashboard: NextPage = () => {
  useIsAuth();
  return (
    <div className="">
      <h1>ابدأ رحلة التعلم</h1>
    </div>
  );
};

export default Dashboard;
