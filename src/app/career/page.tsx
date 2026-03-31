import React from "react";
import type { Metadata } from "next";
import CareerPage from "./CareerPage";

export const metadata: Metadata = {
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/career`,
  },
  title: "Hospitality Careers in India & Abroad | Sri Maniya",
  description:
    "Start your teaching career at Sri Maniya Institute, Tamil Nadu, and mentor the next generation of hotel management professionals while advancing your own growth.",
  keywords: [
    // Main keywords
    "qualification required for hotel management",
    "hotel management study details",
    "hotel management process after 12th",
    "hotel management stream after 10th",
    "sri maniya institute of hotel management",
    "about hospitality management course",
    // Secondary keywords
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
      "Start your teaching career at Sri Maniya Institute, Tamil Nadu, and mentor the next generation of hotel management professionals while advancing your own growth.",
    url: "https://srimaniyainstitute.in/career",
    siteName: "Sri Maniya Institute",
    images: [
      {
        url: "https://srimaniyainstitute.in/career/career.webp",
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
      "Start your teaching career at Sri Maniya Institute, Tamil Nadu, and mentor the next generation of hotel management professionals while advancing your own growth.",
    images: ["https://srimaniyainstitute.in/career/career.webp"],
  },
};

const page = () => {

  const BASE_URL = "https://srimaniyainstitute.in";
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${BASE_URL}/career`,
      url: `${BASE_URL}/career`,
      "name": "Careers in Hospitality Industry in India & Abroad | Sri Maniya Institute",
      "description": "Start your teaching career at Sri Maniya Institute, and mentor the next generation of hotel management professionals while advancing your own growth.",
      "inLanguage": "en",
      "isPartOf": {
        "@type": "WebSite",
        "name": "Sri Maniya Institute of Hotel Management",
        url: BASE_URL,
      },
      "about": {
        "@type": "Thing",
        "name": "Hospitality Careers and Teaching Jobs"
      }
    },

    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "Sri Maniya Institute of Hotel Management",
      url: BASE_URL,
      logo: `${BASE_URL}/logos/navbarlogo.png`,
    },


    // ✅ Breadcrumb (IMPORTANT)
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
      <CareerPage />
    </div>
  );
};

export default page;
