import type { Metadata } from "next";
import CoursesPage from "./CoursesPage";
import { getAllCourses } from "@/services/courseService";
import Script from "next/script";
import { flattenHtml } from "@/utils/flattenHtml";
import BlogLinksSection from "@/components/common/BlogLinksSection";

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
      : "Hotel Management Courses – Diploma, B.Sc & MBA",

    description:
      "Diploma, B.Sc or MBA — which hotel management course is right for you? Compare fees, duration & internship details. Download the brochure!",

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
        : "Hotel Management Courses – Diploma, B.Sc & MBA",
      url: `${BASE_URL}/courses`,
      description:
        "Diploma, B.Sc or MBA — which hotel management course is right for you? Compare fees, duration & internship details. Download the brochure!",
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
      title: "Hotel Management Courses – Diploma, B.Sc & MBA",
      description:
        "Diploma, B.Sc or MBA — which hotel management course is right for you? Compare fees, duration & internship details. Download the brochure!",
      images: [`${BASE_URL}/courses/courses.webp`],
    },
  };
}

/* ---------------- PAGE ---------------- */
export default async function Page() {
  const result = await getAllCourses();
  const courses = (result?.data || []).map((course: any) => ({
    ...course,
    description: flattenHtml(course.description),
    opportunities: flattenHtml(course.opportunities),
    eligibility: flattenHtml(course.eligibility),
  }));

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
          url: course.slug
            ? `${BASE_URL}/courses/${course.slug}`
            : `${BASE_URL}/courses`,
        })),
      },

      // ✅ ADD COURSE SEPARATELY (IMPORTANT)
      ...courses.map((course: any, index: number) => ({
        "@type": "Course",
        "@id": `${BASE_URL}/courses#course-${course.id || index}`,
        name: course.title,
        description:
          course.description ||
          course.shortNote ||
          "Hotel management course",

        url: course.slug
          ? `${BASE_URL}/courses/${course.slug}`
          : `${BASE_URL}/courses`,

        provider: {
          "@type": "Organization",
          name: "Sri Maniya Institute of Hotel Management",
          sameAs: BASE_URL,
        },
      })),

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
      <Script
        id="course-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {/* <section className="sr-only">
        <h1>Hotel Management Courses in Tamil Nadu</h1>

        <p>
          Sri Maniya Institute offers professional hotel management courses in Tamil Nadu,
          including diploma, degree, and postgraduate programs. Our courses provide
          practical training, industry exposure, and strong placement opportunities.
        </p>

        <p>
          Students can join after 10th or 12th and gain skills in catering, hospitality,
          food production, and hotel operations with expert guidance.
        </p>
      </section> */}

      <CoursesPage courses={courses} />

      <BlogLinksSection
        title="Choosing the Right Hotel Management Course"
        intro="Compare diploma vs degree, admission steps, fees and career outcomes with these guides from Sri Maniya Institute."
        limit={6}
      />
    </>
  );
}