import React from 'react';
import ProfileInfo from './profileInfo';
import TabelNavigation from './tabelNavigation';

const ProfileDetails = () => {
  return (
    <TabelNavigation
      navElements={[
        {
          title: 'المعلومات',
          content: <ProfileInfo />,
        },
        {
          title: 'الاعدادات',
          content: <ProfileInfo />,
        },
        {
          title: 'الال',
          content: <ProfileInfo />,
        },
      ]}
    />
  );
};

export default ProfileDetails;
