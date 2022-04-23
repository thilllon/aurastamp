import { useGetDeployments } from '@/services/admin-services';
import { Container, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import React, { ReactNode, useContext, useEffect, useState } from 'react';

interface VercelPageProps {}

export default function VercelPage({}: VercelPageProps) {
  const router = useRouter();
  const [vercelToken, setVercelToken] = useState('');
  const [projectId, setProjectId] = useState('prj_S58RP9ITu1E6q0qNArAxZkjGn0pi');
  const [teamId, setTeamId] = useState('team_tNWJZOsCJ1vTtpF5Mj59gV5u');
  const [state, setState] = useState(); // 'ERROR', 'CANCELED', 'READY', ...
  const getDeployments = useGetDeployments(
    { teamId, state, projectId, vercelToken },
    { enabled: Boolean(vercelToken) }
  );

  console.info(getDeployments.data);

  const onChange = (ev: any) => {
    //
  };
  const onSubmit = (ev: any) => {
    //
  };

  return (
    <Container>
      <Typography variant='h4'>{'vercel'}</Typography>

      <Box component='form' onSubmit={onSubmit}>
        <TextField name='projectId' />
        <TextField name='teamId' />
        <TextField name='vercelToken' />
        <TextField name='state' />
      </Box>

      {getDeployments.data?.deployments.map((deployment, idx) => {
        return (
          <Box key={idx}>
            <Typography>{deployment.uid}</Typography>
          </Box>
        );
      })}
    </Container>
  );
}

// export const getServerSideProps: GetServerSideProps<VercelPageProps> = async ({ req, res }) => {
//  return { props: {} };
// };

// type Paths = (
//   | string
//   | {
//       params: ParsedUrlQuery;
//       locale?: string | undefined;
//     }
// )[];

// export const getStaticPaths: GetStaticPaths = async () => {
//   const paths: Paths = [];
//   return { paths, fallback: false };
// };

// export const getStaticProps: GetStaticProps<VercelPageProps> = async () => {
//   return { props: {} };
// };
