import { createMDX } from "fumadocs-mdx/next";
import type { NextConfig } from "next";

const withMDX = createMDX();

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    '192.168.0.103'
  ],
  cacheComponents: true,
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
