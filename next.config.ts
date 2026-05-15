import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // No special config needed for Next.js 16
  output: "standalone",
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
