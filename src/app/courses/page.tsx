import type { Metadata } from "next";
import CoursesPage from "./CoursesPage";
import { getAllCourses } from "@/services/courseService";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://srimaniyainstitute.in";

/* ---------------- FORMAT TITLE ---------------- */
const formatTitle = (slug?: string) => {
  if (!slug) return null;

  const words = slug
    .replace(/-/g, " ")
    .replace(/\band\b/g, "&")
    .split(" ")
    .slice(0, 7);

  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

/* ---------------- SEO METADATA ---------------- */
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

  return {
    alternates: {
      canonical: `${BASE_URL}/courses`,
    },

    title: readableTitle
      ? `${readableTitle} | Sri Maniya Institute`
      : "Hotel Management Courses | Sri Maniya Institute",

    description:
      "Explore Sri Maniya hospitality courses offering hands-on hotel management training, expert faculty guidance, and industry-ready skills for strong careers.",

    keywords: [
      "hotel management degree course fees",
      "hotel management course fees after 12th",
      "hotel management diploma course fees",
      "bsc hotel management fees",
      "hotel management course apply online",
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
      url: `${BASE_URL}/courses`,
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

/* ---------------- PAGE ---------------- */
export default async function Page() {
  const result = await getAllCourses();
  const courses = result?.data || [];

  /* ---------------- DYNAMIC SCHEMA ---------------- */
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemList",
        "@id": `${BASE_URL}/courses#list`,
        name: "Hotel Management Courses",
        url: `${BASE_URL}/courses`,

        itemListElement: courses.map((course: any, index: number) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Course",
            "@id": `${BASE_URL}/courses#${course.id || index}`,
            name: course.title,
            description:
              course.description ||
              course.shortNote ||
              "Hotel management course",

            ...(course.slug && {
              url: `${BASE_URL}/courses/${course.slug}`,
            }),

            provider: {
              "@type": "EducationalOrganization",
              "@id": `${BASE_URL}/#organization`,
              name: "Sri Maniya Institute of Hotel Management",
              sameAs: BASE_URL,
            },
          },
        })),
      },

      {
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        name: "Sri Maniya Institute of Hotel Management",
        url: BASE_URL,
      },
    ],
  };

  return (
    <>
      {/* ✅ JSON-LD SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      <CoursesPage courses={courses} />
    </>
  );
}