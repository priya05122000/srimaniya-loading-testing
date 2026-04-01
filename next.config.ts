import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 640, 768, 1024, 1280, 1440, 1600],
    imageSizes: [64, 96, 128, 256, 384],
    domains: ["api.srimaniyainstitute.in", "localhost", "127.0.0.1"],
  },

  compiler: {
    removeConsole: false,
  },

  experimental: {
    forceSwcTransforms: false,
  },

  async redirects() {
    return [
      {
        source: "/$",
        destination: "/",
        permanent: true,
      },
      {
        source: "/&",
        destination: "/",
        permanent: true,
      },
    ];
  },

  // ✅ ADD THIS BLOCK
  // async headers() {
  //   return [
  //     {
  //       source: "/(.*)",
  //       headers: [
  //         {
  //           key: "Content-Security-Policy",
  //           value: `
  //             default-src 'self';
  //             img-src 'self' data: https:;
  //             script-src 'self' 'unsafe-inline' 'unsafe-eval' https:;
  //             style-src 'self' 'unsafe-inline' https:;
  //             font-src 'self' data: https:;
  //             connect-src 'self' https:;
  //           `.replace(/\n/g, ""),
  //         },
  //       ],
  //     },
  //   ];
  // },
};

export default nextConfig;