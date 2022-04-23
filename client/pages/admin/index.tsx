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
  CardHeader,
  Container,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Role } from 'next-auth';
import Head from 'next/head';
import React from 'react';
interface AdminIndexPageProps {
  roles?: Role[];
}

export default function AdminIndexPage({ roles = [] }: AdminIndexPageProps) {
  const [session] = useCustomSession({ required: true });
  const theme = useTheme();

  const crumbs: Crumb[] = [{ label: 'Home', href: '/' }];

  return (
    <>
      <Head>
        <title>{`Admin | ${process.env.NEXT_PUBLIC_APP_TITLE}`}</title>
      </Head>
      <Container maxWidth={false}>
        <Box>
          <CustomBreadcrumbs crumbs={crumbs} />
          <Box sx={{ height: 50, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant='h5'>{'Admin'}</Typography>
          </Box>
          <GuidanceLink />
        </Box>
      </Container>

      <Container maxWidth={false}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={4} xl={3}>
            <Card>
              <CardHeader title='프로젝트 관리' subheader='' />
              {/* <CardContent></CardContent> */}
              <Divider />
              <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Link href='/admin/projects'>
                  <Button variant='contained' size='small'>
                    프로젝트
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
          {/* // ****************************** */}
          {/* // ****************************** */}

          {/* // ****************************** */}
          {/* // ****************************** */}
        </Grid>
      </Container>
    </>
  );
}

AdminIndexPage.getLayout = (page: React.ReactNode) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
