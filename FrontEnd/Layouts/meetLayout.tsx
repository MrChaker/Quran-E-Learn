import { NextPage } from 'next'
import React, { useState } from 'react'
import { ThemeCentext } from "../Context/themeContext";
import { MenuCentext } from "../Context/menuContext";
import { NavBar } from '../components/Navbar';


const MeetLayout: NextPage = ({children}) => {
  const [menu, setMenu] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);

  return (
    <>
      <ThemeCentext.Provider value={{ darkTheme, setDarkTheme }}>
        <MenuCentext.Provider value={{ menu, setMenu }}>
          <NavBar />
          <div
            dir="rtl"
            className=" gap-3 overflow-hidden bg-lighterColor px-0 font-main dark:bg-darkColor "
            id="screen"
          >
            {children}
          </div>
        </MenuCentext.Provider>
      </ThemeCentext.Provider>
    </>
  );
}

export default MeetLayout
