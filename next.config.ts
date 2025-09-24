import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",       // export as static files
  trailingSlash: true,    // ensures /about/ instead of /about
  images: {
    unoptimized: true,    // disable Next.js image optimization
  },
};

export default nextConfig;
