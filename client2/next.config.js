// --------------------------------
// sentry
// --------------------------------
// This file sets a custom webpack configuration to use your Next.js app with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

// original template preview
// https://tokyo.bloomui.com/extended-sidebar/dashboards

const { withSentryConfig } = require('@sentry/nextjs');
const { withAxiom } = require('next-axiom');
const withImages = require('next-images');
const makeWithTM = require('next-transpile-modules');
const yup = require('yup');

const isProduction = process.env.NODE_ENV === 'production';
const isRemote = !!process.env.VERCEL_ENV;

// essential environment variables
yup
  .object({
    NEXTAUTH_SECRET: yup.string().required(),
    SENTRY_AUTH_TOKEN: yup.string().required(),
    GITHUB_CLIENT_ID: yup.string().required(),
    GITHUB_CLIENT_SECRET: yup.string().required(),
    GITHUB_PROFILE_CLIENT_ID: yup.string().required(),
    GITHUB_PROFILE_SECRET: yup.string().required(),
    GITHUB_PROFILE_REDIRECT_URI: yup.string().required(),
    KAKAO_CLIENT_ID: yup.string().required(),
    KAKAO_JS_KEY: yup.string().required(),
    KAKAO_CLIENT_SECRET: yup.string().required(),
    NEXT_PUBLIC_API_URL: yup.string().required(),
    // NEXT_PUBLIC_AXIOM_INGEST_ENDPOINT: yup.string().required(),
  })
  .validateSync(
    {
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
      SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
      GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
      GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
      GITHUB_PROFILE_CLIENT_ID: process.env.GITHUB_PROFILE_CLIENT_ID,
      GITHUB_PROFILE_SECRET: process.env.GITHUB_PROFILE_SECRET,
      GITHUB_PROFILE_REDIRECT_URI: process.env.GITHUB_PROFILE_REDIRECT_URI,
      KAKAO_CLIENT_ID: process.env.KAKAO_CLIENT_ID,
      KAKAO_JS_KEY: process.env.KAKAO_JS_KEY,
      KAKAO_CLIENT_SECRET: process.env.KAKAO_CLIENT_SECRET,
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
      // NEXT_PUBLIC_AXIOM_INGEST_ENDPOINT: process.env.NEXT_PUBLIC_AXIOM_INGEST_ENDPOINT,
    },
    { strict: true }
  );

// calendar packages to be transpiled with Next.js
const withTranspileModules = makeWithTM([
  '@fullcalendar/react',
  '@fullcalendar/common',
  '@fullcalendar/daygrid',
  '@fullcalendar/timegrid',
  '@fullcalendar/list',
]);

/** @type {import('next').NextConfig} */
let config = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    // removeConsole: {
    //   exclude: isProduction ? ['error'] : ['log', 'info', 'error', 'warn'],
    // },
  },
  experimental: {
    externalDir: true,
    serverComponents: true,
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: '/static',
  },
  env: {
    // --------------------------------
    // public
    // --------------------------------
    NEXT_PUBLIC_APP_TITLE: 'Proved',
    NEXT_PUBLIC_VERSION_STRING: 'Beta',
    NEXT_PUBLIC_ORGANIZATION_NAME: 'Carillon',
    NEXT_PUBLIC_ORGANIZATION_URL: 'https://proved.work/',
    NEXT_PUBLIC_DEFAULT_LOCALE: 'en-US',
    NEXT_PUBLIC_BUILT_AT: process.env.BUILT_AT ?? Date.now(),
    // --------------------------------
    // sentry
    // --------------------------------
    SENTRY_DSN: 'https://4586676d177b44c8bb999807f2cca862@o992574.ingest.sentry.io/6484375',
    // --------------------------------
    // mixpanel
    // --------------------------------
    NEXT_PUBLIC_MIXPANEL_TOKEN: 'bfaf7d19036974ec8de0c080680ce666',
    NEXT_PUBLIC_CHANNELTALK_PLUGIN_KEY: '50014375-6778-48d5-b862-e03e276eb612',
    // NEXT_PUBLIC_HOTJAR_ID: ,
    // --------------------------------
    // google analytics
    // --------------------------------
    NEXT_PUBLIC_GA_MEASUREMENT_ID: 'G-3T5SZBB0XM',
    NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION: 'reqElLQSzX1Yf84HkO5PnMc4Yae2a-dgw4jxz6QxIW0',
    // --------------------------------
    // kakao js sdk app key
    // --------------------------------
    NEXT_PUBLIC_KAKAO_JS_KEY: process.env.KAKAO_JS_KEY,
    // --------------------------------
    // github profile link
    // --------------------------------
    NEXT_PUBLIC_GITHUB_PROFILE_CLIENT_ID: process.env.GITHUB_PROFILE_CLIENT_ID,
    NEXT_PUBLIC_GITHUB_PROFILE_REDIRECT_URI: process.env.GITHUB_PROFILE_REDIRECT_URI,
  },
  images: {
    domains: [
      'static.proved.work',
      'provedapp.blob.core.windows.net',
      'via.placeholder.com',
      'images.unsplash.com',
      'source.unsplash.com',
      'ipfs.io',
      'loremflickr.com',
    ],
  },
  i18n: {
    // 이 설정은 tokyo template에 처음부터 있던 설정. tokyo template은 next-i18next을 사용하고 있음. 기존에 다른 프로젝트에서 i18n을 적용했을때에는 next-i18next.config.js로 설정 파일을 반드시 분리해야했었는데 그렇지 않아도 동작이 되는건지 확인이 필요함. 확인되면 이 코멘트 삭제할 것.
    defaultLocale: 'en',
    locales: ['en'],
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/apii/:path*',
  //       destination: `http://localhost:4444/:path*`,
  //     },
  //   ];
  // },
};

const sentryOptions = {
  // Additional config options for the [Sentry Webpack plugin]. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
  silent: true, // Suppresses all logs
};

config = withTranspileModules(config);
config = withImages(config);
// moduleExports = withAxiom(moduleExports);
// IMPORTANT: Make sure adding Sentry options is the last code to run before exporting, to ensure that your source maps include changes from all other Webpack plugins
config = isRemote ? withSentryConfig(config, sentryOptions) : config;

module.exports = config;
