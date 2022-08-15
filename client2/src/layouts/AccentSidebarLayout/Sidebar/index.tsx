import Link from '@/components/Link';
import { Logo } from '@/components/LogoSign';
import Scrollbar from '@/components/Scrollbar';
import { useSidebar } from '@/contexts/SidebarContext';
import { Box, Button, Drawer } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { SidebarMenu } from './SidebarMenu';
import { SidebarTopSection } from './SidebarTopSection';

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
  margin: theme.spacing(2, 3),
}));

export function Sidebar() {
  const { t } = useTranslation();
  const { sidebarOpen, toggleSidebar } = useSidebar();
  const theme = useTheme();

  return (
    <>
      <SidebarWrapper
        sx={{
          display: { xs: 'none', md: 'inline-block' },
          position: 'fixed',
          left: 0,
          top: 0,
        }}
      >
        <Scrollbar>
          <TopSection>
            {/* <Box sx={{ width: 52, mt: 2, mb: 3 }}>
              <Logo />
            </Box> */}
            {/* <SidebarTopSection /> */}
            <Button fullWidth component={Link} href='/sales'>
              {t('Contact Sales')}
            </Button>
          </TopSection>
          <SidebarMenu />
        </Scrollbar>
      </SidebarWrapper>

      <Drawer
        transitionDuration={0}
        sx={{ boxShadow: theme.sidebar.boxShadow }}
        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
        open={sidebarOpen}
        onClose={toggleSidebar}
        variant='temporary'
        elevation={9}
      >
        <SidebarWrapper>
          <Scrollbar>
            <TopSection>
              <Box sx={{ width: 52, ml: 1, mt: 1, mb: 3 }}>
                <Logo />
              </Box>
              <SidebarTopSection />
            </TopSection>

            <SidebarMenu />
          </Scrollbar>
        </SidebarWrapper>
      </Drawer>
    </>
  );
}
