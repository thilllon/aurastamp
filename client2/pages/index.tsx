import { CatchPhrase } from '@/components/CatchPhrase';
import { HeadMetaTags } from '@/components/HeadMetaTags';
import Link from '@/components/Link';
import { SessionProps } from '@/lib/next-auth-react-query';
import { Box, Button, Typography } from '@mui/material';

export default function OverviewPage({ session }: SessionProps) {

  return (
    <>
      <HeadMetaTags
        title={'Proved | Test. Prove. Hire.'}
        description={'코딩 테스트, 프로그래머 채용, 개발자 채용'}
        keywords={'코딩 테스트, 프로그래머 채용, 개발자 채용'}
      />

      <Box
        sx={{
        }}
      >

        
      </Box>
    </>
  );
}
