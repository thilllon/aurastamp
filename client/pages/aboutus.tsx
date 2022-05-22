import { GetServerSideProps } from 'next';
import React from 'react';

export default function AboutPage() {
  return <div></div>;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const url = `https://about.aurastamp.com`;
  return {
    props: {},
    redirect: {
      destination: url,
      // statusCode: 302,
      permanent: false,
    },
  };
};
