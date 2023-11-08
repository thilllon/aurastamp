import { GetServerSideProps } from 'next';

export default function AboutPage() {
  return <div></div>;
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
    redirect: {
      destination: process.env.NEXT_PUBLIC_NOTION_MOBILE,
      permanent: true,
    },
  };
};
