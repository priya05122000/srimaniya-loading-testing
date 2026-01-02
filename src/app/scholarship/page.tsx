import React from "react";
import ScholarShipPage from "./ScholarShipPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hotel Management Scholarship in Tamil Nadu – Sri Maniya Institute",
  description:
    "Get a hotel management scholarship in Tamil Nadu with Sri Maniya Institute. This scholarship in hospitality management helps students pursue quality education with financial assistance.",
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
    title: "Hotel Management Scholarship in Tamil Nadu – Sri Maniya Institute",
    description:
      "Get a hotel management scholarship in Tamil Nadu with Sri Maniya Institute. This scholarship in hospitality management helps students pursue quality education with financial assistance.",
    url: "https://srimaniyainstitute.in",
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
    title: "Hotel Management Scholarship in Tamil Nadu – Sri Maniya Institute",
    description:
      "Get a hotel management scholarship in Tamil Nadu with Sri Maniya Institute. This scholarship in hospitality management helps students pursue quality education with financial assistance.",
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
