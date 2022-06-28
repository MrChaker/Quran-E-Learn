import { ReactElement } from 'react';
import LessonLayout from '../../FrontEnd/Layouts/lessonLayout';
import { Layout } from '../../FrontEnd/Layouts/layout';
import NewLessonForm from '../../FrontEnd/components/lesson/newLessonForm';
import useIsAuth from '../../FrontEnd/hooks/useIsAuth';

const NewLesson = ({ ...props }) => {
  useIsAuth(props.user, true);
  return <NewLessonForm isNew={true} user={props.user} />;
};

NewLesson.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <LessonLayout>{page}</LessonLayout>
    </Layout>
  );
};
export default NewLesson;
