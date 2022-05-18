import React, { FormEvent, useContext, useRef, useState } from 'react';
import QuillEditor from '../lesson/QuillEditor';
import { Button } from '..//general/Button';
import FileInput from '..//general/input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePost } from '../../hooks/usePost';
import { Line as Progress } from 'rc-progress';
import { useThemeContext } from '../../Context/themeContext';
import Link from 'next/link';
import { UserContext } from '../../Context/userContext';
import Swal from 'sweetalert2';
import Router from 'next/router';

type PropsType = {
  isNew?: boolean;
  title?: string;
};
const NewLessonForm: React.FC<PropsType> = (props) => {
  const { uploadProgress, uploadFile } = usePost('/video/upload');
  const [uploading, setUploading] = useState(false);
  const { user } = useContext(UserContext);
  const quillContent = useRef('');
  const { darkTheme } = useThemeContext();

  const newLesson = async (event: VEvent) => {
    setUploading(true);
    const formData = new FormData();
    formData.append('isNew', props.isNew ? 'true' : 'false');
    formData.append(
      'video',
      event.target.video.files ? event.target.video.files[0] : ''
    );
    formData.append('chapter', event.target.chapter.value);
    formData.append('content', quillContent.current);
    if (props.isNew) {
      formData.append('title', event.target.title.value);
      formData.append('teacherID', user.info?._id || '');
    } else {
      formData.append('title', props.title || '');
    }

    await uploadFile(formData)
      .then((data) => {
        setUploading(false);
        Swal.fire({
          text: 'تمّ انشاء الدرس ، يمكنك الخروج الان او اضافة وحدات اخرى للدرس',
          confirmButtonText: 'اضافة وحدة أخرى',
          confirmButtonColor: 'var(--main-color)',
          denyButtonText: 'حفظ الدرس ',
          showDenyButton: true,
          denyButtonColor: 'var(--semi-color)',
        }).then((res) => {
          if (res.isConfirmed || res.isDismissed) {
            Router.push(
              `/lessons/newChapter/${event.target.title.value || props.title}`
            );
          } else if (res.isDenied) {
            Router.push(`/lessons/${event.target.title.value}/1`);
          }
        });
      })
      .catch((err) => {
        setUploading(false);
        Swal.fire('لقد حدث خطأ ، حاول من جديد');
        console.log(err);
      });
  };
  return (
    <form
      encType="multipart/form-data"
      onSubmit={(e: VEvent) => {
        e.preventDefault();
        newLesson(e);
      }}
      className="text-lg sm:text-2xl p-4 flex flex-col gap-5"
    >
      {props.isNew && (
        <>
          <label>عنوان الدرس</label>
          <input type="text" name="title" className="input " />
        </>
      )}
      <label>عنوان الوحدة </label>
      <input type="text" name="chapter" className="input " />

      <FileInput text="اختر ملف  فيديو للتحميل" name="video" />
      <label>محتوى الوحدة</label>
      <QuillEditor data={quillContent} />
      <Button
        text="حفظ"
        color={darkTheme ? 'var(--light-color)' : `var(--main-color)`}
        txtColor={darkTheme ? `var(--main-color)` : 'var(--light-color)'}
        style={`my-10 mx-auto block`}
        disable={uploading}
        type="submit"
        block
        leftIcon={
          uploading ? (
            <FontAwesomeIcon icon="circle-notch" className="spinner" />
          ) : undefined
        }
      />
      {uploadProgress.visible && (
        <div className="flex justify-between items-center">
          <p>{Math.round(uploadProgress.progress * 2)}%</p>
          <Progress
            percent={Math.round(uploadProgress.progress * 2)}
            strokeWidth={5}
            strokeColor="Blue"
          />
        </div>
      )}
    </form>
  );
};
interface VEventTarget extends EventTarget {
  video: HTMLInputElement;
  title: HTMLInputElement;
  chapter: HTMLInputElement;
}
export interface VEvent extends FormEvent<HTMLFormElement> {
  target: VEventTarget;
}
export default NewLessonForm;
