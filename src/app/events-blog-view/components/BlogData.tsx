"use client";
import React, { useEffect, useState, memo } from "react";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import Section from "@/components/common/Section";
import Paragraph from "@/components/common/Paragraph";
import Link from "next/link";
import { getAdminById } from "@/services/authService";
import { useGlobalLoader } from "@/providers/GlobalLoaderProvider";

// Types
type Blog = {
  slug: string;
  title: string;
  image_url: string;
  description: string;
  created_by?: string;
  created_at: string;
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
      <Paragraph size="lg" className="text-(--grey-light-custom)">{label}</Paragraph>
      {typeof value === "string" ? (
        <Paragraph size="lg" className="font-bold text-(--dark)">{value}</Paragraph>
      ) : value}
    </div>
  </div>
));
SidebarRow.displayName = "SidebarRow";

// Share section
const ShareSection: React.FC<ShareSectionProps> = memo(({ blog }) => {
  const currentUrl = typeof window !== "undefined" ? window.location.href : `https://yourdomain.com/events-blog-view/${blog.slug}`;
  const shareUrl = encodeURIComponent(currentUrl);
  const shareLinks = [
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, icon: <FaFacebook /> },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`, icon: <FaLinkedin /> },
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
const BlogDetails: React.FC<{ blog: Blog }> = ({ blog }) => {
  const [adminName, setAdminName] = useState<string>("Unknown Admin");
  const { setLoading } = useGlobalLoader();

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

  return (
    <Section className="relative overflow-hidden">
      <div className="flex flex-col md:flex-row gap-10 py-10 sm:py-0">
        {/* Sidebar */}
        <aside className="w-full sm:w-[30%] lg:w-[25%] xl:w-[20%] space-y-8 sm:border-r border-(--grey-custom) gap-4 md:gap-15 lg:gap-8 sm:py-16 flex flex-row sm:flex-col justify-between sm:justify-start">
          {sidebarData.map((item) => (
            <SidebarRow
              key={item.label}
              label={item.label}
              value={item.value}
            />
          ))}
        </aside>

        {/* Main Content */}
        <main className="w-full  sm:w-[70%] lg:w-[75%] xl:w-[80%] space-y-8 sm:py-16">
          <div>
            <div
              className="text-(--dark) text-base lg:text-lg"
              dangerouslySetInnerHTML={{ __html: blog?.description }}
            />
          </div>
        </main>
      </div>
    </Section>
  );
};

export default BlogDetails;
