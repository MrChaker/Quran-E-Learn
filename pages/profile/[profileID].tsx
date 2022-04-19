import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { UserContext } from '../../FrontEnd/Context/userContext';
import { useQuery } from '@apollo/client';
import { GET_User } from '../../FrontEnd/graphql/queries';
import useIsAuth from '../../FrontEnd/hooks/useIsAuth';
import type { UserInterface } from '../../BackEnd/Utils/interfaces/userInterface';
import Photo from '../../FrontEnd/components/profile/photo';
import ProfileDetails from '../../FrontEnd/components/profile/details';
const Profile: NextPage = () => {
  const { user } = useContext(UserContext);
  const Router = useRouter();
  const { profileID } = Router.query;
  const { data, loading } = useQuery(GET_User, {
    variables: { _id: profileID },
  });
  // this is the user we are visiting his page
  const [thisUser, setThisUser] = useState<UserInterface | null>(null);
  useEffect(() => {
    if (data) {
      setThisUser(data.getUser);
    }
  }, [loading]);

  useIsAuth();
  return (
    <div className="">
      <div className="flex gap-10 sm:gap-16 items-center lg:flex-row flex-col text-darkColor dark:text-lightColor text-2xl sm:text-4xl">
        <div className="flex flex-col gap-8 items-center">
          <Photo
            user={thisUser || user.info}
            profileID={profileID}
            loading={loading}
          />
          <h1 className="">{thisUser?.name || 'الاسم'}</h1>
          {/* side notes */}
        </div>
        <div className="">
          <ProfileDetails
            user={thisUser || user.info}
            profileID={profileID}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
