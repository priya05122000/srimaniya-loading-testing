import React from "react";
import type { Metadata } from "next";
import EventsBlogPage from "./EventsBlogPage";
import { getAllBlogPosts } from "@/services/blogPostService";
import { getAllCategories } from "@/services/categoryService";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://srimaniyainstitute.in";


export const dynamic = "force-dynamic";

export const revalidate = 0; // ✅ IMPORTANT (disable cache)


export const metadata: Metadata = {
  alternates: {
    canonical: `${BASE_URL}/events-blog`,
  },
  title: "Hospitality Career Insights & Tips | Sri Maniya Blog",
  description:
    "Discover hotel management events and blogs from Sri Maniya Institute, sharing campus activities, industry insights, and student achievements.",
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
      "Discover hotel management events and blogs from Sri Maniya Institute, sharing campus activities, industry insights, and student achievements.",
    url: `${BASE_URL}/events-blog`,
    siteName: "Sri Maniya Institute",
    images: [
      {
        url: `${BASE_URL}/scholarship/scholarship-banner.webp`,
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
      "Discover hotel management events and blogs from Sri Maniya Institute, sharing campus activities, industry insights, and student achievements.",
    images: [`${BASE_URL}/scholarship/scholarship-banner.webp`],

  },
};

const page = async () => {
  const [blogResult, categoryResult] = await Promise.all([
    getAllBlogPosts(),
    getAllCategories(),
  ]);

  const blogsData = Array.isArray(blogResult?.data)
    ? blogResult.data.filter((b: any) => b.active === true)
    : [];

  const categories = categoryResult?.data || [];

  /* ---------------- DYNAMIC SCHEMA ---------------- */
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": `${BASE_URL}/events-blog#blog`,
        name: "Sri Maniya Blog",
        description:
          "Hospitality career insights, events, and student success stories.",
        url: `${BASE_URL}/events-blog`,
      },

      ...blogsData.map((blog: any) => ({
        "@type": "BlogPosting",
        "@id": `${BASE_URL}/events-blog/${blog.slug}`,
        headline: blog.title,
        description: blog.shortNote || blog.metaDescription,
        image: blog.imagePath
          ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${blog.imagePath}`
          : `${BASE_URL}/default-blog.webp`,
        author: {
          "@type": "Organization",
          name: "Sri Maniya Institute",
        },
        publisher: {
          "@type": "Organization",
          name: "Sri Maniya Institute",
          logo: {
            "@type": "ImageObject",
            url: `${BASE_URL}/logo.png`,
          },
        },
        datePublished: blog.createdAt,
        dateModified: blog.updatedAt || blog.createdAt,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${BASE_URL}/events-blog/${blog.slug}`,
        },
      })),

      {
        "@type": "BreadcrumbList",
        "@id": `${BASE_URL}/events-blog#breadcrumb`,
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
            name: "Blog",
            item: `${BASE_URL}/events-blog`,
          },
        ],
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
      <EventsBlogPage blogs={blogsData} categories={categories} />
    </>
  );
};

export default page;