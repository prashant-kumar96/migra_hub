/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds that have type errors.
    // This should not be used in most cases, but can be helpful for
    // temporarily bypassing type checking for a quick build.
    ignoreBuildErrors: true,
  },
  images: {
    domains: [],
    unoptimized: true,
  },
};

export default nextConfig;