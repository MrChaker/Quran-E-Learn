import Link from 'next/link';
import React from 'react';
import Logo from './logo';

const Footer = () => {
  return (
    <footer className="bg-darkColor dark:bg-semiColor min-h-[200px] p-6 px-10 md:px-20 lg:px-50 text-lighterColor text-xl">
      <div className="flex justify-between">
        <Logo />
        <div dir="rtl">
          <Link href="/contact/teaching">
            <a className="text-sm block"> طلب الانظمام كمعلم </a>
          </Link>
          <Link href="#">
            <a className="text-sm block"> تواصل معنا </a>
          </Link>
          <Link href="/#">
            <a className="text-sm block"> سياسة الاستخدام </a>
          </Link>
        </div>
      </div>
      <p className="text-center mt-6">@Copy Rights 2022</p>
    </footer>
  );
};

export default Footer;
