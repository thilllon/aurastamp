import { AccountProfile } from '@/components/account/AccountProfile';
import { AccountProfileDetails } from '@/components/account/AccountProfileDetails';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { useCustomSession } from '@/utils/next-auth-react-query';
import { Box, Container, Grid, Typography } from '@mui/material';
import Head from 'next/head';

export default function Account() {
  const [session] = useCustomSession({ required: true });

  return (
    <>
      <Head>
        <title>Account | Carillon AI</title>
      </Head>
      <Box sx={{ flexGrow: 1, py: 8 }}>
        {session && JSON.stringify(session)}
        <Container>
          <Typography sx={{ mb: 3 }} variant='h4'>
            Account
          </Typography>
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <AccountProfile />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <AccountProfileDetails />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

Account.getLayout = (page: React.ReactNode) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
