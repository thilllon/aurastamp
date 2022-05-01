import { Footer } from '@/components/Footer';
import { DashboardSidebar } from '@/components/layouts/DashboardSidebar';
import { DashboardTopNavbar } from '@/components/layouts/DashboardTopNavbar';
import { defaultBreakpoint, sidebarWidth } from '@/contexts/MuiThemeContext';
import { WorkOutlineOutlined } from '@mui/icons-material';

import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { 
  Box, 
  SxProps, 
  BottomNavigation,
  BottomNavigationAction,
  Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useCallback, useState } from 'react';
import { useRouter } from "next/router";

const isProduction = process.env.NEXT_PUBLIC_NODE_ENV === 'production';

const DashboardLayoutRoot = styled('main')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '420px',
  width: '100%',
  paddingTop: 64,
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
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [page, setPage] = useState('');


  const onSidebarOpen = useCallback(() => {
    setSidebarOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  const router = useRouter();
  const onLink = (href) => {
    router.push(href);
  };

  return (
    <>
      {/* <DashboardTopNavbar onSidebarOpen={onSidebarOpen} /> */}
      <DashboardLayoutRoot sx={sx}>
        <DashboardTopNavbar onSidebarOpen={onSidebarOpen} />
        <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column', width: '100%', paddingBottom: '56px'}}>
          {children}
        </Box>
        <Paper sx={{ width: 'inherit', maxWidth: 'inherit', margin: '0 auto',
                     position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
          <BottomNavigation
            showLabels
            value={page}
            sx={{
              bgcolor: 'primary.main',
              '& .Mui-selected': {
                '& .MuiBottomNavigationAction-label': {
                  fontSize: theme => theme.typography.caption,
                  transition: 'none',
                  fontWeight: 'bold',
                  lineHeight: '20px'
                },
                '& .MuiSvgIcon-root, & .MuiBottomNavigationAction-label': {
                  color: theme => theme.palette.primary.contrastText
                }
              }
            }}
            onChange={(event, newValue) => {
              setPage(newValue);
            }}
          >
            <BottomNavigationAction label="Read" icon={<ImageSearchIcon />} onClick={() => onLink("/decode")} />
            <BottomNavigationAction label="Write" icon={<BorderColorIcon />} onClick={() => onLink("/encode")} />
          </BottomNavigation>
        </Paper>
      </DashboardLayoutRoot>
      {/* <DashboardSidebar onClose={onClose} open={isSidebarOpen} navData={navData} /> */}
      <Footer />
    </>
  );
};
