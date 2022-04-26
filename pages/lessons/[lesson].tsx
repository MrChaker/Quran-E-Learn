import { useQuery } from '@apollo/client';
import Router, { useRouter } from 'next/router';
import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { GET_Lesson } from '../../FrontEnd/graphql/queries';
import { UserContext } from '../../FrontEnd/Context/userContext';
import { LessonInterface } from '../../BackEnd/Utils/interfaces/lessonsInterface';
import LessonLayout from '../../FrontEnd/Layouts/lessonLayout';
import { Layout } from '../../FrontEnd/Layouts/layout';
import { useLessonContext } from '../../FrontEnd/Context/lessonContext';
const Lesson = () => {
  const { lesson } = useRouter().query;
  const { user } = useContext(UserContext);
  const { data, loading } = useQuery(GET_Lesson, {
    variables: {
      title: lesson,
    },
  });
  const { lesson: Slesson, setLesson } = useLessonContext();
  useEffect(() => {
    if (data) {
      setLesson(data);
    }
  }, [loading]);
  return (
    <>
      <h1>{Slesson?.title}</h1>
    </>
  );
};

Lesson.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <LessonLayout>{page}</LessonLayout>
    </Layout>
  );
};
export default Lesson;
