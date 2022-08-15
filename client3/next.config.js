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
  },
};

module.exports = config;
