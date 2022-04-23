import { CommandPalette } from '@/components/shared/CommandPalette';
import { Container, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

interface IndexPageProps {}

export default function IndexPage({}: IndexPageProps) {
  const router = useRouter();

  return (
    <Container>
      <Typography variant='h4'>{`commit: ${process.env.VERCEL_GITHUB_COMMIT_SHA}`}</Typography>
      <CommandPalette />
    </Container>
  );
}
