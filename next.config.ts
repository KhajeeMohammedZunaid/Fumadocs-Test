import { createMDX } from "fumadocs-mdx/next";
import type { NextConfig } from "next";

const withMDX = createMDX();

const nextConfig: NextConfig = {
  // REMOVED THE PORT NUMBER ':3000'
  allowedDevOrigins: [
    '192.168.0.114'
  ],
  /* config options here */
  experimental: {
    agentFeedback: true,
    
    optimizePackageImports: [
      "lucide-react",
      "@hugeicons/react",
      "fumadocs-ui",
      "fumadocs-core",
      "motion",
    ],
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default withMDX(nextConfig);
