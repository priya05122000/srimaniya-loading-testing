import React from "react";
import PrivacyPolicy from "./components/PrivacyPolicy";
import type { Metadata } from "next";

const BASE_URL = "https://srimaniyainstitute.in";

export const metadata: Metadata = {
  alternates: {
    canonical: `${BASE_URL}/privacy-policy`,
  },

  title: "Privacy Policy - Sri Maniya Institute",

  description:
    "Read the privacy policy of Sri Maniya Institute of Hotel Management to understand how your personal information is collected, used, and protected.",

  keywords: [
    "privacy policy sri maniya institute",
    "srimaniya institute privacy",
    "hotel management institute privacy policy",
  ],

  openGraph: {
    title: "Privacy Policy - Sri Maniya Institute",
    description:
      "Official privacy policy of Sri Maniya Institute of Hotel Management.",
    url: `${BASE_URL}/privacy-policy`,
    siteName: "Sri Maniya Institute",
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "Privacy Policy - Sri Maniya Institute",
    description:
      "Official privacy policy of Sri Maniya Institute website.",
  },
};

const Page = () => {

  const schema = [
    // ✅ Your given WebPage schema
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${BASE_URL}/privacy-policy`,
      url: `${BASE_URL}/privacy-policy`,
      name: "Privacy Policy | Sri Maniya Institute of Hotel Management",
      description:
        "Privacy policy explaining how Sri Maniya Institute collects, uses, and protects personal information submitted through its website.",
      inLanguage: "en",

      publisher: {
        "@type": "CollegeOrUniversity",
        name: "Sri Maniya Institute of Hotel Management",
        url: BASE_URL,
      },

      isPartOf: {
        "@type": "WebSite",
        name: "Sri Maniya Institute",
        url: BASE_URL,
      },
    },

    // ✅ Breadcrumb (important for detection)
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
          name: "Privacy Policy",
          item: `${BASE_URL}/privacy-policy`,
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
      <PrivacyPolicy />
    </>
  );
};

export default Page;