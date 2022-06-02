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


const isProduction = process.env.NEXT_PUBLIC_NODE_ENV === 'production';

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
  children: React.ReactNode;
  sx?: SxProps;
};

export type NavData = {
  id: string;
  href: string;
  icon: React.ReactElement;
  title: string;
  visible: boolean; // default visiblity
};

const navData: NavData[] = [
  // {
  //   id: 'home',
  //   href: '/',
  //   icon: <WorkOutlineOutlined fontSize='small' />,
  //   title: 'Home',
  //   visible: true,
  // },
  {
    id: 'encode',
    href: '/encode',
    icon: <WorkOutlineOutlined fontSize='small' />,
    title: 'Hide your message',
    visible: true,
  },
  {
    id: 'decode',
    href: '/decode',
    icon: <WorkOutlineOutlined fontSize='small' />,
    title: 'Find your secret message',
    visible: true,
  },
  // {
  //   href: '/customers',
  //   icon: <UsersIcon fontSize='small' />,
  //   title: '(Dev Only) Customers',
  //   visible: !isProduction,
  // },
  // {
  //   href: '/products',
  //   icon: <ShoppingBagIcon fontSize='small' />,
  //   title: '(Dev Only) Products',
  //   visible: !isProduction,
  // },
  // {
  //   id: 'account',
  //   href: '/account',
  //   icon: <UserIcon fontSize='small' />,
  //   title: '(Dev Only) Account',
  //   visible: true,
  // },
  // {
  //   id: 'settings',
  //   href: '/account/settings',
  //   icon: <CogIcon fontSize='small' />,
  //   title: 'Settings',
  //   visible: true,
  // },
  // {
  //   id: 'signOut',
  //   href: '/api/auth/signout',
  //   icon: <LockIcon fontSize='small' />,
  //   title: 'Sign Out',
  //   visible: true,
  // },
  // {
  //   href: '/api/auth/signin',
  //   icon: <LockIcon fontSize='small' />,
  //   title: '(Dev Only) Sign In',
  //   visible: !isProduction,
  // },
  // {
  //   href: '/api/auth/signup',
  //   icon: <UserAddIcon fontSize='small' />,
  //   title: '(Dev Only) Sign Up',
  //   visible: !isProduction,
  // },
  // {
  //   href: '/404',
  //   icon: <XCircleIcon fontSize='small' />,
  //   title: '(Dev Only) Error',
  //   visible: !isProduction,
  // },
];

export const DashboardLayout = ({ children, sx }: DashboardLayoutProps) => {
  const router = useRouter();

  const onLink = (href: any) => {
    router.push(href);
  };

  return (
    <>
      <DashboardLayoutRoot sx={sx}>
        <DashboardTopNavbar />
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            width: '100%',
            paddingBottom: '56px',
          }}
        >
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
        <Fab variant="extended" size="small" color="primary" aria-label="add"
             sx={{ position: 'absolute', zIndex: '999', right: '23px', bottom: '80px'}}
             onClick={()=>{
                if(isMobile) {
                  window.open('https://able-eater-423.notion.site/aura-stamp-mobile-61704cbc68764d209308fe8b78598b18')
                }
                else {
                  window.open('https://able-eater-423.notion.site/aura-stamp-ae4a7568bf534d36a47a404c8aad28c4')
                }
              }
              }>
          <HelpIcon fontSize="small"/> <Box sx={{ pl: '3px', fontWeight: 'bold' }}>ABOUT</Box>
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
              onClick={() => onLink('/decode')}
            />
            <BottomNavigationAction
              label=''
              value='/encode'
              icon={<BorderColorIcon fontSize='large' />}
              onClick={() => onLink('/encode')}
            />
          </BottomNavigation>
        </Paper>
      </DashboardLayoutRoot>
      {/* <DashboardSidebar onClose={onClose} open={isSidebarOpen} navData={navData} /> */}
      <Footer />
    </>
  );
};
