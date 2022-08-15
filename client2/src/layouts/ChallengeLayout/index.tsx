import Sidebar from '@/layouts/ChallengeLayout/Sidebar';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FC, ReactNode } from 'react';
import Header from './Header';

interface ChallengeLayoutProps {
  children?: ReactNode;
}

export const ChallengeLayout: FC<ChallengeLayoutProps> = ({ children }) => {
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
          // [theme.breakpoints.up('lg')]: {
          //   pl: theme.sidebar.width,
          // },
        }}
      >
        <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', width: '100%' }}>
          <Box flexGrow={1}>{children}</Box>
        </Box>

        {/* <ThemeSettings /> */}
      </Box>
    </>
  );
};
