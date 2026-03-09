import type { Metadata } from "next";
import { headers } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const url = headersList.get("x-url") || "";
  const urlObj = url
    ? new URL(url, `${process.env.NEXT_PUBLIC_BASE_URL}`)
    : null;
  const courseParam = urlObj?.searchParams.get("course");
  const canonical = courseParam
    ? `${process.env.NEXT_PUBLIC_BASE_URL}/courses?course=${courseParam}`
    : `${process.env.NEXT_PUBLIC_BASE_URL}/courses`;
  return {
    alternates: {
      canonical,
    },
    title: "Apply Online Hotel Management Courses | Sri Maniya Institute",
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
      title: "Apply Online Hotel Management Courses | Sri Maniya Institute",
      description:
        "Explore Sri Maniya hospitality courses offering hands-on hotel management training, expert faculty guidance, and industry-ready skills for strong careers.",
      url: canonical,
      siteName: "Sri Maniya Institute",
      images: [
        {
          url: "https://srimaniyainstitute.in/courses/courses.webp",
          width: 1200,
          height: 630,
          alt: "Sri Maniya Institute of Hotel Management",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Apply Online Hotel Management Courses | Sri Maniya Institute",
      description:
        "Explore Sri Maniya hospitality courses offering hands-on hotel management training, expert faculty guidance, and industry-ready skills for strong careers.",
      images: ["https://srimaniyainstitute.in/courses/courses.webp"],
    },
  };
}

import CoursesPage from "./CoursesPage";

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Course",
        name: "Diploma in Catering and Hotel Administration",
        description:
          "A 3-year diploma in catering and hotel administration preparing students for hospitality careers.",
        provider: {
          "@type": "EducationalOrganization",
          name: "Sri Maniya Institute of Hotel Management",
          sameAs: "https://srimaniyainstitute.in/",
        },
      },
      {
        "@type": "Course",
        name: "Advanced Diploma in Hotel Management & Catering Science",
        description:
          "A 2-year advanced diploma program focusing on hotel management and catering science.",
        provider: {
          "@type": "EducationalOrganization",
          name: "Sri Maniya Institute of Hotel Management",
          sameAs: "https://srimaniyainstitute.in/",
        },
      },
      {
        "@type": "Course",
        name: "Diploma in Food Production",
        description:
          "A 1-year diploma designed to build practical skills in food production and culinary techniques.",
        provider: {
          "@type": "EducationalOrganization",
          name: "Sri Maniya Institute of Hotel Management",
          sameAs: "https://srimaniyainstitute.in/",
        },
      },
      {
        "@type": "Course",
        name: "Diploma in Catering and Hotel Administration + B.Sc. in Catering and Hotel Administration (Pathway)",
        description:
          "A 5-year integrated pathway combining diploma and B.Sc. in catering and hotel administration.",
        provider: {
          "@type": "EducationalOrganization",
          name: "Sri Maniya Institute of Hotel Management",
          sameAs: "https://srimaniyainstitute.in/",
        },
      },
      {
        "@type": "Course",
        name: "B.Sc. in Catering and Hotel Administration",
        description:
          "A 3-year bachelor’s degree in catering and hotel administration focusing on advanced hospitality education.",
        provider: {
          "@type": "EducationalOrganization",
          name: "Sri Maniya Institute of Hotel Management",
          sameAs: "https://srimaniyainstitute.in/",
        },
      },
      {
        "@type": "Course",
        name: "MBA in Hospitality Management",
        description:
          "A 2-year postgraduate program in hospitality management for advanced leadership and career growth.",
        provider: {
          "@type": "EducationalOrganization",
          name: "Sri Maniya Institute of Hotel Management",
          sameAs: "https://srimaniyainstitute.in/",
        },
      },
    ],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />
      <CoursesPage />
    </>
  );
}
