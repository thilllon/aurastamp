import { CustomFooter } from '@/components/Footer';
import { Header } from '@/layouts/BaseLayout/Header';
import { Sidebar } from '@/layouts/BaseLayout/Sidebar';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ReactNode } from 'react';

export const BaseLayout = ({ children }: { children?: ReactNode }) => {
  const theme = useTheme();

  return (
    <>
      <Header />

      <Sidebar />

      <Box
        component='main'
        sx={{
          position: 'relative',
          zIndex: 5,
          flex: 1,
          display: 'flex',
          pt: theme.header.height,
          // [theme.breakpoints.up('md')]: {
          //   pl: theme.sidebar.width,
          // },
        }}
      >
        <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', width: '100%' }}>
          <Box flexGrow={1}>{children}</Box>
        </Box>
      </Box>

      <CustomFooter />
    </>
  );
};
