
/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
    domains: [ '10.96.151.1'],
  },
experimental: {
    swcMinify: true,
  },
};

export default nextConfig;
