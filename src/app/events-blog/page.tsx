import React from "react";
import type { Metadata } from "next";
import EventsBlogPage from "./EventsBlogPage";

export const metadata: Metadata = {
  title: "Hospitality Career Insights & Tips | Sri Maniya Blog",
  description:
    "Get the best hospitality career insights, hotel management tips, and guidance from Sri Maniya Institute Blog. Learn trends, training advice, and industry skills to build your future.",
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
      "Get the best hospitality career insights, hotel management tips, and guidance from Sri Maniya Institute Blog. Learn trends, training advice, and industry skills to build your future.",
    url: "https://srimaniyainstitute.in/scholarship",
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
      "Get the best hospitality career insights, hotel management tips, and guidance from Sri Maniya Institute Blog. Learn trends, training advice, and industry skills to build your future.",
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
