import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "cloud.appwrite.io",
        port: "",
      },
      {
        protocol: undefined,
        hostname: "undefined",
        port: "",
      },
      {
        protocol: "https",
        hostname: "cdn.weatherapi.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "fra.cloud.appwrite.io",
        port: "",
      },
    ],
    unoptimized: false,
  },
};

export default nextConfig;
