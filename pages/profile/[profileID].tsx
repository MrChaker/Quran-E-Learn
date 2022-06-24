import { GetServerSidePropsContext } from 'next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_User } from '../../FrontEnd/graphql/queries';
import type { UserInterface } from '../../interfaces/userInterface';
import Photo from '../../FrontEnd/components/profile/photo';
import ProfileDetails from '../../FrontEnd/components/profile/details';
import { getUserProps } from '../../FrontEnd/getUserProps';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await getUserProps(context.req.headers.cookie);
}

const Profile = ({ ...props }) => {
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
  if (!thisUser)
    return (
      <p className="text-center text-3xl h-screen pt-40">
        {' '}
        هذا المستخدم غير موجود{' '}
      </p>
    );
  return (
    <div className="">
      <div className="flex gap-10 sm:gap-16 items-center lg:flex-row flex-col text-darkColor dark:text-lightColor text-2xl sm:text-4xl">
        <div className="flex flex-col gap-8 items-center">
          <Photo
            user={thisUser || props.user}
            profileID={profileID}
            loading={loading}
          />
          <h1 className="">{thisUser?.name || 'الاسم'}</h1>
          {/* side notes */}
        </div>
        <div className="">
          <ProfileDetails
            user={thisUser || props.user}
            profileID={profileID}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
