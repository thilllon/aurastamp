import { Logo } from '@/components/LogoSign';
import { useSidebar } from '@/contexts/SidebarContext';
import { HeaderSearch } from '@/layouts/AccentSidebarLayout/Header/Search';
import {
  CloseTwoTone as CloseTwoToneIcon,
  MenuTwoTone as MenuTwoToneIcon,
} from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { HeaderUserbox } from './Userbox';

const HeaderWrapper = styled(Box)(({ theme }) => ({
  height: theme.header.height,
  color: theme.header.textColor,
  padding: theme.spacing(0, 2),
  right: 0,
  zIndex: 6,
  backgroundColor: alpha(theme.header.background, 0.95),
  backdropFilter: 'blur(8px)',
  boxShadow: theme.header.boxShadow,
  position: 'fixed',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  [theme.breakpoints.down('lg')]: {
    left: 0,
    width: 'auto',
  },
}));

export function Header() {
  const { sidebarOpen, toggleSidebar } = useSidebar();

  return (
    <HeaderWrapper component={'header'}>
      <Box display='flex' alignItems='center'>
        <Box component='span' sx={{ mr: 1, display: { lg: 'none' } }}>
          <Logo />
        </Box>

        <HeaderSearch />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box display={'flex'} flexDirection={'row'} gap={1}>
          {/* <HeaderNotifications /> */}
          {/* <LanguageSwitcher /> */}
        </Box>

        <HeaderUserbox />

        <IconButton onClick={toggleSidebar} sx={{ display: { md: 'none' } }}>
          {!sidebarOpen ? <MenuTwoToneIcon /> : <CloseTwoToneIcon />}
        </IconButton>
      </Box>
    </HeaderWrapper>
  );
}
