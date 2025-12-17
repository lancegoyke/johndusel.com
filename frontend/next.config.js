/** @type {import('next').NextConfig} */
const { withSentryConfig } = require("@sentry/nextjs");

const nextConfig = {
  reactStrictMode: true,
  staticPageGenerationTimeout: 1000,
  output: "standalone",
  env: {
    SITE_TITLE: "John Dusel",
    SITE_DESCRIPTION:
      "Peak performance and injury prevention in professional sports",
    SITE_AUTHOR: "John Dusel",
    SITE_EMAIL: "john.dusel@gmail.com",
  },
  sentry: {
    hideSourceMaps: true,
  },
};

// Sentry webpack plugin options
const sentryWebpackPluginOptions = {
  // Suppress all Sentry CLI logs
  silent: true,
  // Skip source map upload (do this in CI instead)
  dryRun: process.env.SENTRY_DRY_RUN === "true",
};

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
