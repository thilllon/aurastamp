import { MuiThemeProvider } from '@/contexts/MuiThemeContext';
import { createEmotionCache } from '@/styles/emotion';
import { useGoogleAnalytics } from '@/utils/useGoogleAnalytics';
import { EmotionCache } from '@emotion/cache';
import { CacheProvider as EmotionCacheProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { ReactQueryClientProvider } from 'contexts/ReactQueryContext';
import { NextPage } from 'next';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React, { ReactElement, ReactNode, useEffect } from 'react';
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPage & { getLayout?: (page: ReactElement) => ReactNode };
}
const clientSideEmotionCache = createEmotionCache(); // client-side cache, shared for the whole session of the user in the browser.
const MyApp = ({
  Component,
  pageProps: { session, dehydratedState, ...pageProps },
  emotionCache = clientSideEmotionCache,
}: MyAppProps) => {
  useGoogleAnalytics();

  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);
  return (
    <ReactQueryClientProvider dehydratedState={dehydratedState}>
      <EmotionCacheProvider value={emotionCache}>
        <Head>
          <meta name='viewport' content='initial-scale=1, width=device-width' />
        </Head>
        <MuiThemeProvider>
          <CssBaseline />
          {getLayout(<Component {...pageProps} />)}
        </MuiThemeProvider>
      </EmotionCacheProvider>
    </ReactQueryClientProvider>
  );
};
export default appWithTranslation(MyApp);
