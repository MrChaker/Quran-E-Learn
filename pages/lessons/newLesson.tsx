import React, { ReactElement, useContext } from 'react';
import LessonLayout from '../../FrontEnd/Layouts/lessonLayout';
import { Layout } from '../../FrontEnd/Layouts/layout';
import useIsAuth from '../../FrontEnd/hooks/useIsAuth';
import { UserContext } from '../../FrontEnd/Context/userContext';
import NewLessonForm from '../../FrontEnd/components/lesson/newLessonForm';
import { useRouter } from 'next/router';
const NewLesson = () => {
  useIsAuth(true); // true for teacher condition
  const { user } = useContext(UserContext);
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
