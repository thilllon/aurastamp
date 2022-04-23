import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { SettingsPassword } from '@/components/settings/SettingsPassword';
import { Box, Container } from '@mui/material';
import Head from 'next/head';

export default function ChangePasswordPage() {
  return (
    <>
      <Head>
        <title>Change Password | Carillon AI</title>
      </Head>
      <Box sx={{ flexGrow: 1 }}>
        <Container>
          <SettingsPassword />
        </Container>
      </Box>
    </>
  );
}

ChangePasswordPage.getLayout = (page: React.ReactNode) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
