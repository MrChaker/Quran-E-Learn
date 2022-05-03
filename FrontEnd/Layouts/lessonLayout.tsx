import { NextPage } from 'next';
import React, { useState } from 'react';
import { LessonInterface } from '../../BackEnd/Utils/interfaces/lessonsInterface';
import SideBar, { SideBarEL } from '../components/admin/sideBar';
import { LessonCentext } from '../Context/lessonContext';

const LessonLayout: NextPage = (props) => {
  const [lesson, setLesson] = useState<LessonInterface>(null!);
  return (
    <LessonCentext.Provider value={{ lesson, setLesson }}>
      <div className="flex ">
        <SideBar
          color="lighterColor"
          darkColor="darkColor"
          logo={{ lg: <></>, link: '' }}
        >
          {lesson?.chapters?.map((ch, i) => (
            <SideBarEL
              key={i}
              link={`${i + 1}`}
              name={ch.name}
              icon={<p>📄</p>}
              hoverColor="semiColor"
              fullWidth={false}
            />
          ))}
        </SideBar>
        {props.children}
      </div>
    </LessonCentext.Provider>
  );
};
export default LessonLayout;
