import React from "react";
import type { Metadata } from "next";
import PlacementsPage from "./PlacementsPage";
import { getAllAlumniStories } from "@/services/alumniStoryService";
import { getAllPlacements } from "@/services/placementService";
import { getAllPartners } from "@/services/partnerService";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://srimaniyainstitute.in";

/* ---------------- SEO METADATA ---------------- */
export const metadata: Metadata = {
  alternates: {
    canonical: `${BASE_URL}/placements`,
  },

  title: "Hotel Management Placement Support Collage in TN",
  description:
    "Will you really get a job after hotel management? Yes — with placements across India, Dubai, Maldives & more. See our placement record!",

  keywords: [
    "Sri Maniya Institute placement",
    "hotel management placement",
    "hotel management course placement",
    "placement after hotel management",
    "hotel management job opportunities",
    "hotel management career opportunities",
    "hotel management internship",
    "top recruiters for hotel management students",
    "full time placements in hospitality",
    "100 % placement assistance hotel management",
    "Sri Maniya Institute career support",
    "career guidance in hospitality",
    "placement partners in hospitality industry",
  ],

  openGraph: {
    title: "Hotel Management Placement Support Collage in TN",
    description:
      "Will you really get a job after hotel management? Yes — with placements across India, Dubai, Maldives & more. See our placement record!",
    url: `${BASE_URL}/placements`,
    siteName: "Sri Maniya Institute",
    images: [
      {
        url: `${BASE_URL}/home/commitment-bg-1.webp`,
        width: 1200,
        height: 630,
        alt: "Sri Maniya Institute Placement",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Hotel Management Placement Support Collage in TN",
    description:
      "Will you really get a job after hotel management? Yes — with placements across India, Dubai, Maldives & more. See our placement record!",
    images: [`${BASE_URL}/home/commitment-bg-1.webp`],
  },
};

/* ---------------- PAGE ---------------- */
const page = async () => {
  let alumniStories: any[] = [];
  let placements: any[] = [];
  let partners: any[] = [];

  try {
    const [alumniRes, placementRes, partnerRes] = await Promise.all([
      getAllAlumniStories(),
      getAllPlacements(),
      getAllPartners(),
    ]);

    alumniStories = Array.isArray(alumniRes?.data)
      ? alumniRes.data.filter((s: any) => s?.status)
      : [];
    placements = Array.isArray(placementRes?.data)
      ? placementRes.data.filter((s: any) => s?.status)
      : [];
    partners = Array.isArray(partnerRes?.data)
      ? partnerRes.data.filter((p: any) => p?.status)
      : [];
  } catch (error) {
    console.error("Error fetching placements data:", error);
  }

  /* ---------------- SCHEMA ---------------- */
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOccupationalProgram",
        "@id": `${BASE_URL}/placements#program`,
        name: "Hotel Management Placement Support Program",
        description:
          "Sri Maniya Institute provides 100% placement assistance with global hospitality brands, internships, part-time opportunities, and career training for students.",
        provider: {
          "@type": "Organization",
          "@id": `${BASE_URL}/#organization`,
        },
        offers: {
          "@type": "Offer",
          name: "Placement Support",
          description:
            "Includes career guidance, interview preparation, internships, and global job placement opportunities in the hospitality industry.",
          category: "Career Support",
        },
      },

      {
        "@type": "Service",
        "@id": `${BASE_URL}/placements#service`,
        name: "Student Placement Assistance",
        description:
          "Comprehensive placement services including training, internship opportunities, part-time jobs, and full-time placement support in hotel management.",
        provider: {
          "@id": `${BASE_URL}/#organization`,
        },
        areaServed: {
          "@type": "Place",
          name: "India",
        },
      },

      {
        "@type": "BreadcrumbList",
        "@id": `${BASE_URL}/placements#breadcrumb`,
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
            name: "Placements",
            item: `${BASE_URL}/placements`,
          },
        ],
      },

      {
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        name: "Sri Maniya Institute of Hotel Management",
        url: BASE_URL,
      },
    ],
  };

  return (
    <>
      {/* ✅ JSON-LD SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      <PlacementsPage
        alumniStories={alumniStories}
        placements={placements}
        partners={partners}
      />
    </>
  );
};

export default page;