import { NavData } from '@/components/layouts/DashboardLayout';
import { NavItem } from '@/components/layouts/NavItem';
import { Logo } from '@/components/shared/Logo';
import { defaultBreakpoint, sidebarWidth } from '@/contexts/MuiThemeContext';
import { useCustomSession } from '@/utils/next-auth-react-query';
import { Box, Chip, Divider, Drawer, Theme, Typography, useMediaQuery } from '@mui/material';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

// TODO: 메뉴 보이는 방식 수정
// 사람마다 보이는 메뉴가 달라야함
// 로그인 유무로 보이는 메뉴가 달라야함

const isProduction = process.env.NEXT_PUBLIC_NODE_ENV === 'production';

type DashboardSidebarProps = {
  open: boolean;
  onClose: () => void;
  navData?: NavData[];
};

export const DashboardSidebar = ({ open, onClose, navData = [] }: DashboardSidebarProps) => {
  const router = useRouter();
  const [session] = useCustomSession();
  const isWide = useMediaQuery<Theme>((theme) => theme.breakpoints.up(defaultBreakpoint), {
    defaultMatches: true,
    noSsr: false,
  });

  // console.info('side bar session', session);
  // console.info('side bar user', session?.user);

  const orgName = 'Carillon AI';
  const tier = 'Premium';

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
            <NextLink href='/' passHref>
              <a>
                <Logo sx={{ height: 42, width: 42 }} />
              </a>
            </NextLink>
          </Box>
          <Box sx={{ px: 2 }}>
            <Box
              sx={{
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                display: 'flex',
                justifyContent: 'space-between',
                px: 2,
                py: 1.5,
                borderRadius: 1,
              }}
            >
              <Box sx={{ display: 'flex', flexFlow: 'column nowrap' }}>
                <Typography color='inherit' variant='subtitle1'>
                  {orgName}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip label={tier} color='primary' size='small' />
                </Box>
              </Box>
              {/* <IconButton size='large'>
                <UnfoldMore />
              </IconButton> */}
              {/* <IconButton size='large'>
                <SelectorIcon sx={{ color: 'neutral.500', width: 14, height: 14 }} />
              </IconButton> */}
            </Box>
          </Box>
        </Box>

        <Divider sx={{ borderColor: '#2D3748', my: 3 }} />

        <Box sx={{ flexGrow: 1 }}>
          {navData
            .filter((elem) => {
              if (session && elem.id === 'signOut') {
                return true;
              } else if (!session && elem.id === 'signOut') {
                return false;
              } else if (session?.user.roles?.includes('admin') && elem.id === 'stats') {
                return true;
              } else {
                return elem.visible;
              }
            })
            .map((item) => (
              <NavItem key={item.title} icon={item.icon} href={item.href} title={item.title} />
            ))}
        </Box>

        {/* <Divider
          sx={{
            borderColor: '#2D3748',
            my: 3,
          }} 
        /> */}

        {/* <Box sx={{ px: 2, py: 3 }}>
          <Typography color='neutral.100' variant='subtitle2'>
            Need more features?
          </Typography>
          <Typography color='neutral.500' variant='body2'>
            Contact us. 02-0000-0000
          </Typography>
          <Box
            sx={{
              display: 'flex',
              mt: 2,
              mx: 'auto',
              width: '160px',
              '& img': { width: '100%' },
            }}
          >
            <Image alt='Go to pro' src='/static/images/pro_sample_image.png' />
          </Box>
          <Link href='https://material-kit-pro-react.devias.io/'>
            <Button
              color='secondary'
              endIcon={<OpenInNew />}
              fullWidth
              sx={{ mt: 2 }}
              variant='contained'
            >
              Pro Live Preview
            </Button>
          </Link>
        </Box> */}
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

  console.info('narrow', 'open', open);

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
