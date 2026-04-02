import type { Metadata } from "next";
import CoursesPage from "./CoursesPage";
import { getAllCourses } from "@/services/courseService";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://srimaniyainstitute.in";

// const slugToTitle = (slug?: string) => {
//   if (!slug) return null;
//   return slug
//     .replace(/-/g, " ")
//     .replace(/\band\b/g, "&")
//     .replace(/\b\w/g, (char) => char.toUpperCase());
// };

const formatTitle = (slug?: string) => {
  if (!slug) return null;

  const words = slug
    .replace(/-/g, " ")
    .replace(/\band\b/g, "&")
    .split(" ")
    .slice(0, 7); // 🔥 limit words (important)

  const formatted = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return formatted;
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}): Promise<Metadata> {
  const params = await searchParams;
  const courseParam = params.course;

  const slug =
    typeof courseParam === "string"
      ? courseParam
      : Array.isArray(courseParam)
        ? courseParam[0]
        : undefined;

  const readableTitle = formatTitle(slug);

  const isQueryPage = !!slug;


  // const canonical = slug
  //   ? `${BASE_URL}/courses?course=${slug}`
  //   : `${BASE_URL}/courses`;

  return {
    alternates: {
      canonical: "https://srimaniyainstitute.in/courses",
    },
    // 🔥 ADD THIS
    robots: {
      index: !isQueryPage,   // ❌ query pages → noindex
      follow: true,
    },
    title: readableTitle
      ? `${readableTitle} | Sri Maniya Institute`
      : "Hotel Management Courses | Sri Maniya Institute",
    description:
      "Explore Sri Maniya hospitality courses offering hands-on hotel management training, expert faculty guidance, and industry-ready skills for strong careers.",

    keywords: [
      // Main keywords
      "hotel management degree course fees",
      "hotel management course fees after 12th",
      "hotel management diploma course fees",
      "bsc hotel management fees",
      "hotel management course apply online",
      // Secondary keywords
      "hotel management degree course duration",
      "hotel management course 1 year fees",
      "hotel management course 2 years",
      "hospitality management fees",
      "bsc in catering science and hotel management",
      "sri maniya institute diploma courses",
      "Sri Maniya Institute MBA / PG courses",
      "Sri Maniya Institute admission",
    ],

    openGraph: {
      title: readableTitle
        ? `${readableTitle} Course | Sri Maniya Institute`
        : "Apply Online Hotel Management Courses | Sri Maniya Institute",
      url: "https://srimaniyainstitute.in/courses",
      description:
        "Explore Sri Maniya hospitality courses offering hands-on hotel management training, expert faculty guidance, and industry-ready skills for strong careers.",
      siteName: "Sri Maniya Institute",
      images: [
        {
          url: `${BASE_URL}/courses/courses.webp`,
          width: 1200,
          height: 630,
          alt: readableTitle || "Sri Maniya Courses",
        },
      ],
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: "Apply Online Hotel Management Courses | Sri Maniya Institute",
      description:
        "Explore Sri Maniya hospitality courses offering hands-on hotel management training, expert faculty guidance, and industry-ready skills for strong careers.",
      images: [`${BASE_URL}/courses/courses.webp`],
    },
  };
}

export default async function Page() {
  const result = await getAllCourses(); // ✅ SSR FETCH
  const courses = result?.data || [];

  return <CoursesPage courses={courses} />;
}