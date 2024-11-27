/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  assetPrefix:
    process.env.NODE_ENV === "production"
      ? // ? "https://32pearlsfront.vercel.app/"
        // "http://localhost:3000"
        ""
      : "",
  compress: true,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "api.the32pearls.com",
        pathname: "/uploads/**", // Adjust the path pattern as needed
      },
    ],
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.splitChunks.cacheGroups.styles = {
        name: "styles",
        test: /\.(css|scss)$/,
        chunks: "all",
        enforce: true,
      };
    }

    return config;
  },
};

export default nextConfig;
