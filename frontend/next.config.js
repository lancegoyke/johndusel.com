/** @type {import('next').NextConfig} */
const { withSentryConfig } = require("@sentry/nextjs/config");

const nextConfig = {
  reactStrictMode: true,
  staticPageGenerationTimeout: 1000,
  // Static HTML export — the Django CMS is only needed at build time.
  output: "export",
  // Required for `output: export` (no Next.js image-optimization server at runtime).
  images: { unoptimized: true },
  env: {
    SITE_TITLE: "John Dusel",
    SITE_DESCRIPTION:
      "Peak performance and injury prevention in professional sports",
    SITE_AUTHOR: "John Dusel",
    SITE_EMAIL: "john.dusel@gmail.com",
  },
};

// Sentry build options (@sentry/nextjs v8+ moved these out of nextConfig.sentry)
const sentryBuildOptions = {
  // Suppress all Sentry CLI logs
  silent: true,
  sourcemaps: {
    // Skip source map upload (do this in CI instead)
    disable: process.env.SENTRY_DRY_RUN === "true",
    // Replaces the old `hideSourceMaps: true`: don't ship .map files publicly
    deleteSourcemapsAfterUpload: true,
  },
};

module.exports = withSentryConfig(nextConfig, sentryBuildOptions);
