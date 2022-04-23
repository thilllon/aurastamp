import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { SettingsPassword } from '@/components/settings/SettingsPassword';
import { Box, Container } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function ResetPasswordPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/');
  }, [router]);

  return (
    <>
      <Head>
        <title>Reset Password | Carillon AI</title>
      </Head>
      <Box sx={{ flexGrow: 1 }}>
        <Container>
          <SettingsPassword />
        </Container>
      </Box>
    </>
  );
}

ResetPasswordPage.getLayout = (page: React.ReactNode) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
