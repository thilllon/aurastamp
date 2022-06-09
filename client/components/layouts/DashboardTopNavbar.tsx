import styled from '@emotion/styled';
import { AppBar, AppBarProps, Box, Typography } from '@mui/material';

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

type DashboardTopNavbarProps = AppBarProps;

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
          <img src='logo.png' width='100%'></img>
        </Box>
      </DashboardTopNavbarRoot>
    </>
  );
};
