import { AccountProfile } from '@/components/account/AccountProfile';
import { AccountProfileDetails } from '@/components/account/AccountProfileDetails';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { GuidanceLink } from '@/components/project/GuidanceLink';
import { Crumb, CustomBreadcrumbs } from '@/components/shared/CustomBreadcrumbs';
import { Box, Container, Typography } from '@mui/material';
import Head from 'next/head';
import React, { ReactNode } from 'react';

export default function ProfilePage() {
  const crumbs: Crumb[] = [{ label: 'Home', href: '/' }];

  return (
    <>
      <Head>
        <title>{`My Profile | ${process.env.NEXT_PUBLIC_APP_TITLE}`}</title>
      </Head>

      <Container maxWidth={false}>
        <Box>
          <CustomBreadcrumbs crumbs={crumbs} />
          <Box sx={{ height: 50, display: 'flex', alignItems: 'center' }}>
            <Typography variant='h5'>{'My Profile'}</Typography>
          </Box>
          <GuidanceLink />
        </Box>

        <Box maxWidth={'md'}>
          <AccountProfile />
          <Box sx={{ height: 20 }} />
          <AccountProfileDetails />
        </Box>
      </Container>
    </>
  );
}

ProfilePage.getLayout = (page: ReactNode) => <DashboardLayout>{page}</DashboardLayout>;
