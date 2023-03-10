/** @type {import('next').NextConfig} */
const { withSentryConfig } = require("@sentry/nextjs");

const nextConfig = {
  reactStrictMode: true,
  staticPageGenerationTimeout: 1000,
  env: {
    SITE_TITLE: "John Dusel",
    SITE_DESCRIPTION:
      "Peak performance and injury prevention in professional sports",
  },
};

module.exports = withSentryConfig(nextConfig);
