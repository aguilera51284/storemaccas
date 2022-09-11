const withPreact = require('next-plugin-preact');
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
  swcMinify: true,
  reactStrictMode: true,
  experimental: {
    esmExternals: false
  },
  images: {
    domains: ['maccas.s3.us-east-2.amazonaws.com'],
  },
}

module.exports = withPreact(nextConfig)
