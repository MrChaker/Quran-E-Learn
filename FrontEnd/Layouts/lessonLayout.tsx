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
          <SideBarEL
            link="/lessons/lesson"
            name="chapter 1"
            icon={<p>📄</p>}
            hoverColor="semiColor"
            fullWidth={false}
          />
          {lesson?.chapters?.map((ch, i) => (
            <SideBarEL
              key={i}
              link={ch}
              name={ch}
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
