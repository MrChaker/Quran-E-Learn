import Link from 'next/link';
import React, { ReactElement, useEffect, useState } from 'react';
type BarPropsType = {
  color?: string;
  darkColor?: string;
  logo: {
    lg: JSX.Element;
    link: string;
  };
  fSize?: {
    sm: string;
    md: string;
    lg: string;
    full: string;
  }; //array for diffrent view ports sm md lg full
};
const SideBar: React.FC<BarPropsType> = (props) => {
  return (
    <div
      className={`min-h-screen bg-${props.color} dark:bg-${
        props.darkColor
      } min-w-[70px] md:min-w-[220px] py-6 text-${props.darkColor} dark:text-${
        props.color
      } text-${props.fSize?.md || 'lg'} md:text-${
        props.fSize?.full || '2xl'
      } text-lg relative border-l-2 border-lightColor dark:border-semiColor
        mr-[-32px]  md:mr-[-52px]
      `}
    >
      <div className="fixed w-[80px] md:w-[260px] flex flex-col justify-start items-center h-full">
        <div className="logo text-2xl pb-4 mb-6 border-b border-semiColor">
          <Link href={props.logo.link}>
            <a>{props.logo.lg}</a>
          </Link>
        </div>
        <div className={`w-full`}>
          <div className="flex flex-col ">{props.children}</div>
        </div>
      </div>
    </div>
  );
};

type PropsType = {
  name: string;
  link: string;
  hoverColor?: string;
  icon: ReactElement;
  fullWidth?: boolean;
};
export const SideBarEL = (props: PropsType) => {
  return (
    <Link href={props.link}>
      <a
        className={`flex gap-5 bg-inherit hover:bg-semiColor hover:text-lighterColor py-4 pr-5 sm:pr-7 md:pr-8 ${
          props.fullWidth || props.fullWidth == undefined
            ? ''
            : 'w-4/5 rounded-lg'
        }`}
      >
        {props.icon}
        <p className="hidden md:block">{props.name}</p>
      </a>
    </Link>
  );
};
export default SideBar;
