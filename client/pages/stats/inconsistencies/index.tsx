import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { GuidanceLink } from '@/components/project/GuidanceLink';
import { Link } from '@/components/shared/Link';
import { Crumb, CustomBreadcrumbs } from '@/components/shared/CustomBreadcrumbs';
import { useGetProjects } from '@/services/hooks';
import { useCustomSession } from '@/utils/next-auth-react-query';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  LinearProgress,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Head from 'next/head';
import React from 'react';

interface InconsistenciesPageProps {}

export default function InconsistenciesPage({}: InconsistenciesPageProps) {
  const [session] = useCustomSession();
  const getProjects = useGetProjects({}, { enabled: Boolean(session) });
  const theme = useTheme();
  const crumbs: Crumb[] = [
    { label: 'Home', href: '/' },
    { label: 'Stats', href: '/stats' },
  ];

  return (
    <>
      <Head>
        <title>{`Stats | ${process.env.NEXT_PUBLIC_APP_TITLE}`}</title>
      </Head>

      <Container maxWidth={false}>
        <Box>
          <CustomBreadcrumbs crumbs={crumbs} />
          <Box sx={{ height: 50, display: 'flex', alignItems: 'center' }}>
            <Typography variant='h5'>{'라벨링 불일치 데이터'}</Typography>
          </Box>
          <GuidanceLink />
        </Box>

        {getProjects.isLoading && <LinearProgress />}

        {getProjects.data?.projects.map(({ name, id: projectId }, idx) => (
          <Card key={idx} sx={{ mt: 2, display: 'flex', maxWidth: theme.breakpoints.values.md }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', mr: 'auto', py: 0 }}>
              <Typography
                variant='caption'
                sx={{ fontWeight: 'bold', width: 30, textAlign: 'left' }}
              >
                {idx + 1}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
                <Typography>{name}</Typography>
                <Typography variant='caption'>{projectId}</Typography>
              </Box>
            </CardContent>

            <CardActions sx={{ py: 1 }}>
              <Link href={`/stats/inconsistencies/${projectId}`} underline='none'>
                <Button>{`확인`}</Button>
              </Link>
            </CardActions>
          </Card>
        ))}
      </Container>
    </>
  );
}

InconsistenciesPage.getLayout = (page: React.ReactNode) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
