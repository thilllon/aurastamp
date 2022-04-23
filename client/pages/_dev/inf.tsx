import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { GetTaskListOutput } from '@/services/hooks';
import { useCustomSession } from '@/utils/next-auth-react-query';
import { Container, Divider } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from 'react-query';

interface InfinitePageProps {}

export default function InfinitePage({}: InfinitePageProps) {
  const router = useRouter();

  return (
    <Container>
      {/* <TrafficByDevice /> */}
      <Example />
    </Container>
  );
}

InfinitePage.getLayout = (page: React.ReactNode) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

function Example() {
  const router = useRouter();
  const { ref, inView } = useInView();
  const [session] = useCustomSession();
  // const jobId = router.query.jobId as string;
  const jobId = '3b5cc0f5-0864-4ad2-8184-51ad247d2620';
  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useInfiniteQuery(
    'tasksInfinite',
    async ({ pageParam = 0 }) => {
      const take = 20;
      const skip = pageParam * take;
      console.info(session);
      axios.defaults.headers.common.Authorization = session?.user.accessToken as string;
      if (!session) {
        throw new Error('no access token');
      }
      const res = await axios.get<GetTaskListOutput>(
        process.env.NEXT_PUBLIC_API_URI + `/jobs/${jobId}/tasks`,
        { params: { skip, take } }
      );
      return { ...res.data, previousPage: pageParam - 1, nextPage: pageParam + 1 };
    },
    {
      getPreviousPageParam: (firstPage, pages) => {
        return firstPage.previousPage ?? undefined;
      },
      getNextPageParam: (lastPage, pages) => {
        return lastPage.nextPage ?? undefined;
      },
      enabled: Boolean(jobId) && Boolean(session),
    }
  );

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return (
    <div>
      <h1>Infinite Loading</h1>

      {status === 'loading' ? (
        <p>Loading...</p>
      ) : status === 'error' ? (
        <span>{JSON.stringify(error)}</span>
      ) : (
        <>
          <div>
            <button
              onClick={() => fetchPreviousPage()}
              disabled={!hasPreviousPage || isFetchingPreviousPage}
            >
              {isFetchingPreviousPage
                ? 'Loading more...'
                : hasPreviousPage
                ? 'Load Older'
                : 'Nothing more to load'}
            </button>
          </div>

          {data?.pages.map((page, idx) => {
            return (
              <React.Fragment key={idx}>
                {page.tasks.map((task) => (
                  <p key={task.id}>{task.id}</p>
                ))}
                <Divider />
              </React.Fragment>
            );
          })}

          {/* {data.pages.map((page) => (
            <React.Fragment key={page.nextId}>
              {page.data.map((project) => (
                <p key={project.id}>{project.name}</p>
              ))}
            </React.Fragment>
          ))} */}

          <div>
            <button
              ref={ref}
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage
                ? 'Loading more...'
                : hasNextPage
                ? 'Load Newer'
                : 'Nothing more to load'}
            </button>
          </div>

          <div>{isFetching && !isFetchingNextPage ? 'Background Updating...' : null}</div>
        </>
      )}

      <hr />
    </div>
  );
}
