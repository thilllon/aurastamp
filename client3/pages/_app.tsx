// eslint-disable-next-line no-restricted-imports
import { ChanneltalkScript } from '@/components/dynamicScripts/Channeltalk';
import { GoogleAnalyticsScript, useGoogleAnalytics } from '@/components/GoogleAnalytics';
import { SidebarProvider } from '@/contexts/SidebarContext';
import createEmotionCache from '@/createEmotionCache';
import { useHotjar } from '@/hooks/useHotjar';
import { useProgress } from '@/hooks/useProgress';
import useScrollTop from '@/hooks/useScrollTop';
import { CustomThemeProvider } from '@/theme/ThemeProvider';
import { intervalInSeconds } from '@/utils/constants';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import * as Sentry from '@sentry/nextjs';
import { NextPage } from 'next';
import { SessionProvider } from 'next-auth/react';
import { appWithTranslation } from 'next-i18next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { SnackbarProvider } from 'notistack';
import { ReactElement, ReactNode, useState } from 'react';
import { Hydrate, QueryClient, QueryClientConfig, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import '../src/styles/global.css';
import '../types/global.d.ts';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import { LocalizationProvider } from '@mui/te-pickers';
// import '../src/utils/chart';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPage & { getLayout?: (page: ReactElement) => ReactNode };
}

const queryConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchOnMount: true,
      // refetchIntervalInBackground: 30 * 60 * 1000,
      // retry: 10,
      // retryDelay: 500,
      onError: (err: any) => {
        Sentry.captureException(err);
        throw new Error(err);
      },
    },
    mutations: {
      onError: (err: any, variables, context) => {
        Sentry.captureException(err);
        throw new Error(err);
      },
    },
  },
};

const MyApp = ({ Component, emotionCache = clientSideEmotionCache, pageProps }: MyAppProps) => {
  const [queryClient] = useState(() => new QueryClient(queryConfig));
  useProgress();
  useScrollTop();
  useGoogleAnalytics();
  // useMixpanel();
  useHotjar();

  const getLayout = Component.getLayout ?? ((page) => page);

  // console.log('## _app');

  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
        <meta
          name='google-site-verification'
          content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION}
        />
      </Head>
      {/* <ProvedWork /> */}
      <GoogleAnalyticsScript />
      <ChanneltalkScript />
      {/* <MixpanelScript debug={true} /> */}

      <CacheProvider value={emotionCache}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <SessionProvider
              session={pageProps.session}
              refetchInterval={intervalInSeconds}
              refetchOnWindowFocus={true}
            >
              <SidebarProvider>
                <CustomThemeProvider>
                  {/* <LocalizationProvider dateAdapter={AdapterDateFns}> */}

                  <SnackbarProvider
                    maxSnack={3}
                    autoHideDuration={3000}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    dense={true}
                    preventDuplicate={true}
                  >
                    <CssBaseline />
                    {getLayout(<Component {...pageProps} />)}
                  </SnackbarProvider>

                  {/* </LocalizationProvider> */}
                </CustomThemeProvider>
              </SidebarProvider>
            </SessionProvider>
          </Hydrate>

          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </CacheProvider>
    </>
  );
};

export default appWithTranslation(MyApp);

// export { reportWebVitals } from 'next-axiom';
