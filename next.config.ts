import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  images: {
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
    ];
  },

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
      {
        source: "/_next/static/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/_next/image(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
        ],
      },
      {
        source: "/(.*\\.(?:webp|png|gif|svg|ico))",
        headers: [
          { key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" },
        ],
      },
      {
        source: "/(.*\\.(?:mp4|webm|ogg|vtt))",
        headers: [
          { key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" },
        ],
      },
      {
        source: "/(.*\\.pdf)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" },
        ],
      },
      {
        source: "/((?!_next|api|favicon\\.ico).*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, s-maxage=60, stale-while-revalidate=300" },
        ],
      },
    ];
  },
};

export default nextConfig;