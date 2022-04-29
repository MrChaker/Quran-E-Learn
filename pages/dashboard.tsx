import { useQuery } from '@apollo/client';
import { NextPage } from 'next';
import React, { useContext, useEffect, useState } from 'react';
import { LessonInterface } from '../BackEnd/Utils/interfaces/lessonsInterface';
import LessonBox from '../FrontEnd/components/lesson/lessonBox';
import { UserContext } from '../FrontEnd/Context/userContext';
import { GET_Lessons } from '../FrontEnd/graphql/queries';
import useIsAuth from '../FrontEnd/hooks/useIsAuth';

const Dashboard: NextPage = () => {
  useIsAuth();
  const { user } = useContext(UserContext);
  const { data, loading } = useQuery(GET_Lessons);
  const [lessons, setLessons] = useState<LessonInterface[]>([]);
  const [newLearner, setNewLearner] = useState(false);
  useEffect(() => {
    if (data) {
      setLessons(data.getLessons);
    }
    setNewLearner(
      user.studentInfo?.lessons == undefined ||
        user.studentInfo?.lessons?.length == 0
    );
  }, [loading]);
  return (
    <div className="text-xl sm:p-6">
      <h1 className=" text-2xl sm:text-3xl md:text-5xl mb-6 sm:mb-10 ">{` ${
        newLearner ? 'ابدأ رحلة التعلم' : 'أكمل رحلة التعلم'
      }`}</h1>

      <div className="flex gap-12 flex-wrap">
        {newLearner && (
          <>
            <LessonBox
              title="سورة الفاتحة"
              thumbnail="/quran/fatiha.jpg"
              progress={15}
            />
          </>
        )}
        {lessons.map((lesson, i) => (
          <LessonBox
            title={lesson.title || ''}
            thumbnail={'/quran/fatiha.jpg'}
            progress={
              user.studentInfo?.lessons?.find((l) => l.title == lesson.title)
                ?.progress || 0
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
