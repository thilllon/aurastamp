import { IconButtonMenu } from '@/components/shared/IconButtonMenu';
import { Link } from '@/components/shared/Link';
import { sidebarWidth } from '@/contexts/MuiThemeContext';
import styled from '@emotion/styled';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  AppBarProps,
  Box,
  Button,
  CircularProgress,
  IconButton,
  NoSsr,
  Toolbar,
  Typography,
} from '@mui/material';
import { useSession } from 'next-auth/react';

const DashboardTopNavbarRoot = styled(AppBar)(({ theme }: any) => {
  return {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
    display: 'flex',
    flex: '1 1 auto',
    maxWidth: '420px',
    maxHeight: '70px',
    width: '100%',
    margin: '0 auto',
  };
});

type DashboardTopNavbarProps = AppBarProps & {
  onSidebarOpen: () => void;
};

export const DashboardTopNavbar = ({ onSidebarOpen, sx, ...others }: DashboardTopNavbarProps) => {
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';

  return (
    <>
      <DashboardTopNavbarRoot
        sx={{
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
        <Box
          sx={{
            background: (theme) => theme.palette.primary.main,
            height: 120,
            p: 2,
            display: 'flex',
            flexFlow: 'row nowrap',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{
              color: (theme) => theme.palette.primary.contrastText,
              fontSize: 24,
              fontWeight: 700,
              fontFamily: (theme) => theme.typography.fontFamily,
            }}
          >{`the aura`}</Typography>
        </Box>
      </DashboardTopNavbarRoot>
    </>
  );
};
