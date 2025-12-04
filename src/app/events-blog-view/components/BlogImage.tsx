"use client";
import Image from "next/image";
import Section from "@/components/common/Section";
import React, { FC } from "react";

interface BlogImageProps {
  additional_images: { src: string; alt: string }[];
}

// Reusable image block
const BlogImageBlock: FC<{
  src: string;
  alt: string;
  full?: boolean;
  priority?: boolean;
}> = React.memo(({ src, alt, full = true, priority = false }) => (
  <div
    className={`relative w-full overflow-hidden shadow-md aspect-square ${full
      ? "h-64 md:h-80 lg:h-96 xl:h-[450px]"
      : "h-48 md:h-64 lg:h-72 xl:h-80"
      }`}
  >
    <Image
      src={src}
      alt={alt}
      width={800}
      height={800}
      className="object-cover"
      priority={priority}
      sizes="(max-width: 768px) 100vw,
             (max-width: 1200px) 50vw,
             33vw"
    />
  </div>
));
BlogImageBlock.displayName = "BlogImageBlock";

const BlogImage: FC<BlogImageProps> = ({ additional_images = [] }) => {
  const images = Array.isArray(additional_images) ? additional_images : [];

  // Pattern rendering: full → two side-by-side → full → two side-by-side...
  const renderPattern = () => {
    const result: React.ReactElement[] = [];
    let i = 0;

    while (i < images.length) {
      // Full image
      result.push(
        <BlogImageBlock
          key={`full-${i}`}
          src={images[i].src}
          alt={images[i].alt}
          full
          priority={i === 0}
        />
      );
      i++;

      // Side-by-side images (take next 2)
      if (i < images.length) {
        const sideImages = [];

        for (let j = 0; j < 2 && i < images.length; j++, i++) {
          sideImages.push(
            <BlogImageBlock
              key={`side-${i}`}
              src={images[i].src}
              alt={images[i].alt}
              full={false}
            />
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
      <div className="space-y-6">{renderPattern()}</div>
    </Section>
  );
};

export default BlogImage;
