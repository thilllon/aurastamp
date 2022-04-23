import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { GuidanceLink } from '@/components/project/GuidanceLink';
import { Link } from '@/components/shared/Link';
import { CustomBreadcrumbs } from '@/components/shared/CustomBreadcrumbs';
import { useGetTaskList } from '@/services/hooks';
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
  Tooltip,
  Typography,
} from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { ArrowRight, Refresh } from '@mui/icons-material';
import { rotator } from '@/contexts/MuiThemeContext';
import axios from 'axios';
import { CustomSelect } from '@/components/shared/CustomSelect';

const options = [
  { value: 'undone', label: '작업 미완료' },
  { value: 'all', label: '전체' },
  // { value: 'done', label: '작업 완료' },
];

interface TaskListPageProps {}
export default function TaskListPage({}: TaskListPageProps) {
  const router = useRouter();
  const theme = useTheme();
  const jobId = router.query.jobId as string;
  const projectId = router.query.projectId as string;
  const statusInUrl = router.query?.status as string | undefined;
  const [session] = useCustomSession({ required: true });
  const [status, setStatus] = useState<string>(statusInUrl || 'undone');
  const getTaskList = useGetTaskList(
    { jobId, status, take: 999 }, // FIXME: pagination 적용하기
    {
      enabled: Boolean(jobId) && Boolean(session),
      onError: (err) => {
        if (axios.isAxiosError(err) && err?.response?.status === 403) {
          router.push('/projects');
        }
      },
    }
  );

  const onClickRefresh = useCallback(() => {
    getTaskList.refetch();
  }, [getTaskList]);

  const crumbs = projectId
    ? [
        { label: 'Home', href: '/' },
        { label: 'Projects', href: '/projects' },
        { label: 'Jobs', href: `/projects/${projectId}` },
      ]
    : undefined;

  const onChangeStatus = useCallback((value: string, label?: string) => {
    setStatus(value);
  }, []);

  return (
    <>
      <Head>
        <title>{`Tasks | ${process.env.NEXT_PUBLIC_APP_TITLE}`}</title>
      </Head>

      <Box>
        <Container maxWidth={false}>
          <Box>
            <CustomBreadcrumbs crumbs={crumbs} />
            <Box sx={{ height: 50, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant='h5'>{'Tasks'}</Typography>

              <Tooltip title='새로고침'>
                <IconButton sx={rotator} onClick={onClickRefresh} disableRipple={false}>
                  <Refresh />
                </IconButton>
              </Tooltip>
            </Box>
            <GuidanceLink />
            <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
              <CustomSelect
                id='status'
                onChange={onChangeStatus}
                options={options}
                sx={{ width: '10rem' }}
                formControlProps={{
                  fullWidth: true,
                  margin: 'dense',
                  size: 'small',
                }}
              />
            </Box>
          </Box>

          {/* <Skeleton height={58.5} sx={{ mt: 2, height: 58.5 }} /> */}

          {getTaskList.isLoading && <LinearProgress sx={{ mt: 1 }} />}

          {getTaskList.data?.tasks.length === 0 && (
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
                }}
              >
                <Typography>{'데이터가 없습니다.'}</Typography>
              </CardContent>
            </Card>
          )}

          {getTaskList.data?.tasks.map(({ id: taskId, selected, order, title }, idx) => (
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
              <CardContent
                sx={{ display: 'flex', alignItems: 'center', mr: 'auto', px: 2, py: 0, gap: 1 }}
              >
                <Typography
                  variant='caption'
                  sx={{ fontWeight: 'bold', width: 30, textAlign: 'left' }}
                >
                  {order + 1}
                </Typography>
                <Tooltip title={taskId} placement='bottom-start'>
                  <Typography
                    component='div'
                    sx={{
                      display: '-webkit-box',
                      // '-webkit-line-clamp': '1',
                      // '-webkit-box-orient': 'vertical',
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: 'vertical',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                    }}
                  >
                    {title}
                  </Typography>
                </Tooltip>
                {selected && <Chip label='완료' color='success' size='small' />}
              </CardContent>
              <CardActions
                sx={{
                  px: 1,
                  py: 1,
                  alignSelf: 'flex-end',
                  minWidth: '100px',
                  justifyContent: 'flex-end',
                  // border: '1px solid',
                }}
              >
                <Link href={`/projects/${projectId}/${jobId}/${taskId}`} underline='none'>
                  <Button endIcon={<ArrowRight fontSize='small' />} size='small'>
                    {'시작'}
                  </Button>
                </Link>
              </CardActions>
            </Card>
          ))}
        </Container>
      </Box>
    </>
  );
}

TaskListPage.getLayout = (page: React.ReactNode) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
