import Link from 'next/link';
import React, { ReactElement, useEffect, useState } from 'react';
type BarPropsType = {
  bgColor?: string;
  textColor?: string;
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
  extraStyle?: string;
};
const SideBar: React.FC<BarPropsType> = (props) => {
  return (
    <div
      className={`h-[70px] sm:min-h-[200vh] sm:h-full bg-${
        props.bgColor
      } dark:bg-${
        props.textColor
      } fixed  sm:relative bottom-0 left-0 w-full sm:w-[70px] sm:min-w-[70px] md:min-w-[260px] md:w-[260px] py-6 text-${
        props.textColor
      } dark:text-${props.bgColor} text-${props.fSize?.md || 'lg'} md:text-${
        props.fSize?.full || '2xl'
      } text-lg border-t-2 sm:border-t-0 sm:border-l-2 border-lightColor  dark:border-semiColor
        ${props.extraStyle}
      `}
    >
      <div className="fixed bottom-0 sm:bottom-auto  w-full sm:w-[70px] md:w-[260px] flex flex-col justify-start items-center h-[70px] sm:h-full">
        <div
          className={`logo text-2xl pb-4 mb-6 border-b border-semiColor hidden sm:block `}
        >
          <Link href={props.logo.link}>
            <a>{props.logo.lg}</a>
          </Link>
        </div>
        <div className={`w-full my-auto sm:my-0`}>
          <div className="flex justify-center items-center  flex-row sm:flex-col ">
            {props.children}
          </div>
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
        className={`flex gap-5 bg-inherit hover:bg-semiColor py-4 px-5 sm:pr-5 md:pr-8 ${
          props.fullWidth || props.fullWidth == undefined
            ? 'w-full justify-center sm:justify-start'
            : '  sm:w-4/5 rounded-lg'
        }`}
      >
        {props.icon}
        <p className="hidden md:block">{props.name}</p>
      </a>
    </Link>
  );
};
export default SideBar;