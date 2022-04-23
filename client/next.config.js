/* eslint-disable @typescript-eslint/no-var-requires */
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/
const { i18n } = require('./next-i18next.config');
const { withSentryConfig } = require('@sentry/nextjs');
const withImages = require('next-images');

const sentryDsn = 'https://3e72dc8d1ca947b0b2dd5a5de04136e1@o992574.ingest.sentry.io/6247885';
const isProduction = process.env.NODE_ENV === 'production';
const isLocal = typeof process.env.NEXT_PUBLIC_VERCEL_ENV === 'undefined';

const essentialEnvVars = [
  // ******************************
  // NEXTAUTH
  // ******************************
  'NEXTAUTH_URL',
  'NEXTAUTH_SECRET',
];

essentialEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error('Not Found: ' + envVar);
  }
});

/** @type {import('next').NextConfig} */
let nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  productionBrowserSourceMaps: true,
  compiler: {
    removeConsole: { exclude: isProduction ? [] : ['log', 'info', 'error'] },
  },
  publicRuntimeConfig: {
    //
  },
  env: {
    // https://vercel.com/docs/concepts/projects/environment-variables#system-environment-variables
    // ******************************
    // public
    // ******************************
    NEXT_PUBLIC_NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_APP_TITLE: 'Carillon AI',
    NEXT_PUBLIC_COMPANY_NAME: 'Carillon AI',
    NEXT_PUBLIC_DEFAULT_LOCALE: 'en',
    NEXT_PUBLIC_API_URI: isLocal
      ? 'https://api-dev.carillon.ai'
      : process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
      ? 'https://api.carillon.ai'
      : 'https://api-dev.carillon.ai',

    // ******************************
    // sentry
    // ******************************
    NEXT_PUBLIC_SENTRY_DSN: sentryDsn,
    SENTRY_DSN: sentryDsn,
    SENTRY_ENVIRONMENT: isLocal ? 'local' : process.env.NEXT_PUBLIC_VERCEL_ENV,
    // ******************************
    // middleware
    // ******************************
    MIDDLEWARE_ACCESS_KEY: process.env.VERCEL_GITHUB_COMMIT_SHA ?? 'carillon',
    // ******************************
    // google analytics
    // ******************************
    NEXT_PUBLIC_GA_TRACKING_ID: 'G-6HEC1VDSTV',
    NEXT_PUBLIC_GOOGLE_TAG_MANAGER: 'https://www.googletagmanager.com/ns.html?id=GTM-K7BC3T2',
  },
  images: {
    // deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // formats: ['image/webp', 'image/avif'],
    domains: [
      // https://via.placeholder.com/80x80
      // https://picsum.photos/200/300
      'via.placeholder.com',
      'images.unsplash.com',
      'source.unsplash.com',
      // 'a-platform.co.kr',
      // 'www.archdaily.com',
      // 'images.adsttc.com',
      // 's3.us-west-2.amazonaws.com',
      // 'yoap.kr',
      // 'image.legalengine.co.kr',
      // 'ipfs.io',
      // 'googlecontents.com',
      // 'windows.net',
    ],
  },
  i18n, // (중요) next-i18next.config.js로 설정 파일을 반드시 분리해야함
  sentry: {
    hideSourceMaps: true,
    widenClientFileUpload: true,
  },
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: !isProduction,
  },
  api: {
    // https://nextjs.org/docs/api-routes/api-middlewares#custom-config
    externalResolver: true,
    // bodyParser: {
    //   sizeLimit: '500kb',
    // },
  },
};

// NOTE: gif, png, svg 등 이용시 필요
// nextConfig = withImages(nextConfig);

// FIXME: next-pwa 사용시 windows 10에서 빌드 안되는 문제 발생. 해결방법 못찾음.
// const withPwa = require('next-pwa');
// nextConfig = withPwa(nextConfig);

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that the following options are set automatically, and overriding them is not recommended: release, url, org, project, authToken, configFile, stripPrefix, urlPrefix, include, ignore
  silent: true, // sentry CLI log during Next build
  // For all available options, see: https://github.com/getsentry/sentry-webpack-plugin#options.
};

// Make sure adding Sentry options is the last code to run before exporting, to ensure that your source maps include changes from all other Webpack plugins
module.exports = isLocal ? nextConfig : withSentryConfig(nextConfig, sentryWebpackPluginOptions);
// module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
