import BorderColorIcon from '@mui/icons-material/BorderColor';
import HelpIcon from '@mui/icons-material/Help';
import SearchIcon from '@mui/icons-material/Search';
import {
  AppBar,
  AppBarProps,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Fab,
  Paper,
  SxProps,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { isMobile } from 'react-device-detect';

const Footer = () => {
  return <Box component='footer' sx={{ display: 'flex', height: 0 }}></Box>;
};

type DashboardTopNavbarProps = AppBarProps;

const DashboardTopNavbarRoot = styled(AppBar)(({ theme }: any) => {
  return {
    backgroundColor: theme.palette.background.default,
    boxShadow: theme.shadows[0],
    display: 'flex',
    flex: '1 1 auto',
    maxWidth: '420px',
    maxHeight: '70px',
    width: '100%',
    margin: '0 auto',
  };
});

const DashboardTopNavbar = ({ sx, ...others }: DashboardTopNavbarProps) => {
  return (
    <>
      <DashboardTopNavbarRoot
        sx={{
          justifyContent: 'center',
          paddingLeft: '30px',
          paddingTop: '20px',
          width: 'inherit',
          maxWidth: 'inherit',
          margin: '0 auto',
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
        }}
        {...others}
      >
        <Box sx={{ width: '40vw', maxWidth: '160px' }}>
          <Image src='/logo.png' width={256} height={39} alt='logo' objectFit='contain' />
          {/* <img src='logo.png' width='100%' /> */}
        </Box>
      </DashboardTopNavbarRoot>
    </>
  );
};

const DashboardLayoutRoot = styled('main')(() => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '420px',
  width: '100%',
  paddingTop: 70,
  margin: '0 auto',
}));

export const DashboardLayout = ({ children, sx }: { children: ReactNode; sx?: SxProps }) => {
  const router = useRouter();
  const onClickFab = () => {
    if (isMobile) {
      window.open(process.env.NEXT_PUBLIC_NOTION_MOBILE);
    } else {
      window.open(process.env.NEXT_PUBLIC_NOTION_PC);
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
              label=''
              value='/decode'
              icon={<SearchIcon fontSize='large' />}
              onClick={() => router.push('/decode')}
            />
            <BottomNavigationAction
              label=''
              value='/encode'
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
