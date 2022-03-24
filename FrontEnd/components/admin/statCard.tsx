import { ReactElement, useEffect, useRef, useState } from "react"
import { useQuery } from "@apollo/client"
import { GET_DocCount } from "../../graphql/queries"
const StatCardCont = () =>{
  const { data, loading } = useQuery(GET_DocCount);
  const [studentsCount, setSCount] = useState(0)
  const [teachersCount, setTCount] = useState(0)
  useEffect(()=>{
    if(data){
      setSCount(data.getCount.students) ;
      setTCount(data.getCount.teachers)
    }
  },[loading])
  return(
    <div className='flex gap-6 text-lg md:text-2xl '>
      <StatCard name='الطّلاب' count={studentsCount} color='darkColor' />
      <StatCard name='الشّيوخ' count={teachersCount} color='darkColor' />
      <StatCard name='الدّروس المقدمة' count={4} color='darkColor' />
    </div>
  )
}


type StatCardPropsType = {
  name: string,
  icon?: string | ReactElement | SVGAElement,
  count: number,
  color: string
}
const StatCard = (props: StatCardPropsType) =>{
  return(
    <div className={`bg-${props.color} rounded-2xl text-lightColor p-4 w-1/3`}>
      <p>{props.name}</p>
      {props.icon}
      <p>{props.count}</p>
    </div>
  )
}
export default StatCardCont