import React, { useEffect, useState } from 'react';
import { Hydrate, QueryClient, QueryClientConfig, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
// import { createWebStoragePersistor } from 'react-query/createWebStoragePersistor-experimental';
// import {
//   persistQueryClient,
//   Persistor,
//   PersistedClient,
// } from 'react-query/persistQueryClient-experimental';

const queryClientOptions: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
      retry: false,
      staleTime: 10 * 1000, // 10 seconds
      cacheTime: 24 * 60 * 60 * 1000, // 24 hours
    },
  },
};

type ReactQueryClientProviderProps = {
  dehydratedState: unknown;
  children: React.ReactNode;
};

// TODO: queryClient 바깥으로 빼는것이 옳은가?
// https://react-query.tanstack.com/examples/load-more-infinite-scroll
// const queryClient = new QueryClient(queryClientOptions);

export const ReactQueryClientProvider = ({
  children,
  dehydratedState,
}: ReactQueryClientProviderProps) => {
  // TODO: queryClient 바깥으로 빼는것이 옳은가?
  // const [client] = useState(queryClient);
  // TODO: queryClient 바깥으로 빼는것이 옳은가?
  const [client] = useState(() => {
    const queryClient = new QueryClient(queryClientOptions);
    return queryClient;
  });

  // --------------------------------
  // TODO: persistor 설정
  // --------------------------------
  // useEffect(() => {
  //   // By storing QueryClient in localstorage, it uses the existing cache to speed up loading when the browser is reopened.
  //   const persistor = createWebStoragePersistor({ storage: window.localStorage });

  //   (async () => {
  //     const persistedClient: undefined | PersistedClient = await persistor.restoreClient();
  //   })();

  //   persistQueryClient({
  //     queryClient: client,
  //     persistor,
  //     maxAge: 24 * 60 * 60 * 1000, // default 24 hours
  //     buster: process.env.VERCEL_GIT_COMMIT_SHA ?? '',
  //     // dehydrateOptions: {},
  //     // hydrateOptions: {},
  //   });
  // }, [client]);

  return (
    <QueryClientProvider client={client}>
      <Hydrate state={dehydratedState}>{children}</Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

// --------------------------------
// --------------------------------

// import React, { useEffect, useState } from 'react';
// import { Hydrate, QueryClient, QueryClientConfig, QueryClientProvider } from 'react-query';
// import { createWebStoragePersistor } from 'react-query/createWebStoragePersistor-experimental';
// import { ReactQueryDevtools } from 'react-query/devtools';
// import { persistQueryClient, Persistor } from 'react-query/persistQueryClient-experimental';

// type ReactQueryClientProviderProps = {
//   dehydratedState: unknown;
//   children: React.ReactNode;
// };
// const queryClientOptions: QueryClientConfig = {
//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: true,
//       refetchOnMount: true,
//       refetchOnReconnect: true,
//       retry: true,
//       staleTime: 10 * 1000, // 10 seconds
//       cacheTime: 24 * 60 * 60 * 1000, // 24 hours
//     },
//   },
// };
// export const ReactQueryClientProvider = ({
//   children,
//   dehydratedState,
// }: ReactQueryClientProviderProps) => {
//   const [persistor, setPersistor] = useState<Persistor>();
//   useEffect(() => {
//     // By storing QueryClient in localstorage, it uses the existing cache to speed up loading when the browser is reopened.
//     const newper = createWebStoragePersistor({ storage: window.localStorage });
//     setPersistor(newper);
//   }, []);

//   const [queryClient] = useState(() => {
//     const client = new QueryClient(queryClientOptions);
//     // localstorage로 react query cache 저장. 브라우저 새로 켰을때 캐싱을 이용해서 빠른 로딩을 가능하게 함.
//     if (persistor) {
//       persistQueryClient({ queryClient: client, persistor });
//     }
//     return client;
//   });

//   return (
//     <QueryClientProvider client={queryClient}>
//       <Hydrate state={dehydratedState}>{children}</Hydrate>
//       <ReactQueryDevtools initialIsOpen={true} />
//     </QueryClientProvider>
//   );
// };
