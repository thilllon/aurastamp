/* eslint-disable @next/next/google-font-display */
import createEmotionCache from '@/createEmotionCache';
import createEmotionServer from '@emotion/server/create-instance';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link rel='preconnect' href='https://fonts.gstatic.com' />
          {/* https://nextjs.org/docs/messages/google-font-display */}

          <link
            href='https://fonts.googleapis.com/css2?family=Inter:wght@300;500;700;900&display=block'
            rel='stylesheet'
          />

          <link
            href='https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;500;700;900&display=block'
            rel='stylesheet'
          />

          {/* https://developers.google.com/search/docs/advanced/crawling/special-tags?hl=ko */}
          <meta name='google' content='notranslate' />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // console.error('host', ctx?.req?.headers?.host);
  // console.error('referer', ctx?.req?.headers?.referer);
  // console.error('url', ctx?.req?.url);

  if (ctx.req?.headers?.host?.includes?.('.vercel.app')) {
    ctx.res.writeHead(302, { Location: 'https://proved.work' + (ctx.req?.url ?? '') });
    ctx.res.end();
  }

  const originalRenderPage = ctx.renderPage;

  // You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) => (props) => <App emotionCache={cache} {...props} />,
    });

  const initialProps = await Document.getInitialProps(ctx);
  // This is important. It prevents emotion to render invalid HTML.
  // See https://github.com/mui-org/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...React.Children.toArray(initialProps.styles), ...emotionStyleTags],
  };
};
