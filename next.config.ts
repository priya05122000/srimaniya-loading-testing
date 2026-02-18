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
      // Online application → registration
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

      // Blog article cleanup
      {
        source:
          "/events-blog-view/difference-between-hotel-management-and-hospitality-management-complete-guide-for-students",
        destination:
          "/events-blog-view/difference-between-hotel-management-and-hospitality-management",
        permanent: true,
      },

      // Courses query param → courses page
      {
        source: "/courses",
        has: [{ type: "query", key: "course" }],
        destination: "/courses",
        permanent: true,
      },

      // INVALID URL FIXES
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
};

export default nextConfig;
