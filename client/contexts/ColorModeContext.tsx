import React, { useState } from 'react';
import { useMediaQuery } from '@mui/material';
import { Theme } from '@mui/material';
type ColorMode = 'light' | 'dark';
type ContextType = {
  colorMode: ColorMode;
  setColorMode: React.Dispatch<React.SetStateAction<ColorMode>>;
  prefersColorScheme: ColorMode;
};
type ColorModeProvider = {
  children: React.ReactNode;
};
export const ColorModeContext = React.createContext<ContextType>({
  colorMode: 'light',
  setColorMode: () => {},
  prefersColorScheme: 'light',
});
export const ColorModeProvider = ({ children }: ColorModeProvider) => {
  const preferDark = useMediaQuery<Theme>('(prefers-color-scheme: dark)');
  const prefersColorScheme: ColorMode = preferDark ? 'dark' : 'light';
  const [colorMode, setColorMode] = useState<ColorMode>('light');
  return (
    <ColorModeContext.Provider value={{ colorMode, setColorMode, prefersColorScheme }}>
      {children}
    </ColorModeContext.Provider>
  );
};
