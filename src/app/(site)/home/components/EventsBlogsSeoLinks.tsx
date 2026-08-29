import React from "react";
import Link from "next/link";
import { getAllBlogPosts } from "@/services/blogPostService";

/**
 * Server component. The visible "Latest from Us" slider on the home page
 * is a client-only widget (dynamic, ssr:false) so its links never reach
 * the server HTML. This renders a crawlable list of the same links so the
 * home page passes internal-link authority to blog articles.
 */
const EventsBlogsSeoLinks = async () => {
  let posts: Array<{
    id: string;
    slug: string;
    title?: string;
    sub_title?: string;
    active?: boolean;
    created_at?: string | null;
  }> = [];

  try {
    const res = await getAllBlogPosts();
    posts = Array.isArray(res?.data)
      ? res.data.filter((b: any) => b?.active === true)
      : [];
  } catch (err) {
    console.error("EventsBlogsSeoLinks fetch error:", err);
  }

  if (posts.length === 0) return null;

  const items = [...posts]
    .sort(
      (a, b) =>
        new Date(b.created_at || 0).getTime() -
        new Date(a.created_at || 0).getTime()
    )
    .slice(0, 12);

  return (
    <nav aria-label="Latest hotel management blogs and events" className="sr-only">
      <h2>Latest Hotel Management Blogs &amp; Events</h2>
      <ul>
        {items.map((post) => (
          <li key={post.id}>
            <Link hrefLang="en" href={`/events-blog/${post.slug}`}>
              {post.sub_title || post.title || post.slug}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default EventsBlogsSeoLinks;
