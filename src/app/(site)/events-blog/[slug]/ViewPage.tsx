"use client";
import React from "react";

import BlogImage from "./components/BlogImage";
import BlogDetails from "./components/BlogDetails";

interface Blog {
  id: string;
  image_url: string;
  sub_title: string;
  title: string;
  content: string;
  created_at: string;
  category_id: string;
  created_by: string;
  slug: string;
  description: string;
  faq?: string;
  additional_images?: string[];
  active: boolean;
}

interface ViewPageProps {
  blog: Blog;
  categories: Array<{ id: string; name: string }>;
  allBlogs?: Blog[];
}

const getAdditionalImages = (blog: Blog | null) =>
  Array.isArray(blog?.additional_images)
    ? blog.additional_images.map((name: string) => ({
        src: `${process.env.NEXT_PUBLIC_API_BASE_URL}/${name}`,
        alt: blog?.title || "Blog image",
      }))
    : [];

/**
 * Client islands for the blog detail page. The article text is rendered
 * server-side by <ArticleBody>; this component only hydrates the
 * interactive / secondary sections (share sidebar, image gallery).
 * "Recent Blogs" internal links are rendered server-side by <RecentBlogs>
 * from page.tsx so they stay crawlable.
 */
export default function ViewPage({ blog, categories, allBlogs }: ViewPageProps) {
  const additionalImages = getAdditionalImages(blog);

  return (
    <div className="relative">
      <BlogDetails blog={blog} categories={categories} allBlogs={allBlogs} />
      <BlogImage additional_images={additionalImages} />
    </div>
  );
}
