import type { NextConfig } from "next";

import path from "path";

import fs from "fs";

const hasLocalModules = fs.existsSync(path.resolve(__dirname, "node_modules"));
const workspaceRoot = hasLocalModules ? __dirname : path.resolve(__dirname, "..");

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  ...(process.env.VERCEL
    ? {}
    : {
        turbopack: {
          root: workspaceRoot,
        },
      }),
};

export default nextConfig;
