import React from "react";
import AboutUsPage from "./AboutUsPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/about-us`,
  },

  title: "About Us | Top hotel management college in Tamil Nadu",
  description:
    "Sri Maniya Institute of Hotel Management provides hands-on training, paid internships, and career-focused programs to shape skilled hospitality professionals.",
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
      "Sri Maniya Institute of Hotel Management provides hands-on training, paid internships, and career-focused programs to shape skilled hospitality professionals.",
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
      "Sri Maniya Institute of Hotel Management provides hands-on training, paid internships, and career-focused programs to shape skilled hospitality professionals.",
    images: ["https://srimaniyainstitute.in/about-us/about-us.webp"],
  },
};

const page = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": "https://srimaniyainstitute.in/about-us#aboutpage",
    name: "About Sri Maniya Institute of Hotel Management",
    url: "https://srimaniyainstitute.in/about-us",
    description:
      "Learn about the legacy, vision, mission, leadership, and faculty of Sri Maniya Institute of Hotel Management in Kanyakumari, a leading hotel management college in Tamil Nadu.",
    mainEntity: {
      "@type": "EducationalOrganization",
      "@id": "https://srimaniyainstitute.in/#organization",
      name: "Sri Maniya Institute of Hotel Management",
      url: "https://srimaniyainstitute.in/",
      foundingDate: "1950",
      founder: {
        "@type": "Person",
        name: "Mr. Mani",
        description:
          "Founder whose journey began in 1950 and laid the foundation for a legacy in hospitality education.",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "No: 6/66-D1, Government Hospital Road",
        addressLocality: "Kanyakumari",
        addressRegion: "Tamil Nadu",
        postalCode: "629702",
        addressCountry: "IN",
      },
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
      <AboutUsPage />
    </>
  );
};

export default page;
