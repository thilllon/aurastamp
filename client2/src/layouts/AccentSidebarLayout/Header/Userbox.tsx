import { gaEvent } from '@/components/GoogleAnalytics';
import Link from '@/components/Link';
import { defaultSessionUser } from '@/lib/next-auth-react-query';
import { buildFullName } from '@/utils/common';
import { Locale } from '@/utils/locale';
import {
  AccountBoxTwoTone,
  ExpandMoreTwoTone as ExpandMoreTwoToneIcon,
  LockOpenTwoTone,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Popover,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { SessionUser } from 'next-auth';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { memo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from 'react-query';

const UserBoxButton = styled(Button)(
  ({ theme }) => `
      padding: ${theme.spacing(0, 1)};
      height: ${theme.spacing(5)}; 
`
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
  width:7rem; 
  overflow:hidden;
  text-overflow:ellipsis;

        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`
);

const UserBoxDescription = styled(Typography)(
  ({ theme }) =>
    `
        color: ${theme.palette.secondary.light}
`
);

export const HeaderUserbox = memo(() => {
  const queryClient = useQueryClient();
  const { data: session } = useSession({ required: true });
  const { t } = useTranslation();
  const user: SessionUser = session?.user ?? defaultSessionUser;
  const router = useRouter();
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleLogout = async (): Promise<void> => {
    handleClose();
    signOut();
    gaEvent('logout', { userId: user.id });
    queryClient.clear();
  };

  const fullName = buildFullName(user.firstName, user.lastName, Locale.ko_KR);

  return (
    <>
      <UserBoxButton color='primary' variant='text' ref={ref} onClick={handleOpen}>
        <Avatar variant='rounded' alt={fullName} src={user.image} />
        <Box component='span' sx={{ display: { xs: 'none', md: 'inline-block' } }}>
          <UserBoxText>
            <UserBoxLabel variant='body1'>{fullName}</UserBoxLabel>
            <UserBoxDescription variant='body2'>{user.jobtitle}</UserBoxDescription>
          </UserBoxText>
        </Box>
        <Box component='span' sx={{ display: { xs: 'none', sm: 'inline-block' } }}>
          <ExpandMoreTwoToneIcon sx={{ ml: 1 }} />
        </Box>
      </UserBoxButton>

      <Popover
        disableScrollLock
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        transitionDuration={1}
      >
        <MenuUserBox sx={{ minWidth: 210 }} display='flex'>
          <Avatar variant='rounded' alt={fullName} src={user.image} />
          <UserBoxText>
            <UserBoxLabel variant='body1'>{fullName}</UserBoxLabel>
            <UserBoxDescription variant='body2'>{user.jobtitle}</UserBoxDescription>
          </UserBoxText>
        </MenuUserBox>

        <Divider />

        <List sx={{ p: 1 }} component='nav'>
          <ListItem component={Link} href={'/profile'} button>
            <AccountBoxTwoTone fontSize='small' />
            <ListItemText primary={t('프로필')} />
          </ListItem>
          {/* <ListItem component={Link} href={'/inbox'} button>
            <InboxTwoTone fontSize='small' />
            <ListItemText primary={t('Inbox')} />
          </ListItem>
          <ListItem component={Link} href={'/projects'} button>
            <AccountTreeTwoTone fontSize='small' />
            <ListItemText primary={t('Projects')} />
          </ListItem> */}
        </List>

        <Divider />

        <Box m={1}>
          <Button color='primary' fullWidth onClick={handleLogout}>
            <LockOpenTwoTone sx={{ mr: 1 }} />
            {t('로그아웃')}
          </Button>
        </Box>
      </Popover>
    </>
  );
});
