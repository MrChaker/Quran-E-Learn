import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { GET_Lessons } from '../../FrontEnd/graphql/queries';
import { LessonInterface } from '../../interfaces/lessonsInterface';

const LessonsAdmin = () => {
  const [lessons, setLessons] = useState<LessonInterface[]>([]);
  const { data, loading } = useQuery(GET_Lessons);
  useEffect(() => {
    if (data) {
      setLessons(data.getLessons);
    }
  }, [loading]);
  return (
    <div className="flex flex-col gap-12">
      <h1 className="text-5xl">الطلاب</h1>
      {lessons.map((lesson, i) => (
        <div
          className="w-2/3 p-6 bg-darkColor rounded-xl text-lighterColor text-xl flex justify-between items-center"
          key={i}
        >
          <div>
            <p>{lesson.title}</p>
            <p>{lesson.teacher}</p>
            <p>{lesson.chapters?.length}</p>
          </div>
          <p
            className="rounded-sm bg-red-700 p-3 text-sm text-center mt-2 cursor-pointer"
            /* onClick={() => DeleteLesson(lesson.title)} */
          >
            حذف العضو
          </p>
        </div>
      ))}
    </div>
  );
};

export default LessonsAdmin;
