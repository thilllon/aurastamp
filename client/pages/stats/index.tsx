import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { GuidanceLink } from '@/components/project/GuidanceLink';
import { Crumb, CustomBreadcrumbs } from '@/components/shared/CustomBreadcrumbs';
import { Link } from '@/components/shared/Link';
import { useCustomSession } from '@/utils/next-auth-react-query';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import React from 'react';

interface StatsIndexPageProps {}

export default function StatsIndexPage({}: StatsIndexPageProps) {
  const crumbs: Crumb[] = [{ label: 'Home', href: '/' }];
  const [session] = useCustomSession({ required: true, roles: ['admin'] });
  return (
    <>
      <Head>
        <title>{`Stats | ${process.env.NEXT_PUBLIC_APP_TITLE}`}</title>
      </Head>

      <Box>
        <Container maxWidth={false}>
          <Box>
            <CustomBreadcrumbs crumbs={crumbs} />
            <Box sx={{ height: 50, display: 'flex', alignItems: 'center' }}>
              <Typography variant='h5'>{'Statistics'}</Typography>
            </Box>
            <GuidanceLink />
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={4} xl={3}>
              <Card sx={{ height: '100%', display: 'flex', flexFlow: 'column nowrap' }}>
                <CardHeader
                  title={'라벨링 불일치 데이터'}
                  subheader={'완료된 작업 가운데 작업자 간 응답이 서로 다른 데이터를 확인합니다.'}
                />
                {/* <CardContent sx={{ display: 'flex' }}> */}
                {/* <Typography variant='body1'>(그래프추가...)</Typography> */}
                {/* </CardContent> */}
                <Divider />
                <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Link href={`/stats/inconsistencies`} underline='none'>
                    <Button>이동</Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>

            {/* // ****************************** */}

            <Grid item xs={12} md={6} lg={4} xl={3} sx={{ display: 'none' }}>
              <Card sx={{ height: '100%', display: 'flex', flexFlow: 'column nowrap' }}>
                <CardHeader
                  title={'작업현황'}
                  subheader={'작업자별 작업 진행 상황을 확인합니다.'}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  {/* <Typography variant='body1'>{'(그래프추가...)'}</Typography> */}
                </CardContent>
                <CardActions>
                  <Link
                    href={`/stats/progress`}
                    underline='none'
                    onClick={(ev) => ev.preventDefault()}
                  >
                    <Button disabled>이동</Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>

            {/* // ****************************** */}
          </Grid>
        </Container>
      </Box>
    </>
  );
}

StatsIndexPage.getLayout = (page: React.ReactNode) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export const getServerSideProps: GetServerSideProps<StatsIndexPageProps> = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session?.user.roles?.includes('admin')) {
    return {
      props: {},
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return { props: {} };
};
