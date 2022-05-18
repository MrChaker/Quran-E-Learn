import React from 'react';
import UserListing from '../../FrontEnd/components/admin/userListing';

const Teachers = () => {
  return <UserListing userRole={{ teacher: true }} forAdmin={false} />;
};

export default Teachers;
