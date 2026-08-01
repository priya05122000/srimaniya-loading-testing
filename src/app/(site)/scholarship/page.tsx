import React from "react";
import ScholarShipPage from "./ScholarShipPage";
import { Metadata } from "next";


const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://srimaniyainstitute.in";

export const metadata: Metadata = {
  alternates: {
    canonical: `${BASE_URL}/scholarship`,
  },

  title: "Hotel Management Scholarship Tamil Nadu",
  description:
    "Worried about fees? Sri Maniya has awarded ₹51 lakh in hotel management scholarships so far. Check if you qualify — apply today!",
  keywords: [
    // Main keywords
    "scholarship in hospitality management",
    "hotel management scholarship",
    "hotel management scholarship in tamilnadu",
    "sri maniya institute scholarship",
    // Secondary keywords
    "scholarship program for hotel management students",
    "merit based scholarship sri maniya institute",
    "hotel management college scholarship tamil nadu",
    "sports quota scholarship hotel management",
    "scholarship for diploma degree students",
    "Sri Maniya College scholarship eligibility",
    "hotel management scholarship eligibility",
  ],

  openGraph: {
    title: "Hotel Management Scholarship Tamil Nadu",
    description:
      "Worried about fees? Sri Maniya has awarded ₹51 lakh in hotel management scholarships so far. Check if you qualify — apply today!",
    url: `${BASE_URL}/scholarship`,
    siteName: "Sri Maniya Institute",
    images: [
      {
        url: `${BASE_URL}/scholarship/scholarship.webp`,
        width: 1200,
        height: 630,
        alt: "Sri Maniya Institute of Hotel Management",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Hotel Management Scholarship Tamil Nadu",
    description:
      "Worried about fees? Sri Maniya has awarded ₹51 lakh in hotel management scholarships so far. Check if you qualify — apply today!",
    images: ["https://srimaniyainstitute.in/scholarship/scholarship.webp"],
  },
};

const page = () => {

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${BASE_URL}/scholarship#webpage`,
        url: `${BASE_URL}/scholarship`,
        name: "Hotel Management Scholarship TN",
        description:
          "Scholarships offered by Sri Maniya Institute for hotel management students in Tamil Nadu.",
      },

      {
        "@type": "EducationalOccupationalProgram",
        "@id": `${BASE_URL}/scholarship#program`,
        name: "Hotel Management Scholarship Program",
        description:
          "Scholarship program supporting students pursuing hotel management courses with financial assistance, merit-based awards, and special quotas.",
        provider: {
          "@type": "Organization",
          "@id": `${BASE_URL}/#organization`,
        },
      },

      {
        "@type": "BreadcrumbList",
        "@id": `${BASE_URL}/scholarship#breadcrumb`,
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
            name: "Scholarship",
            item: `${BASE_URL}/scholarship`,
          },
        ],
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
    <div>
      {/* ✅ JSON-LD SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      <ScholarShipPage />
    </div>
  );
};

export default page;
