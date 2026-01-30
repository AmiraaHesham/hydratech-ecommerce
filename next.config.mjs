
/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
    domains: [ '10.196.86.1'],
  },
experimental: {
    swcMinify: true,
  },
};

export default nextConfig;
