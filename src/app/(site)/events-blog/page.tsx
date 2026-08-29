import React from "react";
import { preload } from "react-dom";
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
  title: "Hotel Management Blogs & Events | Sri Maniya Institute",
  description:
    "Get hotel management career tips, placement stories & campus event updates from Sri Maniya Institute of Hotel Management, Kanyakumari. Read now.",
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
    title: "Hotel Management Blogs & Events | Sri Maniya Institute",
    description:
      "Get hotel management career tips, placement stories & campus event updates from Sri Maniya Institute of Hotel Management, Kanyakumari. Read now.",
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
    title: "Hotel Management Blogs & Events | Sri Maniya Institute",
    description:
      "Get hotel management career tips, placement stories & campus event updates from Sri Maniya Institute of Hotel Management, Kanyakumari. Read now.",
    images: [`${BASE_URL}/scholarship/scholarship-banner.webp`],

  },
};

const toListItem = (b: any) => {
  const plain = String(b.description ?? "").replace(/<[^>]*>/g, "").trim();
  return {
    id: b.id,
    slug: b.slug,
    sub_title: b.sub_title,
    image_url: b.image_url,
    category_id: b.category_id,
    created_at: b.created_at,
    description: plain.length > 200 ? plain.slice(0, 200) + "…" : plain,
  };
};

const page = async () => {
  const [blogResult, categoryResult] = await Promise.all([
    getAllBlogPosts(),
    getAllCategories(),
  ]);

  const rawBlogs = Array.isArray(blogResult?.data)
    ? blogResult.data.filter((b: any) => b.active === true)
    : [];

  const blogsData = rawBlogs.map(toListItem);

  const categories = categoryResult?.data || [];

  // Preload LCP image from head before any JS runs
  const lcpBlog = blogsData.find((b: any) => b.category_id === categories[0]?.id);
  if (lcpBlog?.image_url) {
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
    const encodedUrl = encodeURIComponent(`${apiBase}/${lcpBlog.image_url}`);
    const widths = [360, 640, 768, 1024, 1280, 1440, 1600];
    const imageSrcSet = widths
      .map((w) => `/_next/image?url=${encodedUrl}&w=${w}&q=100 ${w}w`)
      .join(", ");
    preload(`/_next/image?url=${encodedUrl}&w=640&q=100`, {
      as: "image",
      fetchPriority: "high",
      imageSrcSet,
      imageSizes: "(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw",
    });
  }

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

      ...rawBlogs.map((blog: any) => ({
        "@type": "BlogPosting",
        "@id": `${BASE_URL}/events-blog/${blog.slug}`,
        headline: blog.title,
        description: String(blog.description ?? "")
          .replace(/<[^>]*>/g, "")
          .trim()
          .slice(0, 200),
        image: blog.image_url
          ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${blog.image_url}`
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
        datePublished: blog.created_at,
        dateModified: blog.updated_at || blog.created_at,
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