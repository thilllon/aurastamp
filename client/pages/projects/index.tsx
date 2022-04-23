import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { GuidanceLink } from '@/components/project/GuidanceLink';
import { Crumb, CustomBreadcrumbs } from '@/components/shared/CustomBreadcrumbs';
import { Link } from '@/components/shared/Link';
import { rotator } from '@/contexts/MuiThemeContext';
import { useGetProjects } from '@/services/hooks';
import { useCustomSession } from '@/utils/next-auth-react-query';
import { Add, ArrowRight, Refresh } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  IconButton,
  LinearProgress,
  Tooltip,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Role } from 'next-auth';
import Head from 'next/head';
import React, { useCallback } from 'react';

interface ProjectsIndexPageProps {
  roles?: Role[];
}

export default function ProjectsIndexPage({ roles = [] }: ProjectsIndexPageProps) {
  const [session] = useCustomSession({
    required: true,
    redirectTo: '/api/auth/signin',
  });
  const theme = useTheme();

  const getProjects = useGetProjects(
    { skip: 0, take: 9999 },
    { enabled: Boolean(session), retry: 30 * 1000 }
  );

  const onClickRefresh = useCallback(() => {
    getProjects.refetch();
  }, [getProjects]);

  const crumbs: Crumb[] = [{ label: 'Home', href: '/' }];

  const atLeft = ((session?.user.accessTokenExpiry as number) - Date.now()) / 1000;
  const rtLeft = ((session?.user.refreshTokenExpiry as number) - Date.now()) / 1000;

  console.group('project page');
  console.info('accessToken', session?.user.accessToken);
  console.info(atLeft, rtLeft);
  console.info('isError', getProjects.isError);
  console.info('error', getProjects.error);
  console.groupEnd();

  return (
    <>
      <Head>
        <title>{`Projects | ${process.env.NEXT_PUBLIC_APP_TITLE}`}</title>
      </Head>
      <Box>
        <Container maxWidth={false}>
          <Box>
            <CustomBreadcrumbs crumbs={crumbs} />
            <Box sx={{ height: 50, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant='h5'>{'Projects'}</Typography>

              <Tooltip title='새로고침'>
                <IconButton sx={rotator} onClick={onClickRefresh} disableRipple={false}>
                  <Refresh />
                </IconButton>
              </Tooltip>

              {/* {session?.user?.roles?.includes('admin') && (
                <Tooltip title='새로운 프로젝트를 추가합니다.'>
                  <Link href='/admin/projects/new' underline='none'>
                    <Button startIcon={<Add />}>{'추가'}</Button>
                  </Link>
                </Tooltip>
              )} */}
            </Box>
            <GuidanceLink />
          </Box>

          {/* ****************************** */}
          {/* <Typography variant='h6' sx={{ whiteSpace: 'wrap' }}>
            {(session?.user.accessToken as string)?.substr(-15)}
          </Typography> */}
          {/* ****************************** */}
          {/* <Typography variant='h6' sx={{ whiteSpace: 'wrap' }}>
            {isNaN(atLeft) ? 'NaN' : atLeft}
          </Typography> */}
          {/* ****************************** */}
          {/* <Typography variant='h6' sx={{ whiteSpace: 'wrap' }}>
            {isNaN(rtLeft) ? 'NaN' : rtLeft}
          </Typography> */}
          {/* ****************************** */}

          {getProjects.isLoading && <LinearProgress />}

          {getProjects.data?.projects.length === 0 && (
            <Card
              sx={{
                maxWidth: theme.breakpoints.values.md + 'px',
                mt: 2,
                display: 'flex',
                height: '58.5px',
                px: 2,
                py: 0,
                background: '#f0f0f0',
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

          {getProjects.data?.projects.map(({ id: projectId, name }, idx) => {
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
                  <Typography>{name}</Typography>
                </CardContent>
                <CardActions sx={{ py: 1, alignSelf: 'flex-end' }}>
                  <Link
                    href={`/projects/${projectId}`}
                    underline='none'
                    sx={{ flexGrow: { xs: 1 } }}
                  >
                    <Button endIcon={<ArrowRight fontSize='small' />} size='small'>{`시작`}</Button>
                  </Link>
                </CardActions>
              </Card>
            );
          })}
        </Container>
      </Box>
    </>
  );
}

ProjectsIndexPage.getLayout = (page: React.ReactNode) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
