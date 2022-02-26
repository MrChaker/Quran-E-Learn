import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { UserContext } from '../_app'
import {  useQuery } from '@apollo/client'
import { GET_User } from '../../FrontEnd/graphql/queries'
import useIsAuth from '../../hooks/useIsAuth'
import type { UserInterface } from '../../BackEnd/Utils/userInterface'
import Photo from '../../FrontEnd/components/profile/photo'
const Profile: NextPage = () => {
  const { user } = useContext(UserContext);
  const Router = useRouter();
  const { profileID } = Router.query;
  const { data, loading} = useQuery(GET_User, {
    variables: { _id: profileID }
  });
  // this is the user we are visiting his page
  const [ thisUser, setThisUser ] = useState<UserInterface | null>(null);
  useEffect(()=>{
    if(data){
      setThisUser(data.getUser)
    }
  }, [loading])

  useIsAuth();
  return (
    <div className=''>
      <div className="flex items-center md:flex-row flex-col">
        <Photo user={ thisUser || user.info } profileID={profileID} loading={loading} />
      </div>
    </div>
  )
}

export default Profile