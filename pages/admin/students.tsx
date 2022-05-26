import React, { ReactElement } from 'react';
import UserListing from '../../FrontEnd/components/admin/userListing';
import AdminLayout from '../../FrontEnd/Layouts/adminLayout';

const Students = () => {
  return <UserListing userRole={{ student: true, teacher: false }} forAdmin />;
};

Students.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Students;
