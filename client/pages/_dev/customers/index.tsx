import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { CustomerListResults, customers } from '@/components/customer/CustomerListResults';
import { CustomerListToolbar } from '@/components/customer/CustomerListToolbar';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';

export default function Customers() {
  return (
    <>
      <Head>
        <title>{`Customer | ${process.env.NEXT_PUBLIC_APP_TITLE}`}</title>
      </Head>
      <Box sx={{ flexGrow: 1, py: 8 }}>
        <Container>
          <CustomerListToolbar />
          <Box sx={{ mt: 3 }}>
            <CustomerListResults customers={customers} />
          </Box>
        </Container>
      </Box>
    </>
  );
}

Customers.getLayout = (page: React.ReactNode) => <DashboardLayout>{page}</DashboardLayout>;
