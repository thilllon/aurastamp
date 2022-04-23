import Document, { Html, Head as DocumentHead, Main, NextScript } from 'next/document';
import React from 'react';
import createEmotionServer from '@emotion/server/create-instance';
import { createEmotionCache } from '@/styles/emotion';
import { GoogleAnalysisScript } from '@/utils/useGoogleAnalytics';

const DisableInternetExplorer = () => {
  const consoleMessage = `Please use Edge or Chrome browser.`;
  const literal = [
    `if (window.navigator.userAgent.match(/MSIE|Internet Explorer|Trident/i)) {`,
    `  window.location = "microsoft-edge:" + window.location.href;`,
    `  setTimeout(function() {`,
    `    console.log('${consoleMessage}');`,
    `    window.location.replace('https://go.microsoft.com/fwlink/?linkid=2135547');`,
    `  }, 100);`,
    `}`,
  ];
  const __html = literal.join('');
  return <script dangerouslySetInnerHTML={{ __html }} />;
};

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <DocumentHead>
          <link rel='manifest' href='/manifest.json' />
          <GoogleAnalysisScript />
          <DisableInternetExplorer />
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link rel='preconnect' href='https://fonts.gstatic.com' />
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700&display=swap'
          />
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css2?family=Roboto:wght@100;200;300;400;500;600;700;800;900&display=swap'
          />
        </DocumentHead>
        <body>
          <noscript>
            <iframe src={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER} style={{ display: 'none' }} />
          </noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage;

  // You can consider sharing the same emotion cache between all the SSR requests to speed up performance. However, be aware that it can have global side effects.
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      enhanceApp: (App: any) => {
        return (props) => <App emotionCache={cache} {...props} />;
      },
    });

  const initialProps = await Document.getInitialProps(ctx);

  // It is important that it prevents emotion to render invalid HTML.
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
