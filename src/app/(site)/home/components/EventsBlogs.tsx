"use client";

import LeftSpaceGridSection from "@/components/common/LeftSpaceGridSection";
import Paragraph from "@/components/common/Paragraph";
import React, { useEffect, useState } from "react";
import { getHomeBlogPosts } from "@/services/blogPostService";
import { useSplitTextHeadingAnimation } from "@/hooks/useSplitTextHeadingAnimation";
import dynamic from "next/dynamic";

export type Blog = {
  id: string;
  slug: string;
  image_url: string;
  video_url: string;
  title: string;
  sub_title: string;
  created_at: string;
};

const EventsBlogsSlider = dynamic(() => import("./EventsBlogsSlider"), {
  ssr: false,
});

const EventsBlogs: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const eventsRef = React.useRef<HTMLDivElement | null>(null);
  const headingRef = React.useRef<HTMLHeadingElement | null>(null);
  const paragraphRef = React.useRef<HTMLParagraphElement | null>(null);

  useSplitTextHeadingAnimation({
    trigger: eventsRef,
    first: paragraphRef,
    second: headingRef,
    delay: 0.3,
    enabled: blogs.length > 0,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getHomeBlogPosts();
        const blogsData = Array.isArray(res?.data)
          ? res.data.filter(
              (b: unknown) =>
                typeof b === "object" &&
                b !== null &&
                "active" in b &&
                (b as { active: boolean }).active === true
            )
          : [];
        setBlogs(blogsData.slice(0, 10));
      } catch (err) {
        console.error("Failed to fetch blogs/categories:", err);
      }
    }
    fetchData();
  }, []);

  return (
    <div ref={eventsRef}>
      <LeftSpaceGridSection>
        <div className="py-10 sm:py-20">
          <div className="mb-8">
            <Paragraph
              ref={paragraphRef}
              size="lg"
              className="text-(--blue) font-bold news-title"
            >
              Events and Blogs
            </Paragraph>
            <p
              ref={headingRef}
              className="text-(--blue) text-3xl sm:text-4xl lg:text-5xl font-bold mt-1 leading-tight uppercase latest-title font-jakarta"
            >
              Latest from Us
            </p>
          </div>
          {blogs.length > 0 && <EventsBlogsSlider blogs={blogs} />}
        </div>
      </LeftSpaceGridSection>
    </div>
  );
};

export default EventsBlogs;
