
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['192.168.1.5'],
  },
  experimental: {
    swcMinify: true,
  },
};

export default nextConfig;