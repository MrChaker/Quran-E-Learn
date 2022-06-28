import { UserInterface } from '../../../interfaces/userInterface';
import React, { useState } from 'react';
import { useRef } from 'react';
import Image from 'next/image';
import { useMutation } from '@apollo/client';
import { UPDATE_User } from '../../graphql/mutations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export type PropsType = {
  IsThisAuthedUser: boolean;
  profileID: string | string[] | undefined;
  loading: boolean;
  user: UserInterface;
};
const Photo = (props: PropsType) => {
  const [visibility, setVisibility] = useState('hidden');
  const image = useRef<HTMLInputElement>(null!);
  const [previewImage, setPreviewImage] = useState<string>(null!);
  const [uploading, setUploading] = useState(false);

  const [updateUser] = useMutation(UPDATE_User, {
    onCompleted() {
      setUploading(false);
    },
  });

  const uploadImage = (Imagefile: File | null | undefined): void => {
    const reader = new FileReader();
    const file: File | null | undefined = Imagefile;
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setUploading(true);
          setPreviewImage(reader.result);
          updateUser({
            variables: {
              _id: props.user._id,
              query: { image: reader.result },
            },
          });
        }
      };
    }
  };

  return (
    <div
      className="rounded-full w-56 h-56  sm:w-72 sm:h-72 border border-darkColor dark:border-lightColor relative overflow-hidden"
      onMouseOver={() => setVisibility('block')}
      onMouseLeave={() => setVisibility('hidden')}
    >
      <Image
        src={
          props.loading
            ? '/male.png'
            : previewImage || props.user?.image || '/male.png'
        }
        layout="fill"
        objectFit="cover"
        alt="profile Image"
        className={`${uploading && 'filter brightness-[.2] w-16 h-16'}`}
      />
      {uploading && (
        <FontAwesomeIcon
          icon="circle-notch"
          size="3x"
          color="var(--semi-color)"
          className="spinner absolute top-[30%] left-[33%]"
        />
      )}
      {
        //check if authed user is on his profile to allow him make changes
        props.IsThisAuthedUser && (
          <div
            className={` ${visibility} bg-darkColor dark:bg-lightColor opacity-90 absolute w-full h-full rounded-full filter `}
          >
            <div className="absolute flex flex-col items-center justify-center gap-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer">
              <FontAwesomeIcon
                icon="camera"
                size="2x"
                color="var(--semi-color)"
              />

              <p className=" text-2xl text-lightColor dark:text-darkColor ">
                تغيير الصورة
              </p>
            </div>
            <form encType="multipart/form-data">
              <input
                className="file:absolute file:w-full file:h-full file:transparent file:top-0 file:right-0 file:bg-darkColor file:opacity-10 file:cursor-pointer file:rounded-full file:text-transparent text-transparent"
                type="file"
                name="image"
                ref={image}
                onChange={() => {
                  uploadImage(image.current.files?.item(0));
                }}
              />
            </form>
          </div>
        )
      }
    </div>
  );
};

export default Photo;
