import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { UserContext } from '../_app'
import { useContext } from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useIsAuth from '../../hooks/useIsAuth'
const Profile: NextPage = () => {
  const Router = useRouter();
  const { profileID } = Router.query;
  const { user } = useContext(UserContext);
  const [ visibility, setVisibility ] = useState('hidden');
  useIsAuth();
  return (
    <div className=''>
      <div className="flex items-center md:flex-row flex-col">
        <div className="rounded-full w-64 h-64 border border-darkColor dark:border-lightColor relative" 
          onMouseOver={()=>setVisibility('block')}
          onMouseLeave={()=>setVisibility('hidden')}
        >
          <Image 
            src={user.info?.image || '/male.png'} 
            layout='fill' 
            objectFit='contain' 
          />
          {
            user.info?._id == profileID &&
            <div className={`absolute rounded-full w-full h-full bg-darkColor opacity-90 cursor-pointer ${visibility} flex flex-col items-center justify-center gap-4`}
              /* onClick={} */
            >
              <FontAwesomeIcon  icon="camera" size='2x' color='var(--light-color)'/>
              <p className=' text-2xl text-lightColor ' >تغيير الصورة</p>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Profile