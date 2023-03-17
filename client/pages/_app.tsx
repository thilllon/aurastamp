import { MuiThemeProvider } from '@/contexts/MuiThemeContext';
import { createEmotionCache } from '@/styles/emotion';
import { useGoogleAnalytics } from '@/utils/useGoogleAnalytics';
import { EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { NextPage } from 'next';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React, { ReactElement, ReactNode } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPage & { getLayout?: (page: ReactElement) => ReactNode };
  pageProps: any;
}

const clientSideEmotionCache = createEmotionCache(); // client-side cache, shared for the whole session of the user in the browser.

const queryClient = new QueryClient({
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
});

const MyApp = ({
  Component,
  pageProps: { dehydratedState, ...pageProps },
  emotionCache = clientSideEmotionCache,
}: MyAppProps) => {
  useGoogleAnalytics();

  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={dehydratedState}>
        <CacheProvider value={emotionCache}>
          <MuiThemeProvider>
            <Head>
              <meta name='viewport' content='initial-scale=1, width=device-width' />
            </Head>
            <CssBaseline />
            {getLayout(<Component {...pageProps} />)}
          </MuiThemeProvider>
        </CacheProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </Hydrate>
    </QueryClientProvider>
  );
};

export default appWithTranslation(MyApp);
