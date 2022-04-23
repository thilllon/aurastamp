import { Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

export default function IdxPage() {
  const router = useRouter();

  return (
    <Typography variant='h1' sx={{ textAlign: 'center' }}>
      {router.query.idx}
    </Typography>
  );
}
