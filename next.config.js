/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
      },
    ],
  },

  webpack: (config) => {
    // Use memory cache instead of filesystem pack cache
    config.cache = {
      type: "memory",
    };

    return config;
  },
};

module.exports = nextConfig;
