"use client";

import React from "react";
import Image from "next/image";
import Paragraph from "@/components/common/Paragraph";
import Link from "next/link";
import type { Blog } from "./EventsBlogs";

const getVideoSources = (videoUrl: string) => {
  const base = `${process.env.NEXT_PUBLIC_API_BASE_URL}/`;
  const src = videoUrl.includes("videos/")
    ? `${base}${videoUrl}`
    : `${base}videos/${videoUrl}`;
  const sources = [
    { ext: ".mp4", type: "video/mp4" },
    { ext: ".webm", type: "video/webm" },
    { ext: ".ogg", type: "video/ogg" },
  ];
  const matched = sources.find(({ ext }) => videoUrl.endsWith(ext));
  if (matched) {
    return [<source key={matched.ext} src={src} type={matched.type} />];
  }
  return [<source key="default" src={src} />];
};

const BlogCard: React.FC<{ blog: Blog; idx: number }> = ({ blog, idx }) => (
  <Link href={`/events-blog/${blog.slug}`} hrefLang="en">
    <div className="overflow-hidden mx-auto relative cursor-pointer">
      <div className="w-full h-75 aspect-3/2 sm:aspect-auto">
        {blog.video_url ? (
          <video autoPlay loop muted className="w-full h-full object-cover">
            {getVideoSources(blog.video_url)}
            Your browser does not support the video tag.
          </video>
        ) : (
          <Image
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${blog.image_url}`}
            alt={`${blog.title} - Sri Maniya Institute event`}
            priority={idx === 0}
            className="w-full h-full object-cover image-tag"
            width={500}
            height={500}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
          />
        )}
      </div>
      <div
        className="absolute bottom-0 left-0 w-full bg-(--blue-overlay-strong) backdrop-blur-sm text-(--white-custom) border-t border-(--grey-custom) overflow-hidden"
        data-section
      >
        <div className="absolute inset-0 z-0 pointer-events-none bg-[url('/designs/noise.svg')] opacity-50 mix-blend-overlay bg-cover bg-no-repeat" />
        <div className="p-3 z-10 relative flex flex-col justify-between">
          <Paragraph size="base" className="mb-1 font-medium leading-relaxed line-clamp-1">
            {blog.sub_title}
          </Paragraph>
          <div className="flex items-baseline">
            <span className="font-bold text-xs">
              {new Date(blog.created_at).toLocaleDateString("en-GB", { day: "2-digit" })}
            </span>
            <span className="font-normal text-xs">
              {new Date(blog.created_at).toLocaleDateString("en-GB", { month: "long" })}
            </span>
          </div>
        </div>
      </div>
    </div>
  </Link>
);

export default BlogCard;
