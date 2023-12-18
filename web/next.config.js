const isProduction = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    removeConsole: isProduction,
  },
  env: {},
  experimental: {
    webpackBuildWorker: true,
  },
  /**
   * to avoid rendering twice
   * https://stackoverflow.com/a/72186766/11091456
   */
  reactStrictMode: false,
  webpack: (config) => {
    if (config.name === 'server') {
      config.optimization.concatenateModules = false;
    }
    return config;
  },
};

module.exports = nextConfig;
