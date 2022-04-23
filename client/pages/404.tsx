import { FRNCC } from '@/utils/styles';
import { Container, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

interface NotFoundPageProps {}

export default function NotFoundPage({}: NotFoundPageProps) {
  const router = useRouter();

  return (
    <Container sx={{ ...FRNCC, height: '100vh', minHeight: '100vh', maxHeight: '100vh' }}>
      <Typography variant='h4'>{'Page Not Found'}</Typography>
    </Container>
  );
}
