import { useQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import { LessonInterface } from '../../../interfaces/lessonsInterface';
import LessonBox from '../lesson/lessonBox';
import { UserContext } from '../../Context/userContext';
import { GET_Lessons } from '../../graphql/queries';

const StudentDashboard: React.FC = () => {
  const { user } = useContext(UserContext);
  // fetching lessons of a student
  const { data, loading } = useQuery(GET_Lessons, {
    variables: { userID: user.info?._id, forTeacher: false },
  });
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
            key={i}
            title={lesson.title || ''}
            thumbnail={lesson.thumbnail || ''}
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

export default StudentDashboard;
