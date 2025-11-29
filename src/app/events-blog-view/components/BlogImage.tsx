"use client";
import Image from "next/image";
import Section from "@/components/common/Section";
import React, { FC } from "react";

interface BlogImageProps {
  additional_images: { src: string; alt: string }[];
}

// Reusable image block
const BlogImageBlock: FC<{ src: string; alt: string; full?: boolean; priority?: boolean }> = React.memo(({ src, alt, full = true, priority = false }) => (
  <div className={`relative w-full ${full ? 'h-64 md:h-76 lg:h-[350px] xl:h-[400px]' : 'h-64 md:h-70 xl:h-85'} overflow-hidden shadow-md`}>
    <Image src={src} alt={alt} fill className="object-cover image-tag" priority={priority} />
  </div>
));
BlogImageBlock.displayName = "BlogImageBlock";

const BlogImage: FC<BlogImageProps> = ({ additional_images = [] }) => {
  const images = Array.isArray(additional_images) ? additional_images : [];

  // Pattern: full image, then side by side, then full, then side by side, etc.
  const renderPattern = () => {
    const result = [];
    let i = 0;
    while (i < images.length) {
      // Full image
      result.push(
        <BlogImageBlock key={`full-${i}`} src={images[i].src} alt={images[i].alt} full priority={i === 0} />
      );
      i++;
      // Side by side (next two images)
      if (i < images.length) {
        const sideImages = [];
        for (let j = 0; j < 2 && i < images.length; j++, i++) {
          sideImages.push(
            <BlogImageBlock key={`side-${i}`} src={images[i].src} alt={images[i].alt} full={false} />
          );
        }
        result.push(
          <div key={`side-group-${i}`} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sideImages}
          </div>
        );
      }
    }
    return result;
  };

  return (
    <Section className="pb-12">
      <div className="space-y-4">
        {renderPattern()}
      </div>
    </Section>
  );
};

export default BlogImage;
