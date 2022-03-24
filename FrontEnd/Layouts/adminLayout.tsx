import { NextPage } from 'next'
import Image from 'next/image'
import React from 'react'
import SideBar, { SideBarEL } from '../components/admin/sideBar'
import useIsAuth from '../hooks/useIsAuth'
const AdminLayout: NextPage = ({ children }) => {
  useIsAuth({onlyAdmin: true});
  return (
    <div className='font-main flex' dir='rtl'>
      <SideBar>
        <SideBarEL name='لوحة التحكم' link='#' icon={<Image src="/iconly/Chart.svg" width={24} height={24}/>}/>
        <SideBarEL name='الطّلاب' link='#' icon={<Image src="/iconly/student.svg" width={24} height={24}/>}/>
        <SideBarEL name='الشيوخ' link='#' icon={<Image src="/iconly/chiekh.svg" width={24} height={24}/>} />
        <SideBarEL name='طلبات الانظمام' link='/admin/requests' icon={<Image src="/iconly/Paper.svg" width={24} height={24}/>}/>
      </SideBar>
      <div className='bg-lighterColor p-8 text-darkColor min-h-screen w-full'>
        { children }
      </div>
    </div>
  )
}

export default AdminLayout