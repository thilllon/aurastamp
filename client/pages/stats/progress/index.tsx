import React, { ReactNode, useState, useEffect, useContext } from 'react';
import { css, SerializedStyles } from '@emotion/react';
import { Box, Typography, Container } from '@mui/material';
import { useRouter } from 'next/router';
import { Link } from '@/components/shared/Link';
import Image from 'next/image';
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { frncc } from '@/utils/styles';

interface IndexPageProps {}

export default function IndexPage({}: IndexPageProps) {
  const router = useRouter();

  return (
    <Container>
      <Typography variant='h4'>{'index(TBD)'}</Typography>
    </Container>
  );
}

// export const getServerSideProps: GetServerSideProps<IndexPageProps> = async ({ req, res }) => {
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

// export const getStaticProps: GetStaticProps<IndexPageProps> = async () => {
//   return { props: {} };
// };
