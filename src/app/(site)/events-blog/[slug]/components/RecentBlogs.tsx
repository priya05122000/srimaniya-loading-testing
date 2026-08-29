import React from "react";
import Image from "next/image";
import Link from "next/link";
import LeftSpaceGridSection from "@/components/common/LeftSpaceGridSection";
import Paragraph from "@/components/common/Paragraph";
import Heading from "@/components/common/Heading";

type Blog = {
  id: string;
  slug: string;
  sub_title: string;
  image_url: string;
  video_url?: string | null;
  title: string;
  created_at: string;
  category_id?: string;
};

/**
 * Server component. Renders a crawlable strip of links to other blog
 * posts so every article on the site has real internal links pointing
 * at it. Posts are passed in from the page (server fetch) — no client
 * `useEffect` fetch, so the <Link>s are present in the initial HTML.
 *
 * Same-category posts are shown first, then the most recent others.
 */
const RecentBlogs: React.FC<{
  blogs: Blog[];
  currentId?: string;
  currentCategoryId?: string;
}> = ({ blogs, currentId, currentCategoryId }) => {
  const pool = (blogs || []).filter((b) => b && b.slug && b.id !== currentId);

  if (pool.length === 0) return null;

  const byNewest = (a: Blog, b: Blog) =>
    new Date(b.created_at || 0).getTime() -
    new Date(a.created_at || 0).getTime();

  const sameCat = currentCategoryId
    ? pool.filter((b) => b.category_id === currentCategoryId).sort(byNewest)
    : [];
  const otherCat = pool
    .filter((b) => !currentCategoryId || b.category_id !== currentCategoryId)
    .sort(byNewest);

  const ordered = [...sameCat, ...otherCat].slice(0, 8);

  const getVideoSrc = (videoUrl: string) =>
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/${videoUrl}`;

  return (
    <LeftSpaceGridSection>
      <div className="pb-10 md:pb-16">
        <div className="mb-8">
          <Heading level={6} className="text-(--blue) leading-tight mt-2">
            Recent Blogs
          </Heading>
        </div>

        <ul className="flex gap-4 overflow-x-auto snap-x pb-2 -mx-1 px-1 md:grid md:grid-cols-3 lg:grid-cols-4 md:overflow-visible">
          {ordered.map((blog) => (
            <li
              key={blog.id}
              className="shrink-0 w-64 snap-start md:w-auto"
            >
              <Link hrefLang="en" href={`/events-blog/${blog.slug}`}>
                <div className="overflow-hidden mx-auto relative cursor-pointer">
                  <div className="w-full h-75 lg:h-87.5 aspect-3/2 sm:aspect-auto">
                    {blog.video_url ? (
                      <video
                        autoPlay
                        loop
                        muted
                        className="w-full h-full object-cover"
                      >
                        <source src={getVideoSrc(blog.video_url)} />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${blog.image_url}`}
                        alt={`${blog.title} — Sri Maniya Institute of Hotel Management`}
                        className="w-full h-full object-cover"
                        width={500}
                        height={500}
                        loading="lazy"
                      />
                    )}
                  </div>
                  <div className="absolute bottom-0 left-0 w-full bg-(--blue-overlay-strong) backdrop-blur-sm text-(--white) border-t border-grey-custom overflow-hidden">
                    <div className="absolute inset-0 z-0 pointer-events-none bg-[url('/designs/noise.svg')] opacity-50 mix-blend-overlay bg-cover bg-no-repeat" />
                    <div className="p-3 h-20 z-10 relative">
                      <Paragraph size="lg" className="mb-1 font-medium line-clamp-1">
                        {blog.sub_title}
                      </Paragraph>
                      <div className="flex gap-1 items-baseline">
                        <Paragraph size="lg" className="font-bold">
                          {new Date(blog.created_at).toLocaleDateString("en-GB", {
                            day: "2-digit",
                          })}
                        </Paragraph>
                        <Paragraph size="lg" className="font-normal">
                          {new Date(blog.created_at).toLocaleDateString("en-GB", {
                            month: "long",
                          })}
                        </Paragraph>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <Link
            hrefLang="en"
            href="/events-blog"
            className="text-(--blue) font-medium underline underline-offset-4 decoration-1"
          >
            Browse all hotel management blogs &amp; events →
          </Link>
        </div>
      </div>
    </LeftSpaceGridSection>
  );
};

export default RecentBlogs;
