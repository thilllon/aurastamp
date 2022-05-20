import { Cropper } from '@/components/Cropper';
import { Link } from '@/components/shared/Link';
import { Container } from '@mui/material';
import React from 'react';

export default function TmpPage() {
  return (
    <div>
      <Link href='/'>home</Link>
      <Container maxWidth='sm' sx={{ mt: 10, border: '2px solid' }}>
        <Cropper guideMessage='Pick an image to stamp' defaultAspect={1} />
      </Container>
    </div>
  );
}
