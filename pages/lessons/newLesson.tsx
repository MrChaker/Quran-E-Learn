import React, { ReactElement } from 'react';
import LessonLayout from '../../FrontEnd/Layouts/lessonLayout';
import { Layout } from '../../FrontEnd/Layouts/layout';
import useIsAuth from '../../FrontEnd/hooks/useIsAuth';
import NewLessonForm from '../../FrontEnd/components/lesson/newLessonForm';
const NewLesson = () => {
  useIsAuth(true); // true for teacher condition
  return <NewLessonForm isNew={true} />;
};

NewLesson.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <LessonLayout>{page}</LessonLayout>
    </Layout>
  );
};
export default NewLesson;
