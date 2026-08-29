import React from "react";
import Image from "next/image";
import Section from "@/components/common/Section";
import styles from "./blog.module.css";

interface Blog {
  id: string;
  image_url: string;
  video_url?: string;
  title: string;
  sub_title?: string;
  description: string;
  faq?: string;
  created_at: string;
  category_id: string;
}

interface ArticleBodyProps {
  blog: Blog;
  categories: Array<{ id: string; name: string }>;
}

const getCategoryName = (
  categories: Array<{ id: string; name: string }>,
  categoryId: string
): string => {
  const found = categories.find((cat) => cat.id === categoryId);
  if (!found) return "";
  return found.name === "News&Events" ? "Events" : found.name;
};

const getVideoSrc = (videoUrl: string): string => {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/`
    : "";
  if (videoUrl.includes("videos/")) return base + videoUrl;
  return base + "videos/" + videoUrl;
};

/**
 * Server component: renders the full article (heading + hero + body + FAQ)
 * directly into the server HTML. This is what search engines and SEO
 * auditors read, so the post text must live here — not in a client
 * `useEffect` fetch.
 */
const ArticleBody: React.FC<ArticleBodyProps> = ({ blog, categories }) => {
  const categoryName = getCategoryName(categories, blog.category_id);
  const publishedDate = new Date(blog.created_at).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <article className="relative">
      <Section className="pt-10 sm:pt-20">
        <header className="mb-4">
          {categoryName && (
            <p className="font-semibold text-(--blue) text-base sm:text-lg">
              {categoryName}
            </p>
          )}
          <h1 className="text-(--blue) mb-4 leading-tight text-3xl sm:text-4xl lg:text-5xl font-bold font-jakarta">
            {blog.title}
          </h1>
        </header>

        {/* Hero image / video */}
        <div className="relative w-full h-54 md:h-96 lg:h-100 xl:h-112.5 overflow-hidden shadow-md aspect-square">
          {blog.video_url ? (
            <video autoPlay loop muted className="w-full h-full object-contain">
              <source src={getVideoSrc(blog.video_url)} />
            </video>
          ) : (
            <Image
              src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${blog.image_url}`}
              alt={`${blog.title} — Sri Maniya Institute of Hotel Management`}
              width={800}
              height={800}
              className="object-cover object-center h-full w-full image-tag"
              priority
              unoptimized
            />
          )}
        </div>
      </Section>
    </article>
  );
};

export default ArticleBody;
