import React, { ReactElement } from 'react';
import UserListing from '../../FrontEnd/components/admin/userListing';
import AdminLayout from '../../FrontEnd/Layouts/adminLayout';

const Teachers = () => {
  return <UserListing userRole={{ teacher: true }} forAdmin />;
};

Teachers.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Teachers;
