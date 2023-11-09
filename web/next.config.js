/** @type {import('next').NextConfig} */
const nextConfig = {
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
