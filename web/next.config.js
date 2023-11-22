/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    removeConsole: true,
  },
  experimental: {
    webpackBuildWorker: true,
  },
  webpack: (config) => {
    if (config.name === 'server') {
      config.optimization.concatenateModules = false;
    }
    return config;
  },
};

module.exports = nextConfig;
