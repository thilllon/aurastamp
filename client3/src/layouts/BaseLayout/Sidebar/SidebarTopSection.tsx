import { gaEvent } from '@/components/GoogleAnalytics';
import { Link } from '@/components/Link';
import { defaultSessionUser } from '@/lib/next-auth-react-query';
import { buildFullName } from '@/utils/common';
import { Locale } from '@/utils/locale';
import {
  AccountBoxTwoTone,
  LockOpenTwoTone as LockOpenTwoToneIcon,
  UnfoldMoreTwoTone as UnfoldMoreTwoToneIcon,
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
import { alpha, styled } from '@mui/material/styles';
import { SessionUser } from 'next-auth';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from 'react-query';

const UserBoxButton = styled(Button)(
  ({ theme }) => `
    padding: ${theme.spacing(1)};
    background-color: ${alpha(theme.colors.alpha.black[100], 0.08)};

    .MuiButton-label {
      justify-content: flex-start;
    }
 
    &:hover {
      background-color: ${alpha(theme.colors.alpha.black[100], 0.12)};
    }
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
    color: ${theme.sidebar.menuItemColor};
    display: block;

    &.popoverTypo {
      color: ${theme.palette.secondary.main};
    }
`
);

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
    color: ${alpha(theme.sidebar.menuItemColor, 0.6)};

    &.popoverTypo {
      color: ${theme.palette.secondary.light};
    }
`
);

export function SidebarTopSection() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const router = useRouter();
  const { data: session } = useSession({ required: true });
  const user: SessionUser = session?.user ?? defaultSessionUser;
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
      <UserBoxButton fullWidth color='secondary' variant='text' ref={ref} onClick={handleOpen}>
        <Avatar variant='rounded' alt={fullName} src={user.image} />
        <Box display='flex' flex={1} alignItems='center' justifyContent='space-between'>
          <UserBoxText>
            <UserBoxLabel variant='body1'>{fullName}</UserBoxLabel>
            <UserBoxDescription variant='body2'>{user.jobtitle}</UserBoxDescription>
          </UserBoxText>
          <UnfoldMoreTwoToneIcon fontSize='small' sx={{ ml: 1 }} />
        </Box>
      </UserBoxButton>

      <Popover
        disableScrollLock
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
        transformOrigin={{ vertical: 'center', horizontal: 'center' }}
        transitionDuration={1}
      >
        <MenuUserBox sx={{ minWidth: 210 }} display='flex'>
          <Avatar variant='rounded' alt={fullName} src={user.image} />
          <UserBoxText>
            <UserBoxLabel className='popoverTypo' variant='body1'>
              {fullName}
            </UserBoxLabel>
            <UserBoxDescription className='popoverTypo' variant='body2'>
              {user.jobtitle}
            </UserBoxDescription>
          </UserBoxText>
        </MenuUserBox>

        <Divider />

        <List sx={{ p: 1 }} component='nav'>
          <ListItem component={Link} href={'/profile'} button>
            <AccountBoxTwoTone fontSize='small' />
            <ListItemText primary={t('Profile')} />
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
            <LockOpenTwoToneIcon sx={{ mr: 1 }} />
            {t('로그아웃')}
          </Button>
        </Box>
      </Popover>
    </>
  );
}
