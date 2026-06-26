import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    authInterrupts: true,
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      {
        protocol: 'http',
        hostname: 'api.staging.fitcall.me',
      },
      {
        protocol: 'https',
        hostname: 'api.staging.fitcall.me',
      },
      {
        protocol: 'http',
        hostname: 'api.fitcall.me',
      },
      {
        protocol: 'https',
        hostname: 'api.fitcall.me',
      },
    ],
  },
};

export default nextConfig;
