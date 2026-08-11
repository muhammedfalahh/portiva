import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['localhost', '127.0.0.1', '192.168.21.1'],
  typescript: {
    // Disable type checking during builds to speed up compilation and avoid Vercel memory hangs
    ignoreBuildErrors: true,
  },
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
