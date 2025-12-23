"use client";
import React, { useEffect, useState, memo } from "react";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import Section from "@/components/common/Section";
import Paragraph from "@/components/common/Paragraph";
import Link from "next/link";
import Image from "next/image";
import { getAdminById } from "@/services/authService";
import { useGlobalLoader } from "@/providers/GlobalLoaderProvider";
import { useRouter } from "next/navigation";
import Span from "@/components/common/Span";
import { getAllBlogPosts } from "@/services/blogPostService";

// Types
type Blog = {
  id: string;
  slug: string;
  title: string;
  sub_title: string;
  image_url: string;
  description: string;
  created_by?: string;
  created_at: string;
  active: boolean;
  category_id: string;
};

type SidebarInfo = {
  label: string;
  value: string | React.ReactNode;
};

interface ShareSectionProps {
  blog: Blog;
}

// Helper: Preload images (reusable)
const preloadImages = (blog: Blog) => {
  if (!blog || !blog.image_url) return Promise.resolve();
  const img = new window.Image();
  img.src = `${process.env.NEXT_PUBLIC_API_BASE_URL}/files/${blog.image_url}`;
  return new Promise((resolve) => {
    img.onload = resolve;
    img.onerror = resolve;
  });
};

// Reusable SidebarRow
const SidebarRow: React.FC<SidebarInfo> = memo(({ label, value }) => (
  <div className="grid grid-cols-[auto_1fr] gap-2 items-start">
    <div className="mt-2 hidden sm:block">
      <hr className="border border-(--grey-custom) w-15" />
    </div>
    <div>
      <Paragraph size="lg" className="text-(--grey-light-custom)">
        {label}
      </Paragraph>
      {typeof value === "string" ? (
        <Paragraph size="lg" className="font-bold text-(--dark)">
          {value}
        </Paragraph>
      ) : (
        value
      )}
    </div>
  </div>
));
SidebarRow.displayName = "SidebarRow";

// Share section
const ShareSection: React.FC<ShareSectionProps> = memo(({ blog }) => {
  const currentUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `https://srimaniyainstitute.in/events-blog-view/${blog.slug}`;
  const shareUrl = encodeURIComponent(currentUrl);
  const shareLinks = [
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      icon: <FaFacebook />,
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
      icon: <FaLinkedin />,
    },
  ];
  return (
    <div className="flex flex-col gap-2 mt-2">
      {shareLinks.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-(--dark) font-bold text-sm md:text-base xl:text-lg transition hover:underline"
        >
          {link.icon} {link.label}
        </Link>
      ))}
    </div>
  );
});
ShareSection.displayName = "ShareSection";

// Main BlogDetails
const BlogDetails: React.FC<{
  blog: Blog;
  categories: Array<{ id: string; name: string }>;
}> = ({ blog, categories }) => {
  const [adminName, setAdminName] = useState<string>("Unknown Admin");
  const [allBlogs, setAllBlogs] = useState<Blog[]>([]);
  const { setLoading } = useGlobalLoader();
  const router = useRouter();

  useEffect(() => {
    if (!categories || categories.length === 0 || !blog) return;
    async function fetchData() {
      try {
        setLoading(true);
        const res = await getAllBlogPosts();
        const blogsData = Array.isArray(res?.data)
          ? res.data.filter((blog: Blog) => blog.active === true)
          : [];
        const eventsCategory = categories.find(
          (cat) => cat.name.toLowerCase() === "events"
        );
        let eventsBlogs = eventsCategory
          ? blogsData.filter((b: Blog) => b.category_id === eventsCategory.id)
          : [];
        if (blog && blog.category_id === eventsCategory?.id) {
          eventsBlogs = eventsBlogs.filter((b: Blog) => b.id !== blog.id);
        }
        console.log("Fetched events blogs for sidebar:", eventsBlogs);
        setAllBlogs(eventsBlogs);
      } catch (err) {
        console.error("Failed to fetch blogs/categories:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [setLoading, categories, blog]);

  useEffect(() => {
    if (!blog?.created_by) return;
    setLoading(true);
    const fetchAdmin = async () => {
      try {
        const response = await getAdminById(blog.created_by!);
        setAdminName(response?.data?.name || "Unknown Admin");
        await preloadImages(blog);
      } catch (err) {
        console.error("Failed to fetch admin:", err);
        setAdminName("Unknown Admin");
      } finally {
        setLoading(false);
      }
    };
    fetchAdmin();
  }, [blog?.created_by, setLoading]);

  if (!blog) return null;

  const sidebarData: SidebarInfo[] = [
    { label: "Author", value: adminName },
    {
      label: "Date",
      value: new Date(blog.created_at).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    },
    { label: "Share", value: <ShareSection blog={blog} /> },
  ];

  const RecentBlogs: React.FC<{ blogs: Blog[]; className?: string }> = ({
    blogs,
    className = "",
  }) => (
    <div
      className={`shadow-xl border border-(--grey-custom) text-(--dark) p-4 mr-2 ${className}`}
    >
      <Paragraph size="xl" className="mb-4 font-bold">
        Our Events
      </Paragraph>
      <div className="flex flex-col gap-4 sm:gap-6">
        {blogs.slice(0, 3).map((b) => (
          <div
            key={b.id}
            className="flex flex-col items-start gap-2 sm:gap-0 cursor-pointer transition-transform duration-200 hover:scale-102"
            onClick={() => router.push(`/events-blog-view/${b.slug}`)}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/files/${b.image_url}`}
              alt={`Sri Maniya Institute of Hotel Management Recent Blog - ${b.title}, hotel management in tamil nadu, career opportunities in hotel management, hospitality management courses in tamilnadu`}
              className="w-full h-[120px] object-cover image-tag"
              width={800}
              height={500}
              unoptimized
            />
            <div className="">
              <Paragraph size="base" className="mt-2 font-bold line-clamp-2">
                {b.sub_title}
              </Paragraph>
              <Span className="text-xs line-clamp-2">
                {b.description.replace(/<[^>]+>/g, "").slice(0, 60)}...
              </Span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Section className="relative overflow-hidden">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Sidebar */}
        <aside className="w-full lg:w-[25%] xl:w-[20%] lg:border-r border-(--grey-custom)">
          <div className="flex flex-row lg:flex-col justify-between lg:justify-start gap-4 lg:gap-15 md:pt-10 lg:py-16">
            {sidebarData.map((item) => (
              <SidebarRow
                key={item.label}
                label={item.label}
                value={item.value}
              />
            ))}
          </div>
          <RecentBlogs blogs={allBlogs} className="hidden lg:block" />
        </aside>

        {/* Main Content */}
        <main className="w-full lg:w-[75%] xl:w-[80%] space-y-8 lg:py-16">
          <div>
            <div
              className="blog-content text-(--dark)"
              dangerouslySetInnerHTML={{ __html: blog?.description }}
            />
          </div>
        </main>
      </div>
    </Section>
  );
};

export default BlogDetails;
