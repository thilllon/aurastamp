import { Budget } from '@/components/dashboard/Budget';
import { LatestOrders } from '@/components/dashboard/LatestOrders';
import { LatestProducts } from '@/components/dashboard/LatestProducts';
import { SalesBarGraph } from '@/components/dashboard/SalesBarGraph';
import { TasksProgress } from '@/components/dashboard/TasksProgress';
import { TotalCustomers } from '@/components/dashboard/TotalCustomers';
import { TotalProfit } from '@/components/dashboard/TotalProfit';
import { TrafficByDevice } from '@/components/dashboard/TrafficByDevice';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Link } from '@/components/shared/Link';
import { useCustomSession } from '@/utils/next-auth-react-query';
import { Box, Container, Grid } from '@mui/material';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';

const isProduction = process.env.NEXT_PUBLIC_NODE_ENV === 'production';

type DashboardDemoPageProps = {};

export default function DashboardDemoPage({}: DashboardDemoPageProps) {
  const router = useRouter();
  const [session] = useCustomSession({ required: true });
  return (
    <>
      <Head>
        <title>{`Dashboard | ${process.env.NEXT_PUBLIC_APP_TITLE}`}</title>
      </Head>

      <Box sx={{ flexGrow: 1, py: 2 }}>
        <Container maxWidth={false}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} lg={3} xl={3}>
              <Budget />
            </Grid>
            <Grid item xs={12} sm={6} lg={3} xl={3}>
              <TotalCustomers />
            </Grid>
            <Grid item xs={12} sm={6} lg={3} xl={3}>
              <TasksProgress />
            </Grid>
            <Grid item xs={12} sm={6} lg={3} xl={3}>
              <TotalProfit sx={{ height: '100%' }} />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ py: 2 }}>
            <Grid item xs={12} md={12} lg={8} xl={9}>
              <SalesBarGraph />
            </Grid>
            <Grid item xs={12} md={6} lg={4} xl={3}>
              <TrafficByDevice sx={{ height: '100%' }} />
            </Grid>
            <Grid item xs={12} md={6} lg={4} xl={3}>
              <LatestProducts sx={{ height: '100%' }} />
            </Grid>
            <Grid item xs={12} md={12} lg={8} xl={9}>
              <LatestOrders />
            </Grid>
          </Grid>{' '}
          <Link href='/stats'>stat</Link>
        </Container>
      </Box>
    </>
  );
}

DashboardDemoPage.getLayout = (page: ReactNode) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export const getServerSideProps: GetServerSideProps<DashboardDemoPageProps> = async ({
  req,
  res,
}) => {
  if (!isProduction) {
    return { props: {} };
  } else {
    return {
      props: {},
      redirect: {
        permanent: false,
        destination: '/projects',
      },
    };
  }
};
