import React from "react";
import type { Metadata } from "next";
import ContactPage from "./ContactPage";
import { getAllSiteInfo } from "@/services/siteInfoService";
import { SiteInfo } from "@/types";

export const metadata: Metadata = {
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/contact-us`,
  },

  title: "Hotel Management Institute Near Me | Tamil Nadu",
  description:
    "Have questions about admissions or courses? Reach Sri Maniya Institute in Kanyakumari — we're just a call away. Contact us today!",
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
    title: "Hotel Management Institute Near Me | Tamil Nadu",
    description:
      "Have questions about admissions or courses? Reach Sri Maniya Institute in Kanyakumari — we're just a call away. Contact us today!",
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
    title: "Hotel Management Institute Near Me | Tamil Nadu",
    description:
      "Have questions about admissions or courses? Reach Sri Maniya Institute in Kanyakumari — we're just a call away. Contact us today!",
    images: ["https://srimaniyainstitute.in/contact-us/contact.webp"],
  },
};

const page = async () => {
  const BASE_URL = "https://srimaniyainstitute.in";

  let siteInfo: SiteInfo | null = null;
  try {
    const result = await getAllSiteInfo();
    const data = result?.data;
    if (Array.isArray(data) && data.length > 0) siteInfo = data[0];
  } catch (error) {
    console.error("Error fetching site info:", error);
  }

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "@id": `${BASE_URL}/contact-us#contactpage`,
      url: `${BASE_URL}/contact-us`,
      name: "Contact Sri Maniya Institute",
      description:
        "Contact Sri Maniya Institute of Hotel Management for admissions, course details, and support.",
      mainEntity: {
        "@type": "EducationalOrganization",
        "@id": `${BASE_URL}/#organization`,
        name: "Sri Maniya Institute of Hotel Management",
        url: BASE_URL,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          availableLanguage: ["English", "Tamil"],
        },
      },
    },

    // ✅ Breadcrumb (IMPORTANT)
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
          name: "Contact Us",
          item: `${BASE_URL}/contact-us`,
        },
      ],
    },

  ];
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />
      <ContactPage siteInfo={siteInfo} />
    </>
  );
};

export default page;