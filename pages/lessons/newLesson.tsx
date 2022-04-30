import React, { FormEvent, ReactElement, useContext, useRef } from 'react';
import LessonLayout from '../../FrontEnd/Layouts/lessonLayout';
import { Layout } from '../../FrontEnd/Layouts/layout';
import useIsAuth from '../../FrontEnd/hooks/useIsAuth';
import QuillEditor from '../../FrontEnd/components/lesson/QuillEditor';
import { Button } from '../../FrontEnd/components/general/Button';
import { useThemeContext } from '../../FrontEnd/Context/themeContext';
import Input from '../../FrontEnd/components/general/input';
import axios from 'axios';
import { useMutation } from '@apollo/client';
import { CREATE_Lesson } from '../../FrontEnd/graphql/mutations';
import { UserContext } from '../../FrontEnd/Context/userContext';
const NewLesson = () => {
  useIsAuth(true); // true for teacher condition
  const { darkTheme } = useThemeContext();
  const { user } = useContext(UserContext);
  const data = useRef('');

  const postVideo = async (video?: File | null) => {
    const formData = new FormData();
    formData.append('video', video ? video : '');
    try {
      const res = await axios.post('/video/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (res.status == 200) return res.data.file.id;
    } catch (error) {
      return error;
    }
  };

  const [createLesson] = useMutation(CREATE_Lesson);
  const newLesson = async (event: VEvent) => {
    await postVideo(
      event.target.video.files ? event.target.video.files[0] : null
    )
      .then((videoID) => {
        //handle err
        createLesson({
          variables: {
            title: 'new lesson',
            thumbnail: 'image',
            chapter: [
              { name: 'chapter 1', content: data.current, video: videoID },
            ],
            teacherID: user.info?._id,
          },
        });
      })
      .catch((err) => console.log(err));
  };
  return (
    <form
      encType="multipart/form-data"
      onSubmit={(e: VEvent) => {
        e.preventDefault();
        newLesson(e);
      }}
      /* action="/video/upload"
      method="POST" */
    >
      <Input text="اختر ملف  فيديو للتحميل" name="video" />
      <QuillEditor data={data} />
      <Button
        text="نشر الدرس"
        color={darkTheme ? 'var(--light-color)' : `var(--main-color)`}
        txtColor={darkTheme ? `var(--main-color)` : 'var(--light-color)'}
        onClick={() => console.log(data.current)}
        style="mt-10 mx-auto block"
        type="submit"
      />
    </form>
  );
};

interface VEventTarget extends EventTarget {
  video: HTMLInputElement;
}
interface VEvent extends FormEvent<HTMLFormElement> {
  target: VEventTarget;
}

NewLesson.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <LessonLayout>{page}</LessonLayout>
    </Layout>
  );
};
export default NewLesson;
