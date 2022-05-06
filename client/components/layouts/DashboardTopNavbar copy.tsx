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
            }}
          >{`the aura`}</Typography>
        </Box>
        <Toolbar disableGutters sx={{ left: 0, px: 2 }}>
          {/* <IconButton onClick={onSidebarOpen} sx={{ display: { xs: 'inline-flex', lg: 'none' } }}>
            <MenuIcon fontSize='small' />
          </IconButton> */}

          {/* <TextField
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SvgIcon color='action' fontSize='small'>
                    <SearchIcon />
                  </SvgIcon>
                </InputAdornment>
              ),
            }}
            placeholder='Search customer'
            variant='outlined'
            sx={{ ml: 1, mr: 1 }}
          /> */}

          <Box sx={{ flexGrow: 1 }} />

          <NoSsr>
            {/* FIXME: users icon */}
            {/* {session && (
              <Tooltip title='Contacts'>
                <IconButton sx={{ ml: 1 }}>
                  <UsersIcon fontSize='small' />
                </IconButton>
              </Tooltip>
            )} */}
          </NoSsr>

          <NoSsr>
            {/* FIXME: notification icon */}
            {/* {session && (
              <Tooltip title='Notifications'>
                <IconButton sx={{ ml: 1 }}>
                  <Badge badgeContent={4} color='primary' variant='dot'>
                    <BellIcon fontSize='small' />
                  </Badge>
                </IconButton>
              </Tooltip>
            )} */}
          </NoSsr>

          <NoSsr>
            {session && (
              <Typography
                sx={{ color: '#000000' }}
                variant='h6'
              >{`Hi, ${session?.user?.name}!`}</Typography>
            )}
          </NoSsr>

          <NoSsr>
            {/* {session && (
              <IconButton sx={{ height: 40, width: 40, ml: 1 }}>
                <Avatar
                  // sx={{ height: 40, width: 40 }}
                  src='/static/images/avatars/avatar_1234.png'
                  // alt={session.user.name}
                >
                  <UserCircleIcon fontSize='small' />
                </Avatar>
              </IconButton> 
            )} */}
          </NoSsr>

          <NoSsr>
            {isLoading && <CircularProgress />}
            {!isLoading && session && <IconButtonMenu />}
            {/* {!isLoading && !session && (
              <Link href='/api/auth/signin' underline='none'>
                <Button>Login</Button>
              </Link>
            )} */}
          </NoSsr>
        </Toolbar>
      </DashboardTopNavbarRoot>
    </>
  );
};
