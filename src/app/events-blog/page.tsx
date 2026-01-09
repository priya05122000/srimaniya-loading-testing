import React from "react";
import type { Metadata } from "next";
import EventsBlogPage from "./EventsBlogPage";

export const metadata: Metadata = {
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/events-blog`,
  },

  title: "Hospitality Career Insights & Tips | Sri Maniya Blog",
  description:
    "Discover hotel management events and blogs from Sri Maniya Institute, sharing campus activities, industry insights, and student achievements.",
  keywords: [
    "Hospitality Career Insights",
    "diploma in hotel management",
    "diploma in catering and hotel management",
    "hotel management career options",
    "hotel management and catering technology course details",
    "hotel management career opportunities",
    "diploma in hotel management duration",
    "best hotel management colleges",
    "hotel management institute",
    "best hospitality management colleges",
  ],

  openGraph: {
    title: "Hospitality Career Insights & Tips | Sri Maniya Blog",
    description:
      "Discover hotel management events and blogs from Sri Maniya Institute, sharing campus activities, industry insights, and student achievements.",
    url: "https://srimaniyainstitute.in/events-blog",
    siteName: "Sri Maniya Institute",
    images: [
      {
        url: "https://srimaniyainstitute.in/scholarship/scholarship-banner.webp",
        width: 1200,
        height: 630,
        alt: "Sri Maniya Institute of Hotel Management",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Hospitality Career Insights & Tips | Sri Maniya Blog",
    description:
      "Discover hotel management events and blogs from Sri Maniya Institute, sharing campus activities, industry insights, and student achievements.",
    images: ["https://srimaniyainstitute.in/scholarship/scholarship-banner.webp"],
  },
};

const page = () => {
  return (
    <div>
      <EventsBlogPage />
    </div>
  );
};

export default page;
