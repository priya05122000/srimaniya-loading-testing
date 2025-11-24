import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    qualities: [100],
    domains: [
      "api.srimaniyainstitute.in",
      "localhost",
      "127.0.0.1",
    ],
  },
};

export default nextConfig;
