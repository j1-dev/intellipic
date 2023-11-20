/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')(
  // This is the default (also the `src` folder is supported out of the box)
  './i18n.ts'
);

const runtimeCaching = require('next-pwa/cache');
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  runtimeCaching
});

module.exports = withNextIntl(
  withPWA({
    trailingSlash: true,
    reactStrictMode: true,
    swcMinify: true,
    compress: true,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'photoshot.app',
          port: ''
        },
        {
          protocol: 'https',
          hostname: 'i.ibb.co',
          port: ''
        },
        {
          protocol: 'https',
          hostname: 'bit.ly',
          port: ''
        },
        {
          protocol: 'https',
          hostname: 'pbxt.replicate.delivery',
          port: ''
        },
        {
          protocol: 'https',
          hostname: 'replicate.delivery',
          port: ''
        }
      ]
    }
  })
);
