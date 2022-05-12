import React, { ReactElement, useContext, useEffect, useState } from 'react';
import LessonLayout from '../../../FrontEnd/Layouts/lessonLayout';
import { Layout } from '../../../FrontEnd/Layouts/layout';
import useIsAuth from '../../../FrontEnd/hooks/useIsAuth';
import { UserContext } from '../../../FrontEnd/Context/userContext';
import NewLessonForm from '../../../FrontEnd/components/lesson/newLessonForm';
import Router, { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
const NewLesson = () => {
  useIsAuth(true); // true for teacher condition
  const { user } = useContext(UserContext);
  const { title } = useRouter().query;
  /* const { data: teacherID, loading } = useQuery(GET_Lesson_Teacher, {
    variables: {
      title,
    },
  });

  if (user.info?._id !== teacherID.getLesson.teacherID)
    Router.push('/dashboard'); */ //if lesson doesn't belong to authed teacher , he can't edit it
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

const GET_Lesson_Teacher = gql`
  query getLessTeacher($title: String) {
    getLesson(title: $title, chapter: 1) {
      teacherID
    }
  }
`;
export default NewLesson;
