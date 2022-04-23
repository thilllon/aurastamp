import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { GuidanceLink } from '@/components/project/GuidanceLink';
import { SettingsNotifications } from '@/components/settings/SettingsNotifications';
import { SettingsPassword } from '@/components/settings/SettingsPassword';
import { SettingsShortcuts } from '@/components/settings/SettingsShortcuts';
import { Crumb, CustomBreadcrumbs } from '@/components/shared/CustomBreadcrumbs';
import { Box, Container, Typography } from '@mui/material';
import Head from 'next/head';
import React, { ReactNode } from 'react';

export default function Settings() {
  const crumbs: Crumb[] = [{ label: 'Home', href: '/' }];

  return (
    <>
      <Head>
        <title>{`Settings | ${process.env.NEXT_PUBLIC_APP_TITLE}`}</title>
      </Head>

      <Box sx={{}}>
        <Container>
          <Box>
            <CustomBreadcrumbs crumbs={crumbs} />
            <Box sx={{ height: 50, display: 'flex', alignItems: 'center' }}>
              <Typography variant='h5'>{'Settings'}</Typography>
            </Box>
            <GuidanceLink />
          </Box>

          <SettingsShortcuts />

          {/* <SettingsNotifications /> */}

          <SettingsPassword />
        </Container>
      </Box>
    </>
  );
}

Settings.getLayout = (page: ReactNode) => <DashboardLayout>{page}</DashboardLayout>;
