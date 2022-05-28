import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NextPage } from 'next';
import Image from 'next/image';
import React from 'react';
import { logout } from '../components/auth/functions';
import SideBar, { SideBarEL } from '../components/general/sideBar';
const AdminLayout: NextPage = ({ children }) => {
  return (
    <div className="font-main flex" dir="rtl">
      <SideBar
        bgColor="darkColor"
        textColor="lighterColor"
        logo={{ lg: <>Quran</>, link: '/dashboard' }}
      >
        <SideBarEL
          name="لوحة التحكم"
          link="/admin"
          hoverColor="semiColor"
          icon={<Image src="/iconly/Chart.svg" width={24} height={24} />}
        />
        <SideBarEL
          name="الطّلاب"
          link="/admin/students"
          hoverColor="semiColor"
          icon={<Image src="/iconly/student.svg" width={24} height={24} />}
        />
        <SideBarEL
          name="الشيوخ"
          link="/admin/teachers"
          hoverColor="semiColor"
          icon={<Image src="/iconly/chiekh.svg" width={24} height={24} />}
        />
        <SideBarEL
          name="الدروس"
          link="/admin/lessons"
          hoverColor="semiColor"
          icon={<p>📑</p>}
        />
        <SideBarEL
          name="طلبات الانظمام"
          link="/admin/requests"
          hoverColor="semiColor"
          icon={<Image src="/iconly/Paper.svg" width={24} height={24} />}
        />
        <SideBarEL
          name="تسجيل الخروج"
          link="#"
          onClick={logout}
          hoverColor="semiColor"
          icon={<FontAwesomeIcon icon="door-open" />}
        />
      </SideBar>
      <div className="bg-lighterColor p-8 text-darkColor min-h-screen w-full">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
