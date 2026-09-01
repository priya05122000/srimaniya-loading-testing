import React from "react";
import Section from "@/components/common/Section";
import RelatedArticles from "@/components/common/RelatedArticles";
import { getAllBlogPosts } from "@/services/blogPostService";

/**
 * Server component. Fetches blog posts and renders a crawlable
 * "Related Articles" block. Dropped into the marketing pages
 * (Courses / About / Placements / Career) so cornerstone blog
 * content receives contextual internal links from the rest of the
 * site — not just from the sitemap.
 */
interface BlogLinksSectionProps {
  title?: string;
  intro?: string;
  limit?: number;
  className?: string;
}

const BlogLinksSection = async ({
  title = "Hotel Management Guides & Career Insights",
  intro = "Read more from Sri Maniya Institute on courses, admissions, salaries and career paths in hotel management.",
  limit = 6,
  className = "",
}: BlogLinksSectionProps) => {
  let posts: any[] = [];
  try {
    const res = await getAllBlogPosts();
    posts = Array.isArray(res?.data)
      ? res.data.filter((b: any) => b?.active === true)
      : [];
  } catch (err) {
    console.error("BlogLinksSection fetch error:", err);
  }

  if (posts.length === 0) return null;

  return (
    <Section className="sr-only">
      <RelatedArticles
        posts={posts}
        title={title}
        intro={intro}
        limit={limit}
      />
    </Section>
  );
};

export default BlogLinksSection;
