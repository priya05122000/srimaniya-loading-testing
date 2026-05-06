import React from "react";
import TermsAndConditions from "./components/TermsAndConditions";
import type { Metadata } from "next";

const BASE_URL = "https://srimaniyainstitute.in";

export const metadata: Metadata = {
  alternates: {
    canonical: `${BASE_URL}/terms-and-conditions`,
  },

  title: "Terms and Conditions",

  description:
    "Read the terms and conditions for using Sri Maniya Institute of Hotel Management website and services.",

  openGraph: {
    title: "Terms and Conditions",
    description:
      "Official terms and conditions of Sri Maniya Institute of Hotel Management.",
    url: `${BASE_URL}/terms-and-conditions`,
    siteName: "Sri Maniya Institute",
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "Terms and Conditions",
    description:
      "Official terms and conditions of Sri Maniya Institute website.",
  },
};

const Page = () => {

  const schema = [
    // ✅ Main Page Schema
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${BASE_URL}/terms-and-conditions`,
      url: `${BASE_URL}/terms-and-conditions`,
      name: "Terms and Conditions | Sri Maniya Institute",
      description:
        "Terms and conditions for using the Sri Maniya Institute website and services.",
      inLanguage: "en",

      publisher: {
        "@type": "CollegeOrUniversity",
        name: "Sri Maniya Institute of Hotel Management",
        url: BASE_URL,
      },

      isPartOf: {
        "@type": "WebSite",
        url: BASE_URL,
      },
    },

    // ✅ Breadcrumb (IMPORTANT for detection)
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: BASE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Terms and Conditions",
          item: `${BASE_URL}/terms-and-conditions`,
        },
      ],
    },
  ];

  return (
    <>
      {/* ✅ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      {/* ✅ Page UI */}
      <TermsAndConditions />
    </>
  );
};

export default Page;