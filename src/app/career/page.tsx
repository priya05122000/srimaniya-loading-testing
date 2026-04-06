import React from "react";
import type { Metadata } from "next";
import CareerPage from "./CareerPage";
import { getAllJobs } from "@/services/jobService";

const BASE_URL = "https://srimaniyainstitute.in";

export const metadata: Metadata = {
  alternates: {
    canonical: `${BASE_URL}/career`,
  },
  title: "Hospitality Careers in India & Abroad | Sri Maniya",
  description:
    "Start your teaching career at Sri Maniya Institute, Tamil Nadu, and mentor future hotel management professionals while growing your career.",
  keywords: [
    "qualification required for hotel management",
    "hotel management study details",
    "hotel management process after 12th",
    "hotel management stream after 10th",
    "sri maniya institute of hotel management",
    "about hospitality management course",
    "vocational training in hotel management",
    "hotel management degree course duration",
    "sri maniya institute placement",
    "Sri Maniya Institute college profile",
    "Sri Maniya Institute course details",
    "hotel management career options after 12th",
    "career in hospitality industry in india",
    "Sri Maniya Institute careers",
    "career opportunities in hotel management institutes",
    "Sri Maniya Institute career opportunities",
  ],
  openGraph: {
    title: "Hospitality Careers in India & Abroad | Sri Maniya",
    description:
      "Start your teaching career at Sri Maniya Institute, Tamil Nadu, and mentor future hotel management professionals while growing your career.",
    url: "https://srimaniyainstitute.in/career",
    siteName: "Sri Maniya Institute",
    images: [
      {
        url: `${BASE_URL}/career/career.webp`,
        width: 1200,
        height: 630,
        alt: "Sri Maniya Institute of Hotel Management",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hospitality Careers in India & Abroad | Sri Maniya",
    description:
      "Start your teaching career at Sri Maniya Institute, Tamil Nadu, and mentor future hotel management professionals while growing your career.",
    images: [`${BASE_URL}/career/career.webp`],
  },
};

const page = async () => {
  const BASE_URL = "https://srimaniyainstitute.in";

  // ✅ SSR DATA FETCH
  let jobs = [];
  try {
    const result = await getAllJobs();
    const data = result.data || [];
    jobs = data.filter((job: any) => job.is_active);
  } catch (error) {
    console.error("Error fetching jobs:", error);
  }

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${BASE_URL}/career`,
      name: "Careers at Sri Maniya Institute",
      url: `${BASE_URL}/career`,
      description:
        "Start your teaching career at Sri Maniya Institute, Tamil Nadu, and mentor future hotel management professionals while growing your career.",
      inLanguage: "en",
      isPartOf: {
        "@type": "WebSite",
        name: "Sri Maniya Institute of Hotel Management",
        url: BASE_URL,
      },
      about: {
        "@type": "Thing",
        name: "Hospitality Careers and Teaching Jobs",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "Sri Maniya Institute of Hotel Management",
      url: BASE_URL,
      logo: `${BASE_URL}/logos/navbarlogo.png`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: BASE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Career",
          item: `${BASE_URL}/career`,
        },
      ],
    },
  ];

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />
      {/* ✅ PASS DATA */}
      <CareerPage jobs={jobs} />
    </div>
  );
};

export default page;