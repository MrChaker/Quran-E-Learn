import Link from 'next/link'
import React, { ReactElement } from 'react'

const SideBar: React.FC = ({children}) => {
  return (
    <div className='h-screen bg-darkColor min-w-[80px] md:min-w-[260px] py-6 text-lightColor text-2xl relative '>
      <div className="fixed w-[80px] md:w-[260px] flex flex-col justify-start items-center h-full">
        <div className="logo text-2xl pb-4 mb-6 border-b border-semiColor">
          Quran
        </div>
        <div className="w-full">
          <div className='flex flex-col '>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

type PropsType ={
  name: string,
  link: string,
  icon: ReactElement
}
export const SideBarEL = (props: PropsType,)=>{

  return(
    <Link href={props.link} >
      <a className='flex gap-5 bg-darkColor hover:bg-semiColor py-4 pr-7 md:pr-8'>
          { props.icon }
          <p className='hidden md:block'>{props.name}</p>
      </a>
    </Link>
  )
}
export default SideBar