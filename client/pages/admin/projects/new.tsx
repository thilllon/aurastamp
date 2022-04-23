import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { GuidanceLink } from '@/components/project/GuidanceLink';
import { SettingNewProject } from '@/components/settings/SettingNewProject';
// import { SettingNewProjectFormik } from '@/components/settings/SettingNewProjectFormik';
import { CustomBreadcrumbs } from '@/components/shared/CustomBreadcrumbs';
import { useGetUsers, User } from '@/services/users';
import { useCustomSession } from '@/utils/next-auth-react-query';
import { Box, CircularProgress, Container, LinearProgress, Typography } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

interface NewProjectPageProps {}

export default function NewProjectPage({}: NewProjectPageProps) {
  const router = useRouter();
  // const [session] = useCustomSession({ required: true, roles: ['admin'] });
  const [session] = useCustomSession({});
  const getUsers = useGetUsers({}, { enabled: Boolean(session?.user), retry: false });
  const [managers, setManagers] = useState<User[]>([]);
  const [workers, setWorkers] = useState<User[]>([]);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (getUsers.data?.users) {
      // TODO: manager 권한 있는 유저로 필터링
      // const managers = getUsers.data.users.filter((user) => user.role === 'ADMIN');
      const managers = getUsers.data.users;
      setManagers(managers);
    }
  }, [getUsers.data?.users]);

  useEffect(() => {
    if (getUsers.data?.users) {
      const workers = getUsers.data.users;
      setWorkers(workers);
    }
  }, [getUsers.data?.users]);

  useEffect(() => {
    if (getUsers.data?.users) {
      setLoaded(true);
    }
  }, [getUsers.data?.users]);

  // const getOrganizations = useGetOrganizations();
  // FIXME: orgList API
  const orgList = [{ id: '1111-1111-111111111111-11111111', name: 'Qroad' }];

  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Admin', href: '/admin' },
    { label: 'Projects', href: '/admin/projects' },
  ];

  return (
    <>
      <Head>
        <title>{`New Project | ${process.env.NEXT_PUBLIC_APP_TITLE}`}</title>
      </Head>

      <Container maxWidth={false}>
        <Box>
          <CustomBreadcrumbs crumbs={crumbs} />
          <Box sx={{ height: 50, display: 'flex', alignItems: 'center' }}>
            <Typography variant='h5'>{'새 프로젝트'}</Typography>
          </Box>
          <GuidanceLink />
        </Box>

        <Box maxWidth='lg'>
          {loaded ? (
            <SettingNewProject
              organizationCandidates={orgList}
              managerCandidates={managers}
              workerCandidates={workers}
            />
          ) : (
            <Box>
              <LinearProgress />
            </Box>
          )}
        </Box>
      </Container>
    </>
  );
}

NewProjectPage.getLayout = (page: React.ReactNode) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
