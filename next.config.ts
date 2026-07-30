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
  async headers() {
    return [
      {
        // Deep links: the Apple App Site Association file is served
        // extension-less from public/.well-known, so force application/json.
        source: '/.well-known/apple-app-site-association',
        headers: [{ key: 'Content-Type', value: 'application/json' }],
      },
    ];
  },
};

export default nextConfig;
