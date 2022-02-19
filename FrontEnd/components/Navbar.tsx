import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useMenuContext, useThemeContext } from "../Layouts/layout";
export const NavBar = () => {
  const { menu, setMenu } = useMenuContext();
  return (<>
      <nav
        id="nav"
        className="fixed top-0  z-30 flex w-screen items-center justify-between bg-slate-200 px-10 py-5 font-main font-semibold text-slate-900 shadow-sm shadow-gray-400 dark:bg-slate-900  dark:text-slate-200 dark:shadow-slate-800 md:px-20 lg:px-40"
      >
        <div className="  bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-2xl text-transparent sm:text-3xl  ">
          LOGO
        </div>

        <ul className="hidden list-none items-center gap-6 text-lg md:flex ">
          <NavEl text="Home" />
          <NavEl text="About" />
          <NavEl text="Contact" />
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
            <NavEl text="Home" />
            <NavEl text="About" />
            <NavEl text="Contact" />
          </ul>
          <FontAwesomeIcon
            icon="times"
            className="mr-4 cursor-pointer text-2xl md:hidden"
            onClick={() => setMenu(false)}
          />
        </div>
      </nav>
      <Progress />
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

const Progress = ()=>{
  const pr = useRef<HTMLDivElement>(null!);
  useEffect(()=>{
    const height = document.body.clientHeight - window.innerHeight;
    const fraction: number = window.outerWidth / (height) ;

    if (pr.current)
    pr.current.style.width = `${window.scrollY* fraction}px`;
    window.addEventListener('scroll', ()=>{
      pr.current.style.width = `${window.scrollY * fraction}px`
    });
  }, [])
  return(
    <div ref={pr} className="fixed h-[4.8rem] sm:h-20 z-[29] bg-gradient-to-r from-blue-500 dark:from-blue-700 to-pink-500 dark:to-pink-600 transition Glowing">
        
    </div>
  )
}
