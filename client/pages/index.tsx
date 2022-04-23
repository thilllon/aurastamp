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
import getConfig from 'next/config';
import React, { ReactNode } from 'react';

const { publicRuntimeConfig } = getConfig();

type IndexPageProps = {};

export default function IndexPage({}: IndexPageProps) {
  const [session] = useCustomSession({ required: false });
  const crumbs: Crumb[] = [{ label: 'Home', href: '/' }];

  return (
    <>
      <Box>
        <Container maxWidth={false}>
          <Box>
            <CustomBreadcrumbs crumbs={crumbs} />
            <Box sx={{ height: 50, display: 'flex', alignItems: 'center' }}>
              <Typography variant='h5'>{'홈'}</Typography>
            </Box>
            <GuidanceLink />
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={4} xl={3}>
              <Card sx={{ height: '100%', display: 'flex', flexFlow: 'column nowrap' }}>
                <CardHeader title={'프로젝트'} subheader={'모든 프로젝트를 확인합니다.'} />
                {/* <CardContent sx={{ display: 'flex' }}> */}
                {/* <Typography variant='body1'>(그래프추가...)</Typography> */}
                {/* </CardContent> */}
                <Divider />
                <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Link href={`/projects`} underline='none'>
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

IndexPage.getLayout = (page: ReactNode) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
