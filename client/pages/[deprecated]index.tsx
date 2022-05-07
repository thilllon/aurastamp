import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Link } from '@/components/shared/Link';
import { Box, Button, Container, Typography } from '@mui/material';
import React, { ReactNode } from 'react';

type IndexPageProps = {};

export default function IndexPage({}: IndexPageProps) {
  return (
    <>
      <Container
        sx={{
          display: 'flex',
          flexFlow: 'column',
          justifyContent: 'center',
          minHeight: (theme) => `calc(100vh - ${Number(theme.mixins.toolbar.minHeight) + 8}px)`,
        }}
      >
        <Box sx={{ display: 'flex', flexFlow: 'column nowrap', gap: 2 }}>
          <Link href='/encode' sx={{ width: '100%' }}>
            <Button fullWidth sx={{ flex: 1, minHeight: 120 }} variant={'contained'}>
              <Typography variant='h4'>{`Embed`}</Typography>
            </Button>
          </Link>
          <Link href='/decode'>
            <Button fullWidth sx={{ flex: 1, minHeight: 120 }} variant={'contained'}>
              <Typography variant='h4'>{`Extract`}</Typography>
            </Button>
          </Link>
        </Box>
      </Container>
    </>
  );
}

IndexPage.getLayout = (page: ReactNode) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
