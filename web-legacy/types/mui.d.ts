import {
  Palette as MuiPalette,
  PaletteOptions as MuiPaletteOptions,
} from '@mui/material/styles/createPalette';

// https://stackoverflow.com/a/70490736

// export declare module '@mui/material/styles/createPalette' {
//   interface Palette extends MuiPalette {
//     // neutralShade: { main: string };
//   }
//   interface PaletteOptions extends MuiPaletteOptions {
//     // neutralShade?: { main: string };
//   }
// }

// https://mui.com/customization/theming/#custom-variables
// https://stackoverflow.com/questions/59365396/how-to-use-material-ui-custom-theme-in-react-with-typescript

export declare module '@mui/material/styles' {
  export interface Theme {}

  export interface ThemeOptions {
    shadows?: string[];
    breakpoints?: {
      values?: {
        xs?: number;
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
      };
    };
    palette?: PaletteOptions;
  }
  interface Palette extends MuiPalette {}
  interface PaletteOptions extends MuiPaletteOptions {
    neutral?: {
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
    background?: {
      dark?: string;
      paper?: string;
    };
    divider?: string;
  }

  export function createTheme(options?: ThemeOptions): Theme;
  export function useTheme(): Theme;
}

export declare module '@mui/material' {
  // TODO: PR to @mui/material
  interface InputLabelProps {
    size?: 'small' | 'medium' | 'large';
  }
}
