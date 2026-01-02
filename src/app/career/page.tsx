import React from "react";
import type { Metadata } from "next";
import CareerPage from "./CareerPage";

export const metadata: Metadata = {
  title: "Career in Hospitality Industry in India & Abroad | Sri Maniya",
  description:
    "Sri Maniya Institute trains students for top hospitality careers in India and abroad, offering strong placement and hotel management growth opportunities.",
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
    title: "Career in Hospitality Industry in India & Abroad | Sri Maniya",
    description:
      "Sri Maniya Institute trains students for top hospitality careers in India and abroad, offering strong placement and hotel management growth opportunities.",
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
    title: "Career in Hospitality Industry in India & Abroad | Sri Maniya",
    description:
      "Sri Maniya Institute trains students for top hospitality careers in India and abroad, offering strong placement and hotel management growth opportunities.",
    images: ["https://srimaniyainstitute.in/career/career.webp"],
  },
};

const page = () => {
  return (
    <div>
      <CareerPage />
    </div>
  );
};

export default page;
