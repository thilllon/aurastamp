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
  Grid,
  CardHeader,
  Container,
  Typography,
  Divider,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Role } from 'next-auth';
import Head from 'next/head';
import React from 'react';

interface AdminProjectsIndexPageProps {
  roles?: Role[];
}

export default function AdminProjectsIndexPage({ roles = [] }: AdminProjectsIndexPageProps) {
  const [session] = useCustomSession({ required: true });
  const theme = useTheme();

  const crumbs: Crumb[] = [
    { label: 'Home', href: '/' },
    { label: 'Admin', href: '/admin' },
  ];

  return (
    <>
      <Head>
        <title>{`Project | ${process.env.NEXT_PUBLIC_APP_TITLE}`}</title>
      </Head>
      <Container maxWidth={false}>
        <Box>
          <CustomBreadcrumbs crumbs={crumbs} />
          <Box sx={{ height: 50, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant='h5'>{'Project'}</Typography>
          </Box>
          <GuidanceLink />
        </Box>
      </Container>
      <Container maxWidth={false}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={4} xl={3}>
            <Card>
              <CardHeader
                title='새 프로젝트'
                subheader='새로운 라벨링 프로젝트를 생성합니다. 라벨링 데이터 파일을 업로드하고 프로젝트 정보를 입력하세요.'
              />
              {/* <CardContent></CardContent> */}
              <Divider />
              <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Link href='/admin/projects/new'>
                  <Button variant='contained' size='small'>
                    새 프로젝트
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

AdminProjectsIndexPage.getLayout = (page: React.ReactNode) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
