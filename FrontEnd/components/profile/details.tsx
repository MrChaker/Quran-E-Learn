import React from 'react';
import { PropsType } from './photo';
import ProfileInfo from './profileInfo';
import TabelNavigation from './tabelNavigation';

const ProfileDetails = (props: PropsType) => {
  return (
    <TabelNavigation
      navElements={[
        {
          title: 'المعلومات',
          content: (
            <ProfileInfo
              user={props.user}
              profileID={props.profileID}
              loading={props.loading}
            />
          ),
        },
        {
          title: 'الاعدادات',
          content: <div />,
        },
        {
          title: 'الال',
          content: <div />,
        },
      ]}
    />
  );
};

export default ProfileDetails;
