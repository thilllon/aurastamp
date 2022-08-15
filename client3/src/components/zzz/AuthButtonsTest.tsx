import { Link } from '@/components/Link';
import { Box, Button } from '@mui/material';
import { signIn } from 'next-auth/react';
import { useQueryClient } from 'react-query';

export const AuthButtonsTest = () => {
  const queryClient = useQueryClient();

  return (
    <>
      <Button
        onClick={() => {
          queryClient.clear();
          signIn('kakao');
        }}
      >
        kakao
      </Button>
      <Button
        onClick={() => {
          queryClient.clear();
          signIn('github');
        }}
      >
        github
      </Button>

      <Box sx={{ display: 'flex', flexFlow: 'column' }}>
        <Link href={'/zzz/ss1'}>getSession</Link>
        <Link href={'/zzz/ss2'}>unstable_getServerSession</Link>
        <Link href={'/zzz/ss3'}>useSession</Link>
      </Box>
    </>
  );
};
