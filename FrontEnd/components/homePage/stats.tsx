import { AnimatePresence, motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import { useQuery } from '@apollo/client';
import { GET_DocCount } from '../../graphql/queries';
import useCounter from '../../hooks/useCounter';
const Stats: React.FC = () => {
  const { ref: animatedBox, inView } = useInView({
    delay: 250,
  });

  const width = useWindowWidth();
  const { data, loading } = useQuery(GET_DocCount);
  const [Count, setCount] = useState({
    students: 0,
    teachers: 0,
    lessons: 0,
  });
  useEffect(() => {
    if (data) {
      setCount(data.getCount);
    }
  }, [loading]);

  const { count: lessonsCounter } = useCounter(Count.lessons, 200, inView);
  const { count: studentsCounter } = useCounter(Count.students, 200, inView);
  const { count: teachersCounter } = useCounter(Count.teachers, 200, inView);

  return (
    <div className="mt-24 min-h-[300px] w-full relative">
      <div
        className={`absolute bg-darkColor dark:bg-lightColor h-full left-1/2 -translate-x-1/2 p-10 text-3xl md:text-5xl text-lightColor dark:text-darkColor text-left pt-40`}
        style={{ width }}
        ref={animatedBox}
      >
        <AnimatePresence>
          {inView && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              "أوّل منصة لتعلّم القران في الجزائر"
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {inView && (
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            className="absolute -top-1/4 h-2/3 bg-lighterColor dark:text-darkColor shadow-3xl left-[20%] md:left-1/2 w-2/3 rounded-3xl p-4 pr-16 flex flex-col sm:flex-row items-center"
          >
            <div className="flex flex-col items-center w-1/3 text-4xl">
              <h1>الطّلاب</h1>
              <p>+{studentsCounter}</p>
            </div>
            <div className="flex flex-col items-center w-1/3 text-4xl ">
              <h1>الشيوخ</h1>
              <p>+{teachersCounter}</p>
            </div>
            <div className="flex flex-col items-center w-1/3 text-4xl">
              <h1>الدروس</h1>
              <p>+{lessonsCounter}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Stats;
