import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMutation, useQuery } from '@apollo/client';
import LessonBox from '../lesson/lessonBox';
import { LessonInterface } from '../../../interfaces/lessonsInterface';
import { UserContext } from '../../Context/userContext';
import { GET_Lessons } from '../../graphql/queries';
import DropMenu, { DropMenuLink } from '../general/dropMenu';
import { DELETE_Lesson } from '../../graphql/mutations';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
const TeacherDash = () => {
  const { user } = useContext(UserContext);
  const [lessons, setLessons] = useState<LessonInterface[]>([]);
  const router = useRouter();
  const { data, loading } = useQuery(GET_Lessons, {
    variables: {
      userID: user.info?._id,
      forTeacher: true,
    },
  });
  const [deleteLesson] = useMutation(DELETE_Lesson);
  const DeleteLesson = (title: string) => {
    Swal.fire({
      icon: 'question',
      text: `هل أنت متأكد من حذف درس ${title}؟`,
      confirmButtonText: 'تأكيد',
      confirmButtonColor: '#0e0',
      showDenyButton: true,
      denyButtonText: ' الغاء',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteLesson({
          variables: { title },
        });
        router.reload();
      }
    });
  };
  useEffect(() => {
    if (data) setLessons(data.getLessons);
  }, [loading]);

  const [menu, setMenu] = useState<number>(-1);
  return (
    <div className="text-xl sm:p-6">
      <h1 className=" text-2xl sm:text-3xl md:text-5xl mb-6 sm:mb-10 ">
        {' '}
        لوحة التحكم في الدروس التي تقدمها{' '}
      </h1>
      <div className="flex gap-6">
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
        <Link href="/room/planMeeting">
          <a className=" min-w-[200px] w-2/6 bg-slate-400 py-5 sm:py-10 shadow-sm hover:shadow-2xl grid place-items-center rounded-xl">
            <FontAwesomeIcon
              icon="circle"
              color="red"
              shake
              size="2x"
              className="block bg-slate-500 p-4 rounded-full "
            />
            <p>بث مباشر</p>
          </a>
        </Link>
      </div>
      {lessons.length == 0 ? (
        <p className="text-xl sm:text-2xl md:text-3xl my-6 sm:my-10">
          لم تقدم أي درس حتى الان
        </p>
      ) : (
        <>
          <h2 className="text-xl sm:text-2xl md:text-3xl my-6 sm:my-10">
            الدروس المقدمة
          </h2>
          <div className="flex flex-wrap gap-14">
            {lessons.map((lesson, i) => (
              <div className=" l min-w-[220px] h-32 w-1/3 md:w-80 md:h-48 relative">
                <p
                  className=" w-fit text-3xl mr-auto ml-4 pb-2 px-2 rounded-full hover:bg-lightColor cursor-pointer"
                  onClick={() => setMenu((prev) => (i == prev ? -1 : i))}
                >
                  ...
                </p>
                <DropMenu isOn={i === menu} left={'-10%'} top="20%">
                  <DropMenuLink
                    name="حذف الدرس"
                    isButton
                    onClick={() => DeleteLesson(lesson.title || '')}
                  />
                </DropMenu>
                <LessonBox
                  key={i}
                  title={lesson.title || ''}
                  thumbnail={lesson.thumbnail || ''}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TeacherDash;
