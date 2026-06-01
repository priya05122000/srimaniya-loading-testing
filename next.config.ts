import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  images: {
    // Skip Next.js image optimization in dev — api.srimaniyainstitute.in resolves via NAT64
    // which Next.js blocks as a "private IP". Production has direct IPv4 and optimizes correctly.
    unoptimized: process.env.NODE_ENV === "development",
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 640, 768, 1024, 1280, 1440, 1600],
    imageSizes: [64, 96, 128, 256, 384],
    qualities: [100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.srimaniyainstitute.in",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        pathname: "/**",
      },
    ],
  },

  compiler: {
    removeConsole: { exclude: ["error"] },
  },

  experimental: {
    optimizePackageImports: ["swiper"],
    forceSwcTransforms: false,
    cssChunking: "strict",
  },

  async redirects() {
    return [

      {
        source: "/online-application-form",
        destination: "/registration-form",
        permanent: true,
      },
      {
        source: "/online-application-form/",
        destination: "/registration-form",
        permanent: true,
      },

      // Blog → Events blog
      {
        source: "/blog",
        destination: "/events-blog",
        permanent: true,
      },
      {
        source: "/blog/",
        destination: "/events-blog",
        permanent: true,
      },

      // {
      //   source: "/$",
      //   destination: "/",
      //   permanent: true,
      // },
      // {
      //   source: "/&",
      //   destination: "/",
      //   permanent: true,
      // },
    ];
  },

  // ✅ ADD THIS BLOCK
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
            default-src * 'unsafe-inline' 'unsafe-eval' data: blob:;
            script-src * 'unsafe-inline' 'unsafe-eval' data: blob:;
            style-src * 'unsafe-inline' data: blob:;
            img-src * data: blob:;
            font-src * data: blob:;
            connect-src * data: blob: ws: wss:;
            frame-ancestors *;
          `.replace(/\n/g, ""),
          },
        ],
      },
    ];
  },
};

export default nextConfig;