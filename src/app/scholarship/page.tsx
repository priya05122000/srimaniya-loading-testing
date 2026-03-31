import React from "react";
import ScholarShipPage from "./ScholarShipPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/scholarship`,
  },

  title: "Hotel Management Scholarship Tamil Nadu | Sri Maniya",
  description:
    "Sri Maniya Institute of Hotel Management offers hotel management scholarship opportunities in Tamil Nadu, helping students pursue quality hospitality education.",
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
    title: "Hotel Management Scholarship Tamil Nadu | Sri Maniya",
    description:
      "Sri Maniya Institute of Hotel Management offers hotel management scholarship opportunities in Tamil Nadu, helping students pursue quality hospitality education.",
    url: "https://srimaniyainstitute.in/scholarship",
    siteName: "Sri Maniya Institute",
    images: [
      {
        url: "https://srimaniyainstitute.in/scholarship/scholarship.webp",
        width: 1200,
        height: 630,
        alt: "Sri Maniya Institute of Hotel Management",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Hotel Management Scholarship Tamil Nadu | Sri Maniya",
    description:
      "Sri Maniya Institute of Hotel Management offers hotel management scholarship opportunities in Tamil Nadu, helping students pursue quality hospitality education.",
    images: ["https://srimaniyainstitute.in/scholarship/scholarship.webp"],
  },
};

const page = () => {
  return (
    <div>
      <ScholarShipPage />
    </div>
  );
};

export default page;
