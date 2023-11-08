const withImages = require('next-images');

/** @type {import('next').NextConfig} */
let nextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: true,
  },
  images: {
    domains: [
      'via.placeholder.com',
      'images.unsplash.com',
      'avatars.githubusercontent.com',
      'res.cloudinary.com',
    ],
  },
};

module.exports = withImages(nextConfig);
