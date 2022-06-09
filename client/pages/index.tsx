import { GetServerSideProps } from 'next';
import React from 'react';

interface IndexPageProps {}

export default function IndexPage({}: IndexPageProps) {
  return <div></div>;
}

export const getServerSideProps: GetServerSideProps<IndexPageProps> = async ({ req, res }) => {
  return {
    props: {},
    redirect: {
      destination: '/decode',
    },
  };
};
