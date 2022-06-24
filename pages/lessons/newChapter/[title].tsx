import React, { ReactElement } from 'react';
import LessonLayout from '../../../FrontEnd/Layouts/lessonLayout';
import { Layout } from '../../../FrontEnd/Layouts/layout';
import NewLessonForm from '../../../FrontEnd/components/lesson/newLessonForm';
import { useRouter } from 'next/router';
import { getUserProps } from '../../../FrontEnd/getUserProps';
import { GetServerSidePropsContext } from 'next';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await getUserProps(context.req.headers.cookie, true);
}
const NewLesson = ({ ...props }) => {
  const { title } = useRouter().query;

  return (
    <NewLessonForm
      isNew={false}
      title={(typeof title == 'string' && title) || ''}
      user={props.user}
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
