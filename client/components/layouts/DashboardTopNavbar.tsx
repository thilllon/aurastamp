import { IconButtonMenu } from '@/components/shared/IconButtonMenu';
import { Link } from '@/components/shared/Link';
import { sidebarWidth } from '@/contexts/MuiThemeContext';
import { useCustomSession } from '@/utils/next-auth-react-query';
import styled from '@emotion/styled';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  AppBarProps,
  Box,
  Button,
  IconButton,
  NoSsr,
  CircularProgress,
  Toolbar,
  Typography,
} from '@mui/material';

const DashboardTopNavbarRoot = styled(AppBar)(({ theme }: any) => {
  return {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
  };
});

type DashboardTopNavbarProps = AppBarProps & {
  onSidebarOpen: () => void;
};

export const DashboardTopNavbar = ({ onSidebarOpen, sx, ...others }: DashboardTopNavbarProps) => {
  const [session, isLoading] = useCustomSession();

  return (
    <>
      <DashboardTopNavbarRoot
        sx={{ left: { lg: sidebarWidth }, width: { lg: `calc(100% - ${sidebarWidth}px)` }, ...sx }}
        {...others}
      >
        <Toolbar disableGutters sx={{ minHeight: 64, left: 0, px: 2 }}>
          <IconButton onClick={onSidebarOpen} sx={{ display: { xs: 'inline-flex', lg: 'none' } }}>
            <MenuIcon fontSize='small' />
          </IconButton>

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
              >{`${session?.user?.name} 님`}</Typography>
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
            {!isLoading && !session && (
              <Link href='/api/auth/signin' underline='none'>
                <Button>로그인</Button>
              </Link>
            )}
          </NoSsr>
        </Toolbar>
      </DashboardTopNavbarRoot>
    </>
  );
};
