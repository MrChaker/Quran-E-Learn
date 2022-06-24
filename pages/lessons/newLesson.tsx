import { ReactElement } from 'react';
import LessonLayout from '../../FrontEnd/Layouts/lessonLayout';
import { Layout } from '../../FrontEnd/Layouts/layout';
import NewLessonForm from '../../FrontEnd/components/lesson/newLessonForm';
import { GetServerSidePropsContext } from 'next';
import { getUserProps } from '../../FrontEnd/getUserProps';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await getUserProps(context.req.headers.cookie, true);
}

const NewLesson = ({ ...props }) => {
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
