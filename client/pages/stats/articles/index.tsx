import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { GuidanceLink } from '@/components/project/GuidanceLink';
import { Link } from '@/components/shared/Link';
import { Crumb, CustomBreadcrumbs } from '@/components/shared/CustomBreadcrumbs';
import { Article, useGetArticles, useGetProjects } from '@/services/hooks';
import { useCustomSession } from '@/utils/next-auth-react-query';
import { Box, Button, Card, CardActions, CardContent, Container, Typography } from '@mui/material';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React from 'react';

interface ArticlesPageProps {
  articles: Article[];
}

export default function ArticlesPage({ articles }: ArticlesPageProps) {
  console.info(articles);
  const [session] = useCustomSession();
  const getArticles = useGetArticles({
    from: new Date(),
    to: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    skip: 0,
    take: 999,
  });

  const crumbs: Crumb[] = [];

  return (
    <>
      <Head>
        <title>{`Stats | ${process.env.NEXT_PUBLIC_APP_TITLE}`}</title>
      </Head>

      <Container maxWidth={false}>
        <Box>
          <CustomBreadcrumbs crumbs={crumbs} />
          <Box sx={{ height: 50, display: 'flex', alignItems: 'center' }}>
            <Typography variant='h5'>{'Articles'}</Typography>
          </Box>
          <GuidanceLink />
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          {getArticles.data?.map((article, idx) => (
            <Box key={idx} sx={{ mt: 4 }}>
              <Typography>{article.press}</Typography>
              <Typography>{article.title}</Typography>
              <Typography>
                {new Date(article.publishedAt).toLocaleString('ko-KR', {
                  timeZone: 'Asia/Seoul',
                })}
              </Typography>
              <Link href={article.href}>
                <Typography component='span'>{article.href}</Typography>
              </Link>
            </Box>
          ))}
        </Box>
      </Container>
    </>
  );
}

ArticlesPage.getLayout = (page: React.ReactNode) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export const getServerSideProps: GetServerSideProps<ArticlesPageProps> = async ({ req, res }) => {
  const response = await axios.get('https://server-nest-rest.azurewebsites.net/articles', {
    params: {
      from: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
      to: new Date(),
      skip: 0,
      take: 999,
    },
  });

  return {
    props: {
      articles: response.data,
    },
  };
};
