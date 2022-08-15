import { CustomFooter } from '@/components/Footer';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FC, ReactNode } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface AccentSidebarLayoutProps {
  children?: ReactNode;
}

export const AccentSidebarLayout: FC<AccentSidebarLayoutProps> = ({ children }) => {
  const theme = useTheme();

  return (
    <>
      <Header />

      <Sidebar />

      <Box
        component='main'
        sx={{
          // border: '2px solid red',
          position: 'relative',
          zIndex: 5,
          flex: 1,
          display: 'flex',
          pt: theme.header.height,
          [theme.breakpoints.up('lg')]: {
            pl: theme.sidebar.width,
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <Box flexGrow={1}>{children}</Box>
        </Box>
        {/* <ThemeSettings /> */}
      </Box>

      <CustomFooter />
    </>
  );
};
