import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useContext, useRef } from 'react'
import Image from 'next/image'
import {  useQuery } from '@apollo/client'
import { GET_User } from '../../FrontEnd/graphql/queries'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useIsAuth from '../../hooks/useIsAuth'
import type { UserInterface } from '../../BackEnd/Utils/userInterface'
const Profile: NextPage = () => {
  const Router = useRouter();
  const { profileID } = Router.query;
  const { data, loading} = useQuery(GET_User, {
    variables: { _id: profileID }
  });
  // this is the user we are visiting his page
  const [ thisUser, setThisUser ] = useState<UserInterface>(null!);
  useEffect(()=>{
    if(data){
      setThisUser(data.getUser)
    }
  }, [loading])

  useIsAuth();
  
  return (
    <div className=''>
      <div className="flex items-center md:flex-row flex-col">
        <div className="rounded-full w-64 h-64 border border-darkColor dark:border-lightColor relative overflow-hidden" 
        >
          <Image
            src={ thisUser?.image || '/male.png' } 
            layout='fill' 
            objectFit='contain' 
            alt='profile Image'
          />
        </div>
      </div>
    </div>
  )
}

export default Profile