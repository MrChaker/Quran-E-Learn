import { UserInterface } from '../../../BackEnd/Utils/interfaces/userInterface'
import React, {  useState } from 'react'
import { UserContext } from '../../Context/userContext'
import { useContext, useRef } from 'react'
import Image from 'next/image'
import { useMutation } from '@apollo/client'
import { UPDATE_Image } from '../../graphql/mutations'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type PropsType = {
  user: UserInterface | null,
  profileID: string | string[] | undefined,
  loading: boolean
}
const Photo = (props: PropsType) => {
  const { user } = useContext(UserContext);
  const [ visibility, setVisibility ] = useState('hidden');

  const image = useRef<HTMLInputElement>(null!);
  const [ previewImage, setPreviewImage ] = useState<string>(null!);
  const [ uploading, setUploading ] = useState(false)

  const [ updateImage ] = useMutation(UPDATE_Image, {
    onCompleted(data: any){
      setUploading(false)
    },
  })

  const uploadImage = ( Imagefile: File | null | undefined ): void=>{
    const reader = new FileReader();
    const file: File | null | undefined = Imagefile;
    if ( file ) { 
      reader.readAsDataURL(file)
      reader.onloadend = () =>{
        if (  typeof reader.result === 'string'  ){
          setUploading(true);
          setPreviewImage(reader.result);
          updateImage({variables:{
            user_id: user.info?._id,
            file: reader.result, 
          }})
        }
      }
    }
  }

  return (
    <div className="rounded-full w-64 h-64 border border-darkColor dark:border-lightColor relative overflow-hidden" 
          onMouseOver={()=>setVisibility('block')}
          onMouseLeave={()=>setVisibility('hidden')}
        >
          <Image
            src={ props.loading ? '/male.png' : previewImage || props.user?.image  || '/male.png' } 
            layout='fill' 
            objectFit='cover' 
            alt='profile Image'
            
            className={`${ uploading && 'filter brightness-[.2] w-16 h-16' }`}
          />
          {
            uploading &&
            <FontAwesomeIcon  icon="circle-notch" size='3x' color='var(--semi-color)' className='spinner absolute top-[40%] left-[43%]' />
          }
          {
            //check if authed user is on his profile to allow him make changes
            user.info?._id == props.profileID &&
            <div className={` ${visibility} bg-darkColor dark:bg-lightColor opacity-90 absolute w-full h-full rounded-full filter `}
              /* onClick={} */
            >
              <div className="absolute flex flex-col items-center justify-center gap-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer">
                <FontAwesomeIcon  icon="camera" size='2x' color='var(--semi-color)'/>

                <p className=' text-2xl text-lightColor dark:text-darkColor ' >تغيير الصورة</p>
              </div>
              <form encType="multipart/form-data">
                <input className='file:absolute file:w-full file:h-full file:transparent file:top-0 file:right-0 file:bg-darkColor file:opacity-10 file:cursor-pointer file:rounded-full file:text-transparent text-transparent' type='file' name='image' ref={image} onChange={()=>uploadImage(image.current.files?.item(0))}
                />
              </form>
            </div>
          }
        </div>
  )
}

export default Photo