import React from "react";
import type { Metadata } from "next";
import ContactPage from "./ContactPage";

export const metadata: Metadata = {
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/contact-us`,
  },

  title: "Contact Srimaniya Institute of Hotel Management in Tamil Nadu ",
  description:
    "Get in touch through Sri Maniya Institute contact page for admissions, course details, and support from our institute of hotel management team.",
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
      "Get in touch through Sri Maniya Institute contact page for admissions, course details, and support from our institute of hotel management team.",
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
      "Get in touch through Sri Maniya Institute contact page for admissions, course details, and support from our institute of hotel management team.",
    images: ["https://srimaniyainstitute.in/contact-us/contact.webp"],
  },
};

const page = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": "https://srimaniyainstitute.in/contact-us#contactpage",
    url: "https://srimaniyainstitute.in/contact-us",
    mainEntity: {
      "@type": "EducationalOrganization",
      "@id": "https://srimaniyainstitute.in/#organization",
    },
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />
      <ContactPage />
    </>
  );
};

export default page;
