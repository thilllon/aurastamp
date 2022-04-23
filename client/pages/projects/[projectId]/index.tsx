import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { GuidanceLink } from '@/components/project/GuidanceLink';
import { Link } from '@/components/shared/Link';
import { Crumb, CustomBreadcrumbs } from '@/components/shared/CustomBreadcrumbs';
import { useGetJobs } from '@/services/hooks';
import { useCustomSession } from '@/utils/next-auth-react-query';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Container,
  IconButton,
  LinearProgress,
  Skeleton,
  Tooltip,
  Typography,
} from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { useTheme } from '@mui/material/styles';
import { ArrowRight, Refresh } from '@mui/icons-material';
import { useQueryClient } from 'react-query';
import { rotator } from '@/contexts/MuiThemeContext';

interface JobListPageProps {}
export default function JobListPage({}: JobListPageProps) {
  const router = useRouter();
  const theme = useTheme();
  const projectId = router.query.projectId as string;
  const [session] = useCustomSession({ required: true });
  const queryClient = useQueryClient();
  const getJobs = useGetJobs(
    { projectId, skip: 0, take: 999 }, // FIXME: pagination 적용하기
    { enabled: Boolean(projectId) && Boolean(session) }
  );

  const onClickRefresh = useCallback(() => {
    getJobs.refetch();
  }, [getJobs]);

  const crumbs: Crumb[] = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
  ];

  const makeOnMouseEnterTasks = useCallback(
    (jobId: string) => {
      return () => {
        queryClient.prefetchQuery({ queryKey: ['TASKS', { jobId, skip: 0, take: 999 }] });
      };
    },
    [queryClient]
  );

  return (
    <>
      <Head>
        <title>{`Jobs | ${process.env.NEXT_PUBLIC_APP_TITLE}`}</title>
      </Head>

      <Box>
        <Container maxWidth={false}>
          <Box>
            <CustomBreadcrumbs crumbs={crumbs} />
            <Box sx={{ height: 50, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant='h5'>{'Jobs'}</Typography>
              <Tooltip title='새로고침'>
                <IconButton sx={rotator} onClick={onClickRefresh} disableRipple={false}>
                  <Refresh />
                </IconButton>
              </Tooltip>
            </Box>
            <GuidanceLink />
          </Box>

          {getJobs.isLoading && <LinearProgress />}

          {getJobs.data?.jobs.length === 0 && (
            <Card
              sx={{
                mt: 2,
                display: 'flex',
                height: '58.5px',
                px: 2,
                py: 0,
                background: '#f0f0f0',
                maxWidth: theme.breakpoints.values.md,
              }}
            >
              <CardContent
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mr: 'auto',
                  maxWidth: theme.breakpoints.values.md,
                }}
              >
                <Typography>{'데이터가 없습니다.'}</Typography>
              </CardContent>
            </Card>
          )}

          {getJobs.data?.jobs.map(({ id: jobId, name, count }, idx) => {
            const progressRate = count.finished / count.total;
            return (
              <Card
                key={idx}
                sx={{
                  mt: 2,
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  justifyContent: 'flex-end',
                  maxWidth: theme.breakpoints.values.md,
                }}
              >
                <CardContent sx={{ display: 'flex', alignItems: 'center', mr: 'auto', py: 0 }}>
                  <Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Typography>{name}</Typography>
                      {count.finished === count.total && (
                        <Chip label='완료' color='success' size='small' />
                      )}
                    </Box>
                    <Typography variant='subtitle2'>
                      {`진행률: ${(progressRate * 100).toFixed(2)}% (${count.finished} / ${
                        count.total
                      })`}
                    </Typography>
                  </Box>
                </CardContent>

                <CardActions sx={{ py: 1, alignSelf: 'flex-end' }}>
                  {projectId && jobId && (
                    <Link
                      href={`/projects/${projectId}/${jobId}/tasks`}
                      underline='none'
                      onMouseEnter={makeOnMouseEnterTasks(jobId)}
                    >
                      <Button size='small'>{'태스크 목록보기'}</Button>
                    </Link>
                  )}
                  {projectId && jobId && (
                    <Link href={`/projects/${projectId}/${jobId}`} underline='none'>
                      <Button endIcon={<ArrowRight fontSize='small' />} size='small'>
                        {'시작'}
                      </Button>
                    </Link>
                  )}
                </CardActions>
              </Card>
            );
          })}
        </Container>
      </Box>
    </>
  );
}

JobListPage.getLayout = (page: React.ReactNode) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
