"use client";
import React from "react";
import HotelManagement from "./components/HotelManagement";
import BlogImage from "./components/BlogImage";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { getBlogPostById } from "@/services/blogPostService";
import BlogData from "./components/BlogData";
import { useGlobalLoader } from "@/providers/GlobalLoaderProvider";

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

import { Suspense } from "react";

// Reusable: blog image mapping
const getAdditionalImages = (blog: Blog | null) =>
  Array.isArray(blog?.additional_images)
    ? blog.additional_images.map((name: string) => ({
      src: `${process.env.NEXT_PUBLIC_API_BASE_URL}/files/${name}`,
      alt: blog?.title || "Blog image",
    }))
    : [];

// Helper: Preload images (reusable)
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
  const searchParams = useSearchParams();
  const blogId = searchParams.get("id");
  const [blog, setBlog] = useState<Blog | null>(null);
  const { setLoading } = useGlobalLoader();

  useEffect(() => {
    if (!blogId) return;
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const result = await getBlogPostById(blogId);
        setBlog(result?.data);
        await preloadImages(result?.data);
      } catch (error: unknown) {
        if (error && typeof error === 'object' && 'message' in error) {
          console.error("Failed to load blog:", (error as { message?: string }).message);
        } else {
          console.error("Failed to load blog:", error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [blogId, setLoading]);

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
