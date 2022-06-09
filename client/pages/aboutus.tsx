import { GetServerSideProps } from 'next';
import React from 'react';

export default function AboutPage() {
  return <div></div>;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const url = `https://able-eater-423.notion.site/aura-stamp-ae4a7568bf534d36a47a404c8aad28c4`;
  // const url = `https://about.aurastamp.com`;
  return {
    props: {},
    redirect: {
      destination: url,
      permanent: true,
    },
  };
};
