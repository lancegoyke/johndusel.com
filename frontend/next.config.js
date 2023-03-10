/** @type {import('next').NextConfig} */
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig = {
  reactStrictMode: true,
  staticPageGenerationTimeout: 1000,
  env: {
    SITE_TITLE: "John Dusel",
    SITE_DESCRIPTION:
      "Peak performance and injury prevention in professional sports",
  },
};

export default withSentryConfig(nextConfig);
