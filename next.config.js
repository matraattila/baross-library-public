// Analyzer
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
// 	enabled: process.env.ANALYZE === 'true',
// })

module.exports = {
  reactStrictMode: true,

  // Enable the display of google images
  images: {
    domains: ['lh3.googleusercontent.com'],
  },

  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },

  experimental: {
    appDir: true,
  },
}
