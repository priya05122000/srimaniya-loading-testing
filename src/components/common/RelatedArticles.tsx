import React from "react";
import Link from "next/link";

/**
 * Server component. Renders a crawlable list of internal links to blog
 * articles so that every post in the sitemap has real internal links
 * pointing at it (fixes "orphaned pages" SEO findings).
 *
 * No `"use client"`, no data fetching here — the caller passes a plain
 * array of posts so the links land in the server-rendered HTML.
 */

export interface RelatedArticleItem {
  id: string;
  slug: string;
  title?: string;
  sub_title?: string;
  description?: string;
  category_id?: string;
  created_at?: string | null;
}

interface RelatedArticlesProps {
  /** Full pool of posts to pick from. */
  posts: RelatedArticleItem[];
  /** Exclude this post (e.g. the article currently being viewed). */
  currentId?: string;
  /** Prefer posts sharing this category before falling back to recency. */
  preferCategoryId?: string;
  /** Section heading. */
  title?: string;
  /** Max links to render. */
  limit?: number;
  /** Render visually hidden (still crawlable) — used where a design slot
   *  is already filled by an interactive widget. */
  srOnly?: boolean;
  className?: string;
  /** Optional short intro sentence rendered under the heading. */
  intro?: string;
}

const stripHtml = (value?: string) =>
  String(value ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const byNewest = (a: RelatedArticleItem, b: RelatedArticleItem) =>
  new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();

const RelatedArticles: React.FC<RelatedArticlesProps> = ({
  posts,
  currentId,
  preferCategoryId,
  title = "Related Hotel Management Articles",
  limit = 6,
  srOnly = false,
  className = "",
  intro,
}) => {
  const pool = (posts || []).filter(
    (p) => p && p.slug && p.id !== currentId
  );

  if (pool.length === 0) return null;

  let ordered: RelatedArticleItem[];
  if (preferCategoryId) {
    const sameCat = pool
      .filter((p) => p.category_id === preferCategoryId)
      .sort(byNewest);
    const otherCat = pool
      .filter((p) => p.category_id !== preferCategoryId)
      .sort(byNewest);
    ordered = [...sameCat, ...otherCat];
  } else {
    ordered = [...pool].sort(byNewest);
  }

  const items = ordered.slice(0, limit);
  if (items.length === 0) return null;

  if (srOnly) {
    return (
      <nav aria-label={title} className="sr-only">
        <h2>{title}</h2>
        <ul>
          {items.map((post) => (
            <li key={post.id}>
              <Link hrefLang="en" href={`/events-blog/${post.slug}`}>
                {post.title || post.sub_title || post.slug}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  return (
    <nav
      aria-label={title}
      className={`related-articles ${className}`}
    >
      <h2 className="text-(--blue) font-bold text-2xl sm:text-3xl font-jakarta leading-tight mb-2">
        {title}
      </h2>
      {intro && (
        <p className="text-(--dark) text-sm sm:text-base mb-6 max-w-3xl">
          {intro}
        </p>
      )}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
        {items.map((post) => {
          const anchor = post.sub_title || post.title || post.slug;
          const blurb = stripHtml(post.description).slice(0, 120);
          return (
            <li key={post.id} className="border-b border-(--grey-custom) pb-3">
              <Link
                hrefLang="en"
                href={`/events-blog/${post.slug}`}
                className="text-(--blue) font-medium underline underline-offset-4 decoration-1 leading-snug hover:opacity-80"
              >
                {anchor}
              </Link>
              {blurb && (
                <p className="text-(--dark) text-xs mt-1 line-clamp-2">
                  {blurb}
                  {blurb.length === 120 ? "…" : ""}
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default RelatedArticles;
