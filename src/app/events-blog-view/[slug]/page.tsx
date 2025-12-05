"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useParams } from "next/navigation";

import HotelManagement from "./components/HotelManagement";
import BlogImage from "./components/BlogImage";
import BlogData from "./components/BlogData";
import { useGlobalLoader } from "@/providers/GlobalLoaderProvider";
import { getBlogPostBySlug } from "@/services/blogPostService";

interface Blog {
  id: string;
  image_url: string;
  title: string;
  content: string;
  created_at: string;
  category_id: string;
  created_by: string;
  slug: string;
  description: string;
  additional_images?: string[];
}

const getAdditionalImages = (blog: Blog | null) =>
  Array.isArray(blog?.additional_images)
    ? blog.additional_images.map((name: string) => ({
        src: `${process.env.NEXT_PUBLIC_API_BASE_URL}/files/${name}`,
        alt: blog?.title || "Blog image",
      }))
    : [];

const preloadImages = (blog: Blog | null) => {
  if (!blog || !Array.isArray(blog.additional_images)) return Promise.resolve();
  return Promise.all(
    blog.additional_images.map((name) => {
      const img = new window.Image();
      img.src = `${process.env.NEXT_PUBLIC_API_BASE_URL}/files/${name}`;
      return new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve;
      });
    })
  );
};

function BlogViewPageContent() {
  const { slug } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const { setLoading } = useGlobalLoader();

  useEffect(() => {
    if (!slug) return;

    const fetchBlog = async () => {
      setLoading(true);
      try {
        const result = await getBlogPostBySlug(slug);
        setBlog(result?.data);
        await preloadImages(result?.data);
      } catch (error: unknown) {
        console.error("Failed to load blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug, setLoading]);

  const additionalImages = getAdditionalImages(blog);

  return (
    <div className="relative">
      <HotelManagement blog={blog} />
      {blog && <BlogData blog={blog} />}
      <BlogImage additional_images={additionalImages} />
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogViewPageContent />
    </Suspense>
  );
}
