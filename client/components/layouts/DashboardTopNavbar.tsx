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
// import { useSession } from 'next-auth/react';

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

type DashboardTopNavbarProps = AppBarProps ;

export const DashboardTopNavbar = ({ sx, ...others }: DashboardTopNavbarProps) => {
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
            <img src="logo.png" width="100%"></img>
          </Box>
      </DashboardTopNavbarRoot>
    </>
  );
};
