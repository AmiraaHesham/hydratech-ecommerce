
/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
    // hostname:['http://localhost:8787/'],
    domains: ['localhost'],
  },
experimental: {
    swcMinify: true,
  },
};

export default nextConfig;
