import React from "react";
import PrivacyPolicy from "./components/PrivacyPolicy";

const Page = () => {
  const BASE_URL = "https://srimaniyainstitute.in";

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