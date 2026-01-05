import type { Metadata } from "next";
import { headers } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const url = headersList.get("x-url") || "";
  const urlObj = url ? new URL(url, `${process.env.NEXT_PUBLIC_BASE_URL}`) : null;
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
      "Apply online for hotel management courses at Sri Maniya Institute. Explore diploma, BSc catering science, MBA/PG programs, course duration, fees, and admission details",
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
        "Apply online for hotel management courses at Sri Maniya Institute. Explore diploma, BSc catering science, MBA/PG programs, course duration, fees, and admission details.",
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
        "Apply online for hotel management courses at Sri Maniya Institute. Explore diploma, BSc catering science, MBA/PG programs, course duration, fees, and admission details.",
      images: ["https://srimaniyainstitute.in/courses/courses.webp"],
    },
  };
}

import CoursesPage from "./CoursesPage";

export default function Page() {
  return <CoursesPage />;
}
