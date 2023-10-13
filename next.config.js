/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')(
  // This is the default (also the `src` folder is supported out of the box)
  './i18n.ts'
);

module.exports = withNextIntl({
  trailingSlash: true,
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'photoshot.app',
      'i.ibb.co',
      'bit.ly',
      'pbxt.replicate.delivery',
      'replicate.delivery'
    ]
  }
});
