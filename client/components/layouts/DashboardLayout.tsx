import { Footer } from '@/components/Footer';
import { ChartBarIcon } from '@/components/icons/ChartBarIcon';
import { DashboardSidebar } from '@/components/layouts/DashboardSidebar';
import { DashboardTopNavbar } from '@/components/layouts/DashboardTopNavbar';
import { defaultBreakpoint, sidebarWidth } from '@/contexts/MuiThemeContext';
import { WorkOutlineOutlined } from '@mui/icons-material';
import { Box, SxProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useCallback, useState } from 'react';

const isProduction = process.env.NEXT_PUBLIC_NODE_ENV === 'production';

const DashboardLayoutRoot = styled('main')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
  [theme.breakpoints.up(defaultBreakpoint)]: { paddingLeft: sidebarWidth },
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
  {
    id: 'projects',
    href: '/projects',
    icon: <WorkOutlineOutlined fontSize='small' />,
    title: '프로젝트',
    visible: true,
  },
  {
    id: 'stats',
    href: '/stats',
    icon: <ChartBarIcon fontSize='small' />,
    title: '통계',
    visible: false,
  },
  {
    id: 'newProject',
    href: '/admin/projects/new',
    icon: <ChartBarIcon fontSize='small' />,
    title: '(Dev Only) 새 프로젝트',
    visible: !isProduction,
  },
  // {
  //   href: '/',
  //   icon: <ChartBarIcon fontSize='small' />,
  //   title: '(Dev Only) Dashboard',
  //   visible: !isProduction,
  // },
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

  const onSidebarOpen = useCallback(() => {
    setSidebarOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  return (
    <>
      <DashboardTopNavbar onSidebarOpen={onSidebarOpen} />
      <DashboardLayoutRoot sx={sx}>
        <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column', width: '100%' }}>
          {children}
        </Box>
      </DashboardLayoutRoot>
      <DashboardSidebar onClose={onClose} open={isSidebarOpen} navData={navData} />
      <Footer />
    </>
  );
};
