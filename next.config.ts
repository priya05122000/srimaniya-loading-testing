import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  images: {
    unoptimized: true,
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
    optimizePackageImports: ["gsap", "swiper", "react-toastify"],
    forceSwcTransforms: false,
    cssChunking: true,
  },

  async redirects() {
    return [
      // Old image URLs → SEO-friendly names (keeps indexed images and shared links working)
      { source: "/about-us/about-us.webp", destination: "/about-us/hotel-management-students-culinary-competition-award-winners.webp", permanent: true },
      { source: "/about-us/mission.webp", destination: "/about-us/vision-and-mission-background.webp", permanent: true },
      { source: "/about-us/vision.webp", destination: "/about-us/vision-and-mission-background.webp", permanent: true },
      { source: "/about-us/ourstory-old.webp", destination: "/about-us/mr-mani-founder-sri-maniya-institute.webp", permanent: true },
      { source: "/about-us/profile.webp", destination: "/about-us/student-profile-placeholder.webp", permanent: true },
      { source: "/career/career.webp", destination: "/career/sri-maniya-institute-graduation-2024-faculty-and-students.webp", permanent: true },
      { source: "/career/careerform.webp", destination: "/career/hotel-job-interview-career-opportunity.webp", permanent: true },
      { source: "/contact-us/contact.webp", destination: "/contact-us/thiruvalluvar-statue-kanyakumari.webp", permanent: true },
      { source: "/contact-us/seashore.webp", destination: "/contact-us/seashore-and-co-logo.webp", permanent: true },
      { source: "/contact-us/gtholidays.webp", destination: "/contact-us/gt-holidays-logo.webp", permanent: true },
      { source: "/contact-us/follicle.webp", destination: "/contact-us/follicle-logo.webp", permanent: true },
      { source: "/courses/courses.webp", destination: "/courses/culinary-student-butter-sculpture-competition.webp", permanent: true },
      { source: "/home/commitment-bg-1.webp", destination: "/home/chef-with-hotel-management-interns-in-kitchen.webp", permanent: true },
      { source: "/home/commitment-bg-2.webp", destination: "/home/hotel-front-office-reception-staff-with-guest.webp", permanent: true },
      { source: "/home/commitment-bg-3.webp", destination: "/home/hotel-management-classroom-training.webp", permanent: true },
      { source: "/home/commitment-bg-4.webp", destination: "/home/hotel-housekeeping-towel-art-training.webp", permanent: true },
      { source: "/home/enquireform.webp", destination: "/home/students-at-sri-maniya-institute-campus-kanyakumari.webp", permanent: true },
      { source: "/home/map.webp", destination: "/home/hotel-management-placements-world-map.webp", permanent: true },
      { source: "/map/India.webp", destination: "/map/india-flag-placements.webp", permanent: true },
      { source: "/map/Singapore.webp", destination: "/map/singapore-flag-placements.webp", permanent: true },
      { source: "/map/dubai.webp", destination: "/map/dubai-uae-flag-placements.webp", permanent: true },
      { source: "/map/mauritius.webp", destination: "/map/mauritius-flag-placements.webp", permanent: true },
      { source: "/map/maldives.webp", destination: "/map/maldives-flag-placements.webp", permanent: true },
      { source: "/scholarship/scholarship.webp", destination: "/scholarship/hotel-management-scholarship-award-ceremony.webp", permanent: true },
      { source: "/scholarship/scholarship-banner.webp", destination: "/scholarship/hotel-management-graduates-convocation.webp", permanent: true },
      { source: "/scholarship/scholarform.webp", destination: "/scholarship/hotel-management-students-studying-in-classroom.webp", permanent: true },
      { source: "/videos/reelvideo-poster.webp", destination: "/videos/culinary-students-cooking-in-training-kitchen.webp", permanent: true },
      { source: "/logos/navbarlogo.png", destination: "/logos/sri-maniya-institute-header-logo.png", permanent: true },
      { source: "/logos/footerlogo.png", destination: "/logos/sri-maniya-institute-footer-logo.png", permanent: true },

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
    ];
  },
};

export default nextConfig;