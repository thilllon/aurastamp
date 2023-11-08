import { GetServerSideProps } from 'next';

export default function IndexPage() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async () => {
  return { props: {}, redirect: { destination: '/decode' } };
};
