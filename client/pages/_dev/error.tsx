import { Button, Container, Divider, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
interface ErrorPageProps {}
export default function ErrorPage({}: ErrorPageProps) {
  const onClick = () => {
    throw new Error(
      '[Sentry Error Healthcheck] NEXT_PUBLIC_VERCEL_ENV: ' + process.env.NEXT_PUBLIC_VERCEL_ENV
    );
    // throw new Error();
  };
  return (
    <Container
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '20vh' }}
    >
      <Button onClick={onClick}>Throw Error</Button>
    </Container>
  );
}
