import type { NextPage } from 'next';
import { NavBar } from '../components/general/Navbar';
import { useState } from 'react';
import { ThemeCentext } from '../Context/themeContext';
import { MenuCentext } from '../Context/menuContext';
import Footer from '../components/general/Footer';

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
            className="pt gap-3 overflow-hidden bg-lighterColor px-10 font-main dark:bg-darkColor md:px-20 lg:px-50 text-darkColor dark:text-lightColor"
            id="screen"
          >
            {children}
          </div>
          <Footer />
        </MenuCentext.Provider>
      </ThemeCentext.Provider>
    </>
  );
};
