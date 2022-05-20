import { useQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import { LessonInterface } from '../../../interfaces/lessonsInterface';
import LessonBox from '../lesson/lessonBox';
import { UserContext } from '../../Context/userContext';
import { GET_Lessons } from '../../graphql/queries';
import { TeacherInfo, UserInterface } from '../../../interfaces/userInterface';
import { Set } from 'typescript';

const StudentDashboard: React.FC = () => {
  const { user } = useContext(UserContext);
  // fetching lessons of a student
  const { data, loading } = useQuery(GET_Lessons, {
    variables: { userID: user.info?._id, forTeacher: false },
  });
  const [newLearner, setNewLearner] = useState(false);
  const [lessons, setLessons] = useState<LessonInterface[]>([]);
  const [teachers, setTeachers] = useState<string[]>([]);
  useEffect(() => {
    if (data) {
      setLessons(data.getLessons);
      data.getLessons.forEach((l: LessonInterface) => {
        if (l.teacher?.name && !teachers.includes(l.teacher?.name)) {
          setTeachers((prev) => [...prev, l.teacher?.name || '']);
        }
      });
      console.log(teachers);
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
        {teachers.map((name, index) => (
          <div className="w-full" key={index}>
            <h2 className="mb-4 p-4 rounded-lg text-xl sm:text-3xl bg-lightColor">{`دروس الشيخ ${name}`}</h2>

            {lessons.map((lesson, i) => (
              <>
                {lesson.teacher?.name == name && (
                  <div
                    key={i}
                    className=" l min-w-[220px] h-32 w-1/3 md:w-80 md:h-48 "
                  >
                    <LessonBox
                      title={lesson.title || ''}
                      thumbnail={lesson.thumbnail || ''}
                      progress={
                        user.studentInfo?.lessons?.find(
                          (l) => l.title == lesson.title
                        )?.progress || 0
                      }
                    />
                  </div>
                )}
              </>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;
