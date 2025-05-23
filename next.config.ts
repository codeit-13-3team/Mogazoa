import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['cdn.gukjenews.com', 'example.com', 'cdn.pixabay.com', 'sprint-fe-project.s3.ap-northeast-2.amazonaws.com'],
  },
  reactStrictMode: true,
};

export default nextConfig;
