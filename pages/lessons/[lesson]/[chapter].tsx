import { useQuery } from '@apollo/client';
import Router, { useRouter } from 'next/router';
import React, {
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { GET_Lesson } from '../../../FrontEnd/graphql/queries';
import { UserContext } from '../../../FrontEnd/Context/userContext';
import { LessonInterface } from '../../../BackEnd/Utils/interfaces/lessonsInterface';
import LessonLayout from '../../../FrontEnd/Layouts/lessonLayout';
import { Layout } from '../../../FrontEnd/Layouts/layout';
import { useLessonContext } from '../../../FrontEnd/Context/lessonContext';
const Lesson = () => {
  const { lesson, chapter } = useRouter().query;
  const { data, loading } = useQuery(GET_Lesson, {
    variables: {
      title: lesson,
      chapter: Number(chapter),
    },
  });
  const { lesson: Slesson, setLesson } = useLessonContext();
  const content = useRef<HTMLDivElement>(null!);
  useEffect(() => {
    if (data) {
      setLesson(data.getLesson);
      content.current.innerHTML = Slesson?.chapters
        ? Slesson.chapters[0].content
        : '';
    }
  }, [loading]);

  return (
    <div className="p-6 w-full">
      <h1 className="text-xl sm:text-3xl mb-4">{Slesson?.title}</h1>
      {!loading && Slesson?.chapters && (
        <video
          id="videoPlayer"
          controls
          className={`w-full min-w-[250px] -mr-16 sm:mr-0 `}
        >
          <source
            src={`${process.env.NEXT_PUBLIC_PORT}/video/${Slesson.chapters[0].video} `}
            type="video/mp4"
          />
        </video>
      )}
      <div ref={content} className=" sm:mt-6"></div>
    </div>
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
