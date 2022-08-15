import { ThemeProvider } from '@mui/material/styles';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { themeCreator } from './base';

export type ThemeName = 'PureLightTheme'; // 'PureLightTheme' | 'GreyGooseTheme' | 'PurpleFlowTheme';
export const defaultThemeName = 'PureLightTheme';
export const ThemeNameContext = createContext({
  switchThemeName: (themeName: ThemeName): void => {},
  themeName: defaultThemeName,
});

export const CustomThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeName, setThemeName] = useState<ThemeName>(defaultThemeName);
  const _theme = themeCreator(themeName);
  const [theme, setTheme] = useState(_theme);

  useEffect(() => {
    const curThemeName: ThemeName = window.localStorage.getItem('APP_THEME') || defaultThemeName;
    setThemeName(curThemeName);
  }, []);

  const switchThemeName = (themeName: ThemeName) => {
    window.localStorage.setItem('APP_THEME', themeName);
    setThemeName(themeName);
  };

  return (
    <ThemeNameContext.Provider value={{ themeName, switchThemeName }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeNameContext.Provider>
  );
};
