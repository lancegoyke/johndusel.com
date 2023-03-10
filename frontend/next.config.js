/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  staticPageGenerationTimeout: 1000,
  env: {
    SITE_TITLE: "John Dusel",
    SITE_DESCRIPTION:
      "Peak performance and injury prevention in professional sports",
  },
};

module.exports = nextConfig;
