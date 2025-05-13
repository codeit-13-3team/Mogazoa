import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['cdn.gukjenews.com', 'example.com', 'cdn.pixabay.com'],
  },
  reactStrictMode: true,
};

export default nextConfig;
