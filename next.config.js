/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: false,
  env: '.env',
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });
    return config;
  }
};

module.exports = config;
