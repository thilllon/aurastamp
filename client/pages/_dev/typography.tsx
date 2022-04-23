import { Container, Divider, Typography } from '@mui/material';
import React, { useEffect } from 'react';
interface TypographyPageProps {}
export default function TypographyPage({}: TypographyPageProps) {
  useEffect(() => {
    console.info('gitsha', process.env.VERCEL_GIT_COMMIT_SHA);
  }, []);

  return (
    <Container>
      <Typography variant='h1'>{'h1'}</Typography>
      <Typography variant='h2'>{'h2'}</Typography>
      <Typography variant='h3'>{'h3'}</Typography>
      <Typography variant='h4'>{'h4'}</Typography>
      <Typography variant='h5'>{'h5'}</Typography>
      <Typography variant='h6'>{'h6'}</Typography>
      <Typography variant='caption'>{'caption'}</Typography>
      <Typography variant='subtitle1'>{'subtitle1'}</Typography>
      <Typography variant='subtitle2'>{'subtitle2'}</Typography>
      <Typography variant='body1'>{'body1'}</Typography>
      <Typography variant='body2'>{'body2'}</Typography>
      <Typography variant='button'>{'button'}</Typography>
      <Typography>{'0123456789 abcdefghijklmnop ABCDEFGHIJKLMNOP'}</Typography>
      <Divider />
      <Divider />
      <Divider />
      <Divider />
    </Container>
  );
}
