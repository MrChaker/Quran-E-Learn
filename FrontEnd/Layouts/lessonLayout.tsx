import { gql, useLazyQuery } from '@apollo/client';
import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import SideBar, { SideBarEL } from '../components/general/sideBar';
import { LessonContext } from '../Context/lessonContext';

const LessonLayout: NextPage = (props) => {
  const [chapters, setChapters] = useState<{ name: string }[]>([]);
  const [lesson, setLesson] = useState<string>('');
  const [getChapters, { data, loading }] = useLazyQuery(GET_Chapters);
  useEffect(() => {
    if (lesson)
      getChapters({
        variables: { title: lesson },
      });
  }, [lesson]);

  useEffect(() => {
    if (data) {
      setChapters(data.getChapters && data.getChapters.chapters);
    }
  }, [loading]);
  return (
    <LessonContext.Provider value={{ lesson, setLesson }}>
      <div className="flex ">
        <SideBar
          bgColor="lighterColor"
          textColor="darkColor"
          logo={{ lg: <></>, link: '' }}
          extraStyle="sm:mr-[-32px]  md:mr-[-60px] "
        >
          {chapters &&
            chapters?.map((ch, i) => (
              <SideBarEL
                key={i}
                link={`../${lesson}/${i + 1}`}
                name={ch.name}
                icon={<p>📄</p>}
                hoverColor="semiColor"
                fullWidth={false}
              />
            ))}
        </SideBar>
        {props.children}
      </div>
    </LessonContext.Provider>
  );
};

const GET_Chapters = gql`
  query getChapters($title: String) {
    getChapters(title: $title) {
      chapters {
        name
      }
    }
  }
`;

export default LessonLayout;
