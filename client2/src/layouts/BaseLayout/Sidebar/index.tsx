import { CustomButton } from '@/components/CustomButton';
import { gaEvent } from '@/components/GoogleAnalytics';
import { Logo } from '@/components/LogoSign';
import Scrollbar from '@/components/Scrollbar';
import { useSidebar } from '@/contexts/SidebarContext';
import { defaultSessionUser } from '@/lib/next-auth-react-query';
import { Box, Button, Drawer } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { SessionUser } from 'next-auth';
import { signOut, useSession } from 'next-auth/react';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from 'react-query';

const SidebarWrapper = styled(Box)(({ theme }) => ({
  width: theme.sidebar.width,
  minWidth: theme.sidebar.width,
  color: theme.sidebar.textColor,
  background: theme.sidebar.background,
  boxShadow: theme.sidebar.boxShadow,
  position: `relative`,
  zIndex: `7`,
  height: `100%`,
}));

const TopSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 2),
}));

export function Sidebar() {
  const { sidebarOpen, closeSidebar } = useSidebar();
  const theme = useTheme();
  const { t } = useTranslation();
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const user: SessionUser = session?.user ?? defaultSessionUser;

  const handleLogout = async (): Promise<void> => {
    closeSidebar();
    signOut();
    gaEvent('logout', { userId: user.id });
    queryClient.clear();
  };

  return (
    <>
      {/* <SidebarWrapper
          sx={{
            display: { xs: 'none', md: 'inline-block' },
            position: 'fixed',
            left: 0,
            top: 0,
          }}
        >
          <Scrollbar>
            <TopSection>
              <Box sx={{ width: 52, mt: 2, mb: 3 }}>
                <Logo />
              </Box>
              <SidebarTopSection />
              <Button fullWidth component={Link} href='/sales'>
                {t('Contact Sales')}
              </Button>
            </TopSection>
            <SidebarMenu />
          </Scrollbar>
        </SidebarWrapper> */}

      <Drawer
        id='sidebar'
        transitionDuration={0}
        sx={{
          display: { md: 'none' },
          boxShadow: theme.sidebar.boxShadow,
        }}
        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
        open={sidebarOpen}
        onClose={closeSidebar}
        // variant='temporary'
        variant='persistent'
        elevation={9}
      >
        <SidebarWrapper>
          <Scrollbar>
            <TopSection>
              <Box sx={{ pt: 0.3, mb: 3 }}>
                <Logo />
              </Box>
              {/* {session && <SidebarTopSection />} */}
            </TopSection>

            <Box sx={{ display: 'flex', flexFlow: 'column', px: 2, py: 0, gap: 1 }}>
              {!session && (
                <CustomButton href={'/auth/login'} variant={'contained'}>
                  {t('로그인')}
                </CustomButton>
              )}
              <CustomButton href='/challenges'>{t('코딩 챌린지')}</CustomButton>
              <CustomButton href='/request-demo'>{t('데모 요청')}</CustomButton>
              {session && <CustomButton href='/profile/member'>{t('프로필')}</CustomButton>}
              {session && (
                <Button color='secondary' variant='text' onClick={handleLogout}>
                  {t('로그아웃')}
                </Button>
              )}
            </Box>

            {/* <SidebarMenu /> */}
          </Scrollbar>
        </SidebarWrapper>
      </Drawer>
    </>
  );
}
