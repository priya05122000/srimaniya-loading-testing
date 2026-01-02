import React from "react";
import type { Metadata } from "next";
import ContactPage from "./ContactPage";

export const metadata: Metadata = {
  title: "Contact Srimaniya Institute of Hotel Management in Tamil Nadu ",
  description:
    "Sri Maniya Institute Tamil Nadu is one of the best hotel management institutes near you. Explore courses, contact support, submit the enquiry form, and start your career in hospitality",
  keywords: [
    "sri maniya institute contact",
    "hotel management institute contact Tamil Nadu",
    "institute of hotel management near me",
    "hotel management colleges in near me",
    "Best hotel management courses near me",
    "Sri Maniya Institute Tamil Nadu",
    "Sri Maniya Institute contact number",
    "Sri Maniya Institute Nagercoil",
    "Sri Maniya Institute near me",
    "hotel management institute location details",
    "hospitality institute contact Tamil Nadu",
    "Sri Maniya Institute enquiry form",
  ],

  openGraph: {
    title: "Contact Srimaniya Institute of Hotel Management in Tamil Nadu",
    description:
      "Sri Maniya Institute Tamil Nadu is one of the best hotel management institutes near you. Explore courses, contact support, submit the enquiry form, and start your career in hospitality.",
    url: "https://srimaniyainstitute.in/contact-us",
    siteName: "Sri Maniya Institute",
    images: [
      {
        url: "https://srimaniyainstitute.in/contact-us/contact.webp",
        width: 1200,
        height: 630,
        alt: "Sri Maniya Institute of Hotel Management",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Contact Srimaniya Institute of Hotel Management in Tamil Nadu",
    description:
      "Sri Maniya Institute Tamil Nadu is one of the best hotel management institutes near you. Explore courses, contact support, submit the enquiry form, and start your career in hospitality",
    images: ["https://srimaniyainstitute.in/contact-us/contact.webp"],
  },
};

const page = () => {
  return (
    <div>
      <ContactPage />
    </div>
  );
};

export default page;
