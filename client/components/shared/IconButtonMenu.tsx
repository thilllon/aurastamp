import { Logout as LogoutIcon, Person } from '@mui/icons-material';
import {
  Avatar,
  Box,
  CircularProgress,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { MouseEvent, useCallback, useState } from 'react';
import { useQueryClient } from 'react-query';

export const IconButtonMenu = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const queryClient = useQueryClient();

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClickSignOut = useCallback(async () => {
    // queryClient.resetQueries();
    queryClient.cancelMutations();
    queryClient.cancelQueries();
    queryClient.removeQueries();
    queryClient.clear();

    localStorage.clear();
    sessionStorage.clear();

    signOut();
  }, [queryClient]);

  const onClickMyProfile = useCallback(async () => {
    router.push('/account/profile');
  }, [router]);

  const onClickSettings = useCallback(() => {
    router.push('/account/settings');
  }, [router]);
  // https://avatars.githubusercontent.com/u/44559468
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <IconButton onClick={handleClick} size='small' sx={{ ml: 2 }}>
          <Avatar src={session?.user?.image??undefined  } sx={{ width: 32, height: 32 }}>
            <Person />
          </Avatar>
        </IconButton>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {!session?.user && (
          <Box
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', px: 6, py: 6 }}
          >
            <CircularProgress />
          </Box>
        )}

        {/* <MenuItem>
          <Avatar /> Profile
        </MenuItem> */}

        {/* <MenuItem>
          <Avatar /> My account
        </MenuItem> */}

        {/* <MenuItem onClick={onClickMyProfile}>
          <ListItemIcon>
            <PersonAddIcon fontSize='small' />
          </ListItemIcon>
          {'내 정보'}
        </MenuItem> */}

        {/* <MenuItem onClick={onClickSettings}>
          <ListItemIcon>
            <SettingsIcon fontSize='small' />
          </ListItemIcon>
          {'설정'}
        </MenuItem> */}

        <MenuItem onClick={onClickSignOut}>
          <ListItemIcon>
            <LogoutIcon fontSize='small' />
          </ListItemIcon>
          {`로그아웃`}
        </MenuItem>
      </Menu>
    </>
  );
};
