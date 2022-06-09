import { Footer } from '@/components/Footer';
import { DashboardTopNavbar } from '@/components/layouts/DashboardTopNavbar';
import { WorkOutlineOutlined } from '@mui/icons-material';
import HelpIcon from '@mui/icons-material/Help';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import SearchIcon from '@mui/icons-material/Search';
import { BottomNavigation, BottomNavigationAction, Box, Paper, SxProps, Fab } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { isMobile } from 'react-device-detect';
import React, { ReactElement, ReactNode } from 'react';

const DashboardLayoutRoot = styled('main')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '420px',
  width: '100%',
  paddingTop: 70,
  margin: '0 auto',
  // [theme.breakpoints.up(defaultBreakpoint)]: { paddingLeft: sidebarWidth },
}));

type DashboardLayoutProps = {
  children: ReactNode;
  sx?: SxProps;
};

export type NavData = {
  id: string;
  href: string;
  icon: ReactElement;
  title: string;
  visible: boolean; // default visiblity
};

export const DashboardLayout = ({ children, sx }: DashboardLayoutProps) => {
  const router = useRouter();
  const onClickFab = () => {
    const url1 =
      'https://able-eater-423.notion.site/aura-stamp-mobile-61704cbc68764d209308fe8b78598b18';
    const url2 = 'https://able-eater-423.notion.site/aura-stamp-ae4a7568bf534d36a47a404c8aad28c4';

    if (isMobile) {
      window.open(url1);
    } else {
      window.open(url2);
    }
  };

  return (
    <>
      <DashboardLayoutRoot sx={sx}>
        <DashboardTopNavbar />

        <Box sx={{ display: 'flex', flex: '1 1 auto', width: '100%', paddingBottom: '56px' }}>
          {children}
        </Box>

        <Paper
          sx={{
            width: 'inherit',
            maxWidth: 'inherit',
            margin: '0 auto',
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
          }}
          elevation={3}
        >
          <Fab
            variant='extended'
            size='small'
            color='primary'
            aria-label='add'
            sx={{ position: 'absolute', zIndex: '999', right: '23px', bottom: '80px' }}
            onClick={onClickFab}
          >
            <HelpIcon fontSize='small' /> <Box sx={{ pl: '3px', fontWeight: 'bold' }}>ABOUT</Box>
          </Fab>

          <BottomNavigation
            showLabels
            value={router.pathname}
            sx={{
              bgcolor: 'primary.main',
              '& .Mui-selected': {
                '& .MuiBottomNavigationAction-label': {
                  fontSize: (theme) => theme.typography.caption,
                  transition: 'none',
                  fontWeight: 'bold',
                  lineHeight: '20px',
                },
                '& .MuiSvgIcon-root, & .MuiBottomNavigationAction-label': {
                  color: (theme) => theme.palette.primary.contrastText,
                },
              },
            }}
          >
            <BottomNavigationAction
              // label=''
              // value='/decode'
              icon={<SearchIcon fontSize='large' />}
              onClick={() => router.push('/decode')}
            />
            <BottomNavigationAction
              // label=''
              // value='/encode'
              icon={<BorderColorIcon fontSize='large' />}
              onClick={() => router.push('/encode')}
            />
          </BottomNavigation>
        </Paper>
      </DashboardLayoutRoot>
      <Footer />
    </>
  );
};
