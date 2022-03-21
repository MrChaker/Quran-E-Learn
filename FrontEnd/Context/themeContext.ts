import { createContext, useContext } from "react";

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