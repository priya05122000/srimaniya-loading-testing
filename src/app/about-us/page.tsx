import React from "react";
import AboutUsPage from "./AboutUsPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Top hotel management college in Tamil Nadu",
  description:
    "Learn about hospitality careers and the wide range of career paths in the hospitality industry. Explore our courses, objectives, and salary insights at Srimaniya Institute, a top hotel management college in Tamil Nadu",
  keywords: [
    // Main keywords
    "institute of hotel management",
    "Top Hotel Management College",
    "hotel management institute in tamilnadu",
    "hospitality and management courses in tamilnadu",
    "best hotel management institute in Tamilnadu",
    // Secondary keywords
    "hotel management education",
    "hotel management course with placement",
    "hospitality and hotel management courses",
    "job opportunities after hotel management",
    "global hospitality careers",
    "practical training in hospitality",
    "hospitality management college tamil nadu",
    "Sri Maniya Institute About Us",
  ],

  openGraph: {
    title: "About Us | Top hotel management college in Tamil Nadu",
    description:
      "Learn about hospitality careers and the wide range of career paths in the hospitality industry. Explore our courses, objectives, and salary insights at Srimaniya Institute, a top hotel management college in Tamil Nadu",
    url: "https://srimaniyainstitute.in/about-us",
    siteName: "Sri Maniya Institute",
    images: [
      {
        url: "https://srimaniyainstitute.in/about-us/about-us.webp",
        width: 1200,
        height: 630,
        alt: "Sri Maniya Institute of Hotel Management",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "About Us | Top hotel management college in Tamil Nadu",
    description:
      "Learn about hospitality careers and the wide range of career paths in the hospitality industry. Explore our courses, objectives, and salary insights at Srimaniya Institute, a top hotel management college in Tamil Nadu",
    images: ["https://srimaniyainstitute.in/about-us/about-us.webp"],
  },
};

const page = () => {
  return (
    <div>
      <AboutUsPage />
    </div>
  );
};

export default page;
