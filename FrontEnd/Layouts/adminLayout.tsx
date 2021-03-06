import { NextPage } from 'next'
import Image from 'next/image'
import React from 'react'
import SideBar, { SideBarEL } from '../components/admin/sideBar'
const AdminLayout: NextPage = ({ children }) => {
  
  return (
    <div className='font-main flex' dir='rtl'>
      <SideBar>
        <SideBarEL name='لوحة التحكم' link='/admin' icon={<Image src="/iconly/Chart.svg" width={24} height={24}/>}/>
        <SideBarEL name='الطّلاب' link='/admin/students' icon={<Image src="/iconly/student.svg" width={24} height={24}/>}/>
        <SideBarEL name='الشيوخ' link='/admin/teachers' icon={<Image src="/iconly/chiekh.svg" width={24} height={24}/>} />
        <SideBarEL name='طلبات الانظمام' link='/admin/requests' icon={<Image src="/iconly/Paper.svg" width={24} height={24}/>}/>
      </SideBar>
      <div className='bg-lighterColor p-8 text-darkColor min-h-screen w-full'>
        { children }
      </div>
    </div>
  )
}

export default AdminLayout