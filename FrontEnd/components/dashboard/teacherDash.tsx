import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery } from '@apollo/client';
import LessonBox from '../lesson/lessonBox';
import { LessonInterface } from '../../../interfaces/lessonsInterface';
import { UserContext } from '../../Context/userContext';
import { GET_Lessons } from '../../graphql/queries';
const TeacherDash = () => {
  const { user } = useContext(UserContext);
  const [lessons, setLessons] = useState<LessonInterface[]>([]);
  const { data, loading } = useQuery(GET_Lessons, {
    variables: {
      userID: user.info?._id,
      forTeacher: true,
    },
  });
  useEffect(() => {
    if (data) setLessons(data.getLessons);
  }, [loading]);
  return (
    <div className="text-xl sm:p-6">
      <h1 className=" text-2xl sm:text-3xl md:text-5xl mb-6 sm:mb-10 ">
        {' '}
        لوحة التحكم في الدروس التي تقدمها{' '}
      </h1>
      <Link href="/lessons/newLesson">
        <a className=" min-w-[200px] w-2/6 bg-slate-400 py-5 sm:py-10 shadow-sm hover:shadow-2xl grid place-items-center rounded-xl">
          <FontAwesomeIcon
            icon="plus"
            size="2x"
            className="block bg-slate-500 p-4 rounded-full "
          />
          <p>اضافة درس جديد</p>
        </a>
      </Link>
      <h2 className="text-xl sm:text-2xl md:text-3xl my-6 sm:my-10">
        الدروس المقدمة
      </h2>
      <div className="flex flex-wrap gap-5">
        {lessons.map((lesson, i) => (
          <LessonBox
            key={i}
            title={lesson.title || ''}
            thumbnail={lesson.thumbnail || ''}
          />
        ))}
      </div>
    </div>
  );
};

export default TeacherDash;
