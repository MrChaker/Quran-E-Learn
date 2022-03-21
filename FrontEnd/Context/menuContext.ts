import { createContext, useContext } from "react";

export type Menu = {
  menu: boolean;
  setMenu: (b: boolean) => void;
};
export const MenuCentext = createContext<Menu>({
  menu: false,
  setMenu: () => false,
});
export const useMenuContext = () => useContext(MenuCentext);