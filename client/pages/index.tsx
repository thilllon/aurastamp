import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { PhotoCamera } from '@mui/icons-material';
import { Box, Button, Container, IconButton, Input, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import getConfig from 'next/config';
import React, { ReactNode } from 'react';

const { publicRuntimeConfig } = getConfig();

type IndexPageProps = {};

export default function IndexPage({}: IndexPageProps) {
  const { data: session } = useSession();
  return (
    <Container maxWidth='sm'>
      <Box>
        <Typography>user: {JSON.stringify(session?.user ?? {})}</Typography>

        <label htmlFor='icon-button-file'>
          <Input inputProps={{ accept: 'image/*' }} id='icon-button-file' type='file' />
          <IconButton color='primary' aria-label='upload picture' component='span'>
            <PhotoCamera />
          </IconButton>
        </label>
      </Box>
    </Container>
  );
}

IndexPage.getLayout = (page: ReactNode) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
