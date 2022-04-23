import { Link } from '@/components/shared/Link';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

// route as modal
// as: what user sees
// href: what browser sees

export default function ModalPage() {
  const router = useRouter();

  return (
    <Box>
      <Container
        sx={{
          height: '100vh',
          overflow: 'auto',
          border: '2px solid',
          display: 'flex',
          flexFlow: 'column nowrap',
        }}
      >
        {Array(100)
          .fill(null)
          .map((_, idx) => (
            <Link
              href={`/_dev/modal/?idx=${idx}`}
              as={`/_dev/modal/${idx}`}
              key={idx}
              sx={{ mt: 1 }}
            >
              <Button variant='contained' sx={{ width: '10rem' }}>
                {`${idx}${idx}${idx}${idx}${idx}${idx}${idx}`}
              </Button>
            </Link>
          ))}
      </Container>

      <Dialog open={!!router.query.idx} onClose={() => router.back()}>
        <DialogTitle>
          <Typography>{router.query.idx}</Typography>
        </DialogTitle>
        <DialogContent>{`aaaaaaaaaaaaaaaaaaaaaaaaaa`}</DialogContent>
      </Dialog>

      {/* {router.query.idx && (
        <Dialog open={!!router.query.idx} onClose={() => router.back()}>
          <DialogTitle>
            <Typography>{router.query.idx}</Typography>
          </DialogTitle>
          <DialogContent>{`aaaaaaaaaaaaaaaaaaaaaaaaaa`}</DialogContent>
        </Dialog>
      )} */}
    </Box>
  );
}
