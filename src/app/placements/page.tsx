import React from 'react'
import type { Metadata } from "next";
import PlacementsPage from './PlacementsPage';

export const metadata: Metadata = {
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/placements`,
  },

  title: "Sri Maniya Institute - 100% Hotel Management Placement Support",
  description:
    "Sri Maniya Institute offers 100% hotel management placement support with internships, top hospitality recruiters, full-time job opportunities, and career guidance for all students.",
  keywords: [
    // Main keywords
    "Sri Maniya Institute placement",
    "hotel management placement",
    "hotel management course placement",
    // Secondary keywords
    "placement after hotel management",
    "hotel management job opportunities",
    "hotel management career opportunities",
    "hotel management internship",
    "top recruiters for hotel management students",
    "full time placements in hospitality",
    "100 % placement assistance hotel management",
    "Sri Maniya Institute career support",
    "career guidance in hospitality",
    "placement partners in hospitality industry"
  ],

    openGraph: {
    title: "Sri Maniya Institute - 100% Hotel Management Placement Support",
    description:
      "Join Sri Maniya Institute of Hotel Management – top hotel management college in Tamil Nadu.",
    url: "https://srimaniyainstitute.in/placements",
    siteName: "Sri Maniya Institute",
    images: [
      {
        url: "https://srimaniyainstitute.in/home/commitment-bg-1.webp",
        width: 1200,
        height: 630,
        alt: "Sri Maniya Institute of Hotel Management",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Sri Maniya Institute - 100% Hotel Management Placement Support",
    description:
      "Join Sri Maniya Institute of Hotel Management – top hotel management college in Tamil Nadu.",
    images: ["https://srimaniyainstitute.in/home/commitment-bg-1.webp"],
  },
};

const page = () => {
  return (
    <div>
      <PlacementsPage />
    </div>
  )
}

export default page
