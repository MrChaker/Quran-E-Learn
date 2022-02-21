import type { NextPage } from "next";
import { NavBar } from "../components/Navbar";
import { useState, createContext, useContext } from "react";
import Image from "next/image";
export type Menu = {
  menu: boolean;
  setMenu: (b: boolean) => void;
};
export const MenuCentext = createContext<Menu>({
  menu: false,
  setMenu: () => false,
});
export const useMenuContext = () => useContext(MenuCentext);
//theme
export type Theme = {
  darkTheme: boolean;
  setDarkTheme: (b: boolean) => void;
};
export const ThemeCentext = createContext<Theme>({
  darkTheme: false,
  setDarkTheme: () => false,
});

export const useThemeContext = () => useContext(ThemeCentext);
export const Layout: NextPage = ({ children }) => {
  const [menu, setMenu] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);

  return (
    <>
      <ThemeCentext.Provider value={{ darkTheme, setDarkTheme }}>
        <MenuCentext.Provider value={{ menu, setMenu }}>
          <NavBar />
          <div
            dir="rtl"
            className=" pt gap-3 overflow-hidden bg-lighterColor px-10 font-main dark:bg-darkColor md:px-20 lg:px-40 "
            id="screen"
          >
            {children}
          </div>
        </MenuCentext.Provider>
      </ThemeCentext.Provider>
    </>
  );
};


