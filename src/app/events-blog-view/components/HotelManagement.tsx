"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Section from "@/components/common/Section";
import Heading from "@/components/common/Heading";
import React, { FC } from "react";
import { getAllCategories } from "@/services/categoryService";
import Paragraph from "@/components/common/Paragraph";
import { useGlobalLoader } from "@/providers/GlobalLoaderProvider";
import { useSplitTextHeadingAnimation } from "@/hooks/useSplitTextHeadingAnimation";

const GRID_CLASSES =
  "absolute inset-0 grid grid-cols-1 sm:grid-cols-[1.5fr_1fr] lg:grid-cols-[2fr_1fr] xl:grid-cols-[3fr_1fr] h-full z-10";

const SECTION_CLASSES = "absolute pt-10 sm:pt-20 top-0";
const HEADING_6_CLASSES = "font-semibold text-(--blue)";
const HEADING_4_CLASSES = "text-(--blue) mb-8 leading-tight";

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
  video_url?: string;
}

interface HotelManagementProps {
  blog: Blog | null;
}

const getCategoryName = (
  categories: Array<{ id: string; name: string }>,
  categoryId: string
): string => {
  const found = categories.find((cat) => cat.id === categoryId);
  if (!found) return "Unknown";

  return found.name === "News&Events" ? "Events" : found.name;
};

const getVideoSrc = (videoUrl: string): string => {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/files/`
    : "";

  if (videoUrl.includes("videos/")) return base + videoUrl;

  return base + "videos/" + videoUrl;
};

// Preload image/video to avoid flashing
const preloadBlogMedia = (blog: Blog | null): Promise<void> => {
  if (!blog) return Promise.resolve();

  const base = process.env.NEXT_PUBLIC_API_BASE_URL
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/files/`
    : "";

  // If video exists
  if (blog.video_url) {
    return new Promise((resolve) => {
      const video = document.createElement("video");
      video.preload = "auto";
      video.src = blog.video_url && blog.video_url.includes("videos/")
        ? base + blog.video_url
        : blog.video_url
          ? base + "videos/" + blog.video_url
          : "";

      video.oncanplaythrough = () => resolve();
      video.onerror = () => resolve();
    });
  }

  // If only image
  if (blog.image_url) {
    return new Promise((resolve) => {
      const img = new window.Image();
      img.src = base + blog.image_url;

      img.onload = () => resolve();
      img.onerror = () => resolve();
    });
  }

  return Promise.resolve();
};

const HotelManagement: FC<HotelManagementProps> = ({ blog }) => {
  const [categories, setCategories] = useState<
    Array<{ id: string; name: string }>
  >([]);

  const { setLoading } = useGlobalLoader();

  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const eventViewRef = useRef<HTMLDivElement>(null);

  useSplitTextHeadingAnimation({
    trigger: eventViewRef,
    first: paragraphRef,
    second: headingRef,
    delay: 0.3,
    enabled: !!blog && categories.length > 0,
  });

  useEffect(() => {
    setLoading(true);

    const fetchCategory = async () => {
      try {
        const category = await getAllCategories();
        setCategories(category?.data ?? []);
        await preloadBlogMedia(blog);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [setLoading, blog]);

  if (!blog) return null;

  const categoryName = getCategoryName(categories, blog.category_id);

  return (
    <div className="h-full relative" data-section ref={eventViewRef}>
      <div className={GRID_CLASSES}></div>

      <Section className={SECTION_CLASSES}>
        <div className="mb-4">
          <Paragraph size="lg" ref={paragraphRef} className={HEADING_6_CLASSES}>
            {categoryName}
          </Paragraph>

          <Heading ref={headingRef} level={4} className={HEADING_4_CLASSES}>
            {blog.title}
          </Heading>
        </div>

        {/* IMAGE / VIDEO SECTION */}
        <div className="relative w-full h-54 md:h-96 lg:h-[400px] xl:h-[450px] overflow-hidden shadow-md aspect-square">
          {blog.video_url ? (
            <video autoPlay loop muted className="w-full h-full object-contain">
              <source src={getVideoSrc(blog.video_url)} />
            </video>
          ) : (
            <Image
              src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/files/${blog.image_url}`}
              alt={blog.title}
              fill
              className="object-cover h-full image-tag"
              priority
            />
          )}
        </div>
      </Section>
    </div>
  );
};

export default HotelManagement;
