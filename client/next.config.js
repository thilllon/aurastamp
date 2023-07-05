// https://nextjs.org/docs/api-reference/next.config.js/introduction
const { i18n } = require('./next-i18next.config');
const { withSentryConfig } = require('@sentry/nextjs');
const withImages = require('next-images');

const isProduction = process.env.NODE_ENV === 'production';

const sentryConfig = {
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/
  dsn: 'https://b24dc675d1984f0d9a139ec1635897f8@o1216080.ingest.sentry.io/6358027',
  env: process.env.NEXT_PUBLIC_VERCEL_ENV ?? 'local',
};

/** @type {import('next').NextConfig} */
let nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  compiler: {
    removeConsole: { exclude: isProduction ? [] : ['log', 'info', 'error'] },
  },
  env: {
    // https://vercel.com/docs/concepts/projects/environment-variables#system-environment-variables
    // --------------------------------
    // public
    // --------------------------------
    NEXT_PUBLIC_APP_TITLE: 'aurastamp',

    NEXT_PUBLIC_NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_DEFAULT_LOCALE: 'en',
    NEXT_PUBLIC_API_URI: 'https://api.aurastamp.com',
    NEXT_PUBLIC_ABOUTUS_URL:
      'https://able-eater-423.notion.site/aura-stamp-ae4a7568bf534d36a47a404c8aad28c4',
    // NEXT_PUBLIC_ABOUTUS_URL: 'https://about.aurastamp.com',
    // --------------------------------
    // sentry
    // --------------------------------
    NEXT_PUBLIC_SENTRY_DSN: sentryConfig.dsn,
    SENTRY_DSN: sentryConfig.dsn,
    NEXT_PUBLIC_SENTRY_ENV: sentryConfig.env,
    SENTRY_ENV: sentryConfig.env,
    // --------------------------------
    // google analytics
    // --------------------------------
    NEXT_PUBLIC_GA_TRACKING_ID: 'G-JQVMS5Z7S3',
    NEXT_PUBLIC_GOOGLE_TAG_MANAGER: 'https://www.googletagmanager.com/gtag/js?id=G-JQVMS5Z7S3',
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
      'avatars.githubusercontent.com',
      'res.cloudinary.com',
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
  // async rewrites() {
  //   // https://aurastamp.com/aboutus
  //   // https://thilllon.notion.site/test-fa1587e6fae74d5aa377f2553926e8bc
  //   return {
  //     // { "src": "/[^/.]{1,8}", "status": 302, "headers": { "Location": "/" } },
  //     // { "src": "/(.*)", "dest": "src/index.ts" }
  //     beforeFiles: [
  //       //
  //     ],
  //     fallback: [
  //       {
  //         source: '/aboutus',
  //         destination: 'https://thilllon.notion.site/test-fa1587e6fae74d5aa377f2553926e8bc',
  //         has: [{}],
  //       },
  //     ],
  //   };
  // },
};

// NOTE: gif, png, svg 등 이용시 필요

nextConfig = withImages(nextConfig);
// Make sure adding Sentry options is the last code to run before exporting, to ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(nextConfig, {
  silent: true,
});
module.exports = nextConfig;
