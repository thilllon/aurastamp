const yup = require('yup');
const isProduction = process.env.NODE_ENV === 'production';
const isRemote = !!process.env.VERCEL_ENV || !!process.env.NEXT_PUBLIC_VERCEL_ENV;

yup
  .object({
    NEXT_PUBLIC_API_URL: yup.string().required(),
  })
  .validateSync(
    {
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    },
    { strict: true }
  );

/** @type {import('next').NextConfig} */
let config = {
  reactStrictMode: true,
  swcMinify: true,
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
    NEXT_PUBLIC_HOTJAR_ID: 3098132,
    // local: {hjid:3098148,hjsv:6};
    // dev: {hjid:3098132,hjsv:6}
    // prod: {hjid:3098069,hjsv:6};
    // --------------------------------
    // google analytics
    // --------------------------------
    NEXT_PUBLIC_GA_MEASUREMENT_ID: 'G-3T5SZBB0XM',
    NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION: 'CR2YzLNJiygJMN0YUfHSgH6Bv56u7OO-AVAOzbkg7vA', // https://search.google.com/search-console
    NEXT_PUBLIC_KAKAO_JS_KEY: '6d8f9f6e0cb79e46574f673730a226a7',
  },
};

module.exports = config;
