import { GetServerSideProps } from 'next';

interface IndexPageProps {}

export default function IndexPage({}: IndexPageProps) {
  return <div></div>;
}

export const getServerSideProps: GetServerSideProps<IndexPageProps> = async ({ req, res }) => {
  return { props: {}, redirect: { destination: '/decode' } };
};
