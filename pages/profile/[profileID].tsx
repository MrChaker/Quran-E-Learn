import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { UserContext } from '../_app'
import { useContext, useRef } from 'react'
import Image from 'next/image'
import { useMutation } from '@apollo/client'
import { UPDATE_Image } from '../../FrontEnd/graphql/mutations'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useIsAuth from '../../hooks/useIsAuth'
const Profile: NextPage = () => {
  const Router = useRouter();
  const { profileID } = Router.query;
  const { user } = useContext(UserContext);
  const [ visibility, setVisibility ] = useState('hidden');


  const image = useRef<HTMLInputElement>(null!);
  const [ previewImage, setPreviewImage ] = useState<string>(null!);
  const [ updateImage ] = useMutation(UPDATE_Image)
  const uploadImage = (): void=>{
    const reader = new FileReader();
    const file: File | null | undefined = image.current.files?.item(0);
    if ( file ) { 
      reader.readAsDataURL(file)
      reader.onloadend = () =>{
        if (  typeof reader.result === 'string'  ){
          setPreviewImage(reader.result)
          updateImage({variables:{
            user_id: user.info?._id,
            file: reader.result, 
          }})
        }
      }
    }
  }

  useIsAuth();
  return (
    <div className=''>
      <div className="flex items-center md:flex-row flex-col">
        <div className="rounded-full w-64 h-64 border border-darkColor dark:border-lightColor relative" 
          onMouseOver={()=>setVisibility('block')}
          onMouseLeave={()=>setVisibility('hidden')}
        >
          <Image 
            src={ previewImage || user.info?.image || '/male.png'} 
            layout='fill' 
            objectFit='contain' 
          />
          { /* this is for profile image uploading */
            user.info?._id == profileID &&
            <div className={` ${visibility} bg-darkColor opacity-90 absolute w-full h-full rounded-full`}
              /* onClick={} */
            >
              <div className="absolute flex flex-col items-center justify-center gap-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer">
                <FontAwesomeIcon  icon="camera" size='2x' color='var(--light-color)'/>
                <p className=' text-2xl text-lightColor ' >تغيير الصورة</p>
              </div>
              <form encType="multipart/form-data">
                <input className='file:absolute file:w-full file:h-full file:transparent file:top-0 file:right-0 file:bg-darkColor file:opacity-10 file:cursor-pointer file:rounded-full file:text-transparent text-transparent' type='file' name='image' ref={image} onChange={uploadImage}
                />
              </form>
              
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Profile