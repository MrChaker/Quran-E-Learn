import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useMenuContext } from '../../Context/menuContext';
import { useThemeContext } from '../../Context/themeContext';
import { Button } from './Button';
import DropMenu, { DropMenuLink } from './dropMenu';
import Image from 'next/image';
import Logo from './logo';
import { logout } from '../auth/functions';
import { useUserContext } from '../../Context/userContext';

export const NavBar = () => {
  const { menu, setMenu } = useMenuContext();
  const { darkTheme } = useThemeContext();
  const [dropMenu, setDropMenu] = useState(false);
  const { user } = useUserContext();
  return (
    <>
      <nav
        id="nav"
        dir="rtl"
        className="fixed top-0  z-30 flex w-screen items-center justify-between bg-lighterColor  py-5 font-main font-semibold text-darkColor shadow-sm shadow-gray-400 dark:bg-darkColor  dark:text-lighterColor dark:shadow-emerald-900 px-10 md:px-20 lg:px-[5.5rem]"
      >
        <Logo />

        <ul className="hidden list-none items-center gap-6 text-lg md:flex ">
          <NavEl text="الرّئيسية" link="/dashboard" />
          <NavEl text="الدّروس" />
          <NavEl text="شيوخنا" link="/teachers" />
        </ul>

        <div className="flex items-center">
          {!user && (
            <>
              <Link href="/auth/login">
                <a>
                  <Button
                    text="دخول"
                    color={
                      !darkTheme ? 'var(--main-color)' : 'var(--light-color)'
                    }
                    outline
                    size="0.9rem"
                    style="py-2 px-0 mx-2 hidden md:inline-block"
                  />
                </a>
              </Link>

              <Link href="/auth/signup">
                <a>
                  <Button
                    text="سجلّ مجانا"
                    color={
                      !darkTheme ? 'var(--main-color)' : 'var(--light-color)'
                    }
                    txtColor={
                      darkTheme ? 'var(--main-color)' : 'var(--light-color)'
                    }
                    size="0.9rem"
                    style="py-2 px-0 sm:mx-2 hidden md:inline-block"
                  />
                </a>
              </Link>
            </>
          )}
          {user && (
            <>
              <div
                className="flex items-center gap-1 sm:gap-2 rounded-xl hover:bg-lightColor dark:hover:bg-semiColor cursor-pointer py-1 px-2"
                onClick={() => setDropMenu(!dropMenu)}
              >
                <div className="rounded-full border border-darkColor dark:border-lightColor w-8 h-8 ml-1 overflow-hidden">
                  <Image
                    src={user?.image || '/male.png'}
                    width={32}
                    height={32}
                  />
                </div>
                <div className="text-md sm:text-xl">{user?.name}</div>
                <FontAwesomeIcon icon="caret-down" />
              </div>
              <DropMenu isOn={dropMenu} left="10%" top="80%">
                <DropMenuLink name="الحساب" link={`/profile/${user?._id}`} />
                {user?.roles?.admin && (
                  <DropMenuLink name="لوحة التحكم" link={`/admin`} />
                )}
                <DropMenuLink name="تسجيل الخروج" isButton onClick={logout} />
              </DropMenu>
            </>
          )}
          {<ThemeButton style="mx-2 sm:mx-4 text-sm sm:text-2xl" />}
          <FontAwesomeIcon
            icon="bars"
            className="cursor-pointer text-sm sm:text-2xl md:hidden "
            onClick={() => setMenu(true)}
          />
        </div>

        <div
          className={` fixed left-0 flex h-screen w-screen justify-between bg-orange-700 p-6 md:hidden ${
            menu ? 'top-0' : 'top-[-150%]'
          } z-50 transition-all`}
        >
          <ul className=" flex list-none flex-col items-center gap-6  text-4xl">
            <NavEl text="الرّئيسية" link="/dashboard" />
            <NavEl text="تسجيل الدخول" link="/auth/login" />
            <NavEl text="انشاء حساب" link="/auth/signup" />
            <NavEl text="الدّروس" link="/lessons/" />
            <NavEl text="شيوخنا" link="/teachers" />
          </ul>
          <FontAwesomeIcon
            icon="times"
            className="mr-4 cursor-pointer text-2xl md:hidden"
            onClick={() => setMenu(false)}
          />
        </div>
      </nav>
    </>
  );
};

const NavEl = (props: any) => {
  const { setMenu } = useMenuContext();
  return (
    <li>
      <Link href={props.link || '#'}>
        <a onClick={() => setMenu(false)}>{props.text}</a>
      </Link>
    </li>
  );
};

export const ThemeButton = (props: any) => {
  const { darkTheme, setDarkTheme } = useThemeContext();
  useEffect(() => {
    if (
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches) ||
      localStorage.theme === 'dark'
    ) {
      localStorage.setItem('theme', 'dark');
      setDarkTheme(true);
    } else if (!('theme' in localStorage)) {
      localStorage.setItem('theme', 'light');
    }
  }, []);
  useEffect(() => {
    if (localStorage.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkTheme]);

  const setOnStorage = (b: boolean) => {
    localStorage.setItem('theme', b ? 'dark' : 'light');
    setDarkTheme(b);
  };
  return (
    <FontAwesomeIcon
      icon={darkTheme ? 'sun' : 'moon'}
      className={`cursor-pointer text-2xl ${
        darkTheme ? 'text-yellow-400' : 'text-blue-900'
      } ${props.style}`}
      onClick={() => {
        setOnStorage(!darkTheme);
      }}
    />
  );
};
