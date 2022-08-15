import { CustomButton } from '@/components/CustomButton';
import { Logo } from '@/components/LogoSign';
import { useSidebar } from '@/contexts/SidebarContext';
import { HeaderUserbox } from '@/layouts/BaseLayout/Header/Userbox';
import { CloseTwoTone, MenuTwoTone } from '@mui/icons-material';
import { Box, IconButton, Skeleton } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { useSession } from 'next-auth/react';
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

export function Header() {
  const { t } = useTranslation();
  const { sidebarOpen, toggleSidebar } = useSidebar();
  const { status } = useSession();

  return (
    <HeaderWrapper component={'header'}>
      <Box sx={{ display: 'flex', alignItems: 'center', alignSelf: 'stretch' }}>
        <Logo />
        {/* <HeaderSearch /> */}
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }}>
          {/* <LanguageSwitcher /> */}

          <CustomButton href='/request-demo'>{t('얼리 액세스 신청')}</CustomButton>
          <CustomButton href='/challenges'>{t('코딩 챌린지')}</CustomButton>
          {status === 'unauthenticated' && (
            <CustomButton href={'/auth/login'} variant={'contained'}>
              {t('로그인')}
            </CustomButton>
          )}

          {status === 'loading' && (
            <Skeleton variant='rectangular'>
              <CustomButton href={'/auth/login'} variant={'contained'}>
                {t('로그인')}
              </CustomButton>
            </Skeleton>
          )}
        </Box>

        {status === 'authenticated' && <HeaderUserbox />}

        <IconButton onClick={toggleSidebar} sx={{ display: { md: 'none' } }}>
          {!sidebarOpen ? <MenuTwoTone /> : <CloseTwoTone />}
        </IconButton>
      </Box>
    </HeaderWrapper>
  );
}
