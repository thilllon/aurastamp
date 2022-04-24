import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Crumb, CustomBreadcrumbs } from '@/components/shared/CustomBreadcrumbs';
import { Link } from '@/components/shared/Link';
import { useCustomSession } from '@/utils/next-auth-react-query';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
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
        {/* <Container maxWidth={false}> */}
        <Typography>user: {JSON.stringify(session?.user ?? {})}</Typography>
        <Box>
          <Box sx={{ height: 50, display: 'flex', alignItems: 'center' }}>
            <Typography variant='h5'>{'홈'}</Typography>
          </Box>
        </Box>
        {/* </Container> */}
        <Button
          onClick={() => {
            throw new Error('sentry error');
          }}
        >
          error test
        </Button>
        <Button
          onClick={() => {
            throw new Error('sentry error2');
          }}
        >
          error test
        </Button>
      </Box>
    </Container>
  );
}

IndexPage.getLayout = (page: ReactNode) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
