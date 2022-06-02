import React, { ReactElement } from 'react';
import LessonLayout from '../../../FrontEnd/Layouts/lessonLayout';
import { Layout } from '../../../FrontEnd/Layouts/layout';
import useIsAuth from '../../../FrontEnd/hooks/useIsAuth';
import NewLessonForm from '../../../FrontEnd/components/lesson/newLessonForm';
import { useRouter } from 'next/router';
const NewLesson = () => {
  useIsAuth(true); // true for teacher condition
  const { title } = useRouter().query;

  return (
    <NewLessonForm
      isNew={false}
      title={(typeof title == 'string' && title) || ''}
    />
  );
};

NewLesson.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <LessonLayout>{page}</LessonLayout>
    </Layout>
  );
};

export default NewLesson;
