import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useMenuContext, useThemeContext } from "../Layouts/layout";

export const NavBar = () => {
  const { menu, setMenu } = useMenuContext();
  return (<>
      <nav
        id="nav"
        dir="rtl"
        className="fixed top-0  z-30 flex w-screen items-center justify-between bg-lighterColor px-10 py-5 font-main font-semibold text-darkColor shadow-sm shadow-gray-400 dark:bg-darkColor  dark:text-lighterColor dark:shadow-slate-800 md:px-20 lg:px-40"
      >
        <div className="  bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-5xl text-transparent sm:text-3xl font-quran ">
          <Link href="/">
            <a>
            القرآن
            </a>
          </Link>
        </div>

        <ul className="hidden list-none items-center gap-6 text-lg md:flex ">
          <NavEl text="الرّئيسية" />
          <NavEl text="الدّروس" />
          <NavEl text="شيوخنا" />
        </ul>
        <div>
          <FontAwesomeIcon
            icon="bars"
            className="mr-4 cursor-pointer text-2xl md:hidden"
            onClick={() => setMenu(true)}
          />
          <ThemeButton />
        </div>

        <div
          className={` fixed left-0 flex h-screen w-screen justify-between bg-orange-700 p-6 md:hidden ${
            menu ? "top-0" : "top-[-150%]"
          } z-50 transition-all`}
        >
          <ul className=" flex list-none flex-col items-center gap-6  text-4xl">
            <NavEl text="الرّئيسية" />
            <NavEl text="الدّروس" />
            <NavEl text="شيوخنا" />
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
  return (
    <li>
      <Link href="#">
        <a>{props.text}</a>
      </Link>
    </li>
  );
};

export const ThemeButton = () => {
  const { darkTheme, setDarkTheme } = useThemeContext();
  useEffect(() => {
    if (
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches) ||
      localStorage.theme === "dark"
    ) {
      localStorage.setItem("theme", "dark");
      setDarkTheme(true);
    } else if (!("theme" in localStorage)) {
      localStorage.setItem("theme", "light");
    }
  }, []);
  useEffect(() => {
    if (localStorage.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkTheme]);

  const setOnStorage = (b: boolean) => {
    localStorage.setItem("theme", b ? "dark" : "light");
    setDarkTheme(b);
  };
  return (
    <FontAwesomeIcon
      icon={ darkTheme ? "sun" : "moon"}
      className={`cursor-pointer text-2xl ${
        darkTheme ? "text-yellow-400" : "text-blue-900"
      }`}
      onClick={() => {
        setOnStorage(!darkTheme);
      }}
    />
  )
}
