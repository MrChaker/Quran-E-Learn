import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { LessonInterface } from '../../../interfaces/lessonsInterface';
import LessonBox from '../lesson/lessonBox';
import { GET_Lessons } from '../../graphql/queries';
import MeetingsList from './meetingsList';
import { StudentInfo, UserInterface } from '../../../interfaces/userInterface';

const StudentDashboard: React.FC<{ user: UserInterface & StudentInfo }> = (
  props
) => {
  // fetching lessons of a student
  const { data, loading } = useQuery(GET_Lessons, {
    variables: { userID: props.user?._id, forTeacher: false },
  });
  const [newLearner, setNewLearner] = useState(false);
  const [lessons, setLessons] = useState<LessonInterface[]>([]);
  const [teachers, setTeachers] = useState<string[]>([]);
  useEffect(() => {
    if (data) {
      setLessons(data.getLessons);
      let tracker: string[] = [];
      data.getLessons.forEach((l: LessonInterface) => {
        if (l.teacher?.name && !tracker.includes(l.teacher?.name)) {
          setTeachers((prev) => [...prev, l.teacher?.name || '']);
          tracker.push(l.teacher?.name);
        }
      });
    }
    setNewLearner(
      props.user.lessons == undefined || props.user.lessons?.length == 0
    );
  }, [loading]);
  return (
    <div className="text-xl sm:p-6 min-h-screen">
      <h1 className=" text-2xl sm:text-3xl md:text-5xl mb-6 sm:mb-10 ">{` ${
        newLearner ? 'ابدأ رحلة التعلم' : 'أكمل رحلة التعلم'
      }`}</h1>
      <div className="flex gap-12 flex-wrap">
        {teachers.map((name, index) => (
          <div className="w-full" key={index}>
            <h2 className="mb-4 p-4 rounded-lg text-xl sm:text-3xl bg-lightColor dark:text-darkColor">
              {name !== 'المنصة' ? `دروس الشيخ ${name}` : 'دروس المنصة'}
            </h2>
            <div className="flex gap-12 sm:gap-6 flex-wrap">
              <MeetingsList top={100} left={40} user={props.user} />
              {lessons.map((lesson, i) => (
                <>
                  {lesson.teacher?.name == name && (
                    <div
                      key={i}
                      className=" l min-w-[220px] h-32 w-1/3 md:w-80 md:h-48"
                    >
                      <LessonBox
                        title={lesson.title || ''}
                        thumbnail={lesson.thumbnail || ''}
                        progress={
                          props.user.lessons?.find(
                            (l) => l.title == lesson.title
                          )?.progress || 0
                        }
                      />
                    </div>
                  )}
                </>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;
