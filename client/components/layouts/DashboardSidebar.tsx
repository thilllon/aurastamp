import { NavData } from '@/components/layouts/DashboardLayout';
import { NavItem } from '@/components/layouts/NavItem';
import { Link } from '@/components/shared/Link';
import { defaultBreakpoint, sidebarWidth } from '@/contexts/MuiThemeContext';
import { Box, Divider, Drawer, Theme, Typography, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

type DashboardSidebarProps = {
  open?: boolean;
  onClose: () => void;
  navData?: NavData[];
};

export const DashboardSidebar = ({ open, onClose, navData = [] }: DashboardSidebarProps) => {
  const router = useRouter();
  const isWide = useMediaQuery<Theme>((theme) => theme.breakpoints.up(defaultBreakpoint), {
    defaultMatches: true,
    noSsr: false,
  });

  const orgName = 'Aura Stamp';

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (open) {
      onClose?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath, onClose, router.isReady]);

  const content = (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box>
          <Box sx={{ p: 3 }}>
            <Link href='/' underline='none' sx={{ display: 'flex' }}>
              <Typography variant='h4' sx={{ color: '#ffffff' }}>{`Aura.`}</Typography>
            </Link>
          </Box>
        </Box>

        <Divider sx={{ borderColor: '#2D3748', my: 3 }} />

        <Box sx={{ flexGrow: 1 }}>
          {navData.map((item) => (
            <NavItem key={item.title} icon={item.icon} href={item.href} title={item.title} />
          ))}
        </Box>
      </Box>
    </>
  );

  if (isWide) {
    return (
      <Box component='nav'>
        <Drawer
          anchor='left'
          open={true}
          PaperProps={{
            sx: { backgroundColor: 'neutral.900', color: '#FFFFFF', width: sidebarWidth },
          }}
          variant='permanent'
        >
          {content}
        </Drawer>
      </Box>
    );
  }

  return (
    <Box component='nav'>
      <Drawer
        anchor='left'
        onClose={onClose}
        open={open}
        PaperProps={{
          sx: { backgroundColor: 'neutral.900', color: '#FFFFFF', width: sidebarWidth },
        }}
        sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
        variant='temporary'
      >
        {content}
      </Drawer>
    </Box>
  );
};
