import { Logo } from '@/components/LogoSign';
import { useSidebar } from '@/contexts/SidebarContext';
import { ChallengeFinishButton } from '@/layouts/ChallengeLayout/Header/ChallengeFinishButton';
import { HelpDeskButton } from '@/layouts/ChallengeLayout/Header/HelpDeskButton';
import { CloseTwoTone, MenuTwoTone } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

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

export default function Header() {
  const { t } = useTranslation();
  const { sidebarOpen, toggleSidebar } = useSidebar();
  const onClick = useCallback(() => {
    toggleSidebar();
  }, [toggleSidebar]);

  return (
    <HeaderWrapper component={'header'}>
      <Box display='flex' alignItems='center'>
        <Box component='span' sx={{ mr: 1, display: 'inline-block' }}>
          <Logo />
        </Box>
        {/* <HeaderSearch /> */}
      </Box>

      <Box display='flex' alignItems='center' gap={2}>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }}>
          <HelpDeskButton />
          <ChallengeFinishButton />
        </Box>

        <IconButton onClick={onClick} sx={{ display: { md: 'none' } }}>
          {!sidebarOpen ? <MenuTwoTone /> : <CloseTwoTone />}
        </IconButton>
      </Box>
    </HeaderWrapper>
  );
}
