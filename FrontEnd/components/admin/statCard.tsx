import { ReactElement, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_DocCount } from '../../graphql/queries';
const StatCardCont = () => {
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
  return (
    <div className="flex gap-6 text-lg md:text-2xl ">
      <StatCard name="الطّلاب" count={Count.students} color="darkColor" />
      <StatCard name="الشّيوخ" count={Count.teachers} color="darkColor" />
      <StatCard
        name="الدّروس المقدمة"
        count={Count.lessons}
        color="darkColor"
      />
    </div>
  );
};

type StatCardPropsType = {
  name: string;
  icon?: string | ReactElement | SVGAElement;
  count: number;
  color: string;
};
const StatCard = (props: StatCardPropsType) => {
  return (
    <div className={`bg-${props.color} rounded-2xl text-lightColor p-4 w-1/3`}>
      <p>{props.name}</p>
      {props.icon}
      <p>{props.count}</p>
    </div>
  );
};
export default StatCardCont;
