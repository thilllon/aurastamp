import { Container, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

interface DashboardIndexPageProps {}

export default function DashboardIndexPage({}: DashboardIndexPageProps) {
  const router = useRouter();

  return (
    <Container>
      <Typography variant='h4'>{'index(TBD)'}</Typography>
    </Container>
  );
}

// export const getServerSideProps: GetServerSideProps<DashboardIndexPageProps> = async ({ req, res }) => {
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

// export const getStaticProps: GetStaticProps<DashboardIndexPageProps> = async () => {
//   return { props: {} };
// };
