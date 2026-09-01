import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPostBySlug, getAllBlogPosts } from "@/services/blogPostService";
import { getAllCategories } from "@/services/categoryService";
import ViewPage from "./ViewPage";
import ArticleBody from "./components/ArticleBody";
import RecentBlogs from "./components/RecentBlogs";

const fetchBlogBySlug = async (slug?: string) => {
  if (!slug) return null;
  try {
    const result = await getBlogPostBySlug(slug);
    return result?.data && Object.keys(result.data).length > 0
      ? result.data
      : null;
  } catch {
    return null;
  }
};

export interface PageProps {
  params?: Promise<SegmentParams>;
  searchParams?: Promise<any>;
}

type SegmentParams = {
  slug: string;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = params ? await params : undefined;
  const slug = resolvedParams?.slug;
  const blog = await fetchBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Blog Post Not Found",
      description:
        "This blog post is no longer available. Browse the latest hotel management articles and campus events from Sri Maniya Institute.",
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/events-blog`,
      },
      robots: { index: false, follow: true },
    };
  }

  const cleanText = (html: unknown, limit = 160) => {
    const text = String(html ?? "")
      .replace(/<[^>]*>/g, "")
      .trim();
    return text.length > limit ? text.slice(0, limit) + "…" : text;
  };

  const seoTitle = (() => {
    const BRAND_SUFFIX_LEN = " | Sri Maniya Institute".length;
    const MAX_TITLE_LEN = 60 - BRAND_SUFFIX_LEN;

    let t = String(blog.title ?? "")
      .replace(
        /\s*(?:[-–—|]\s*)?(?:at|from|by|@)?\s*Sri\s*Maniya\s*Institute(?:\s*of\s*Hotel\s*Management)?/gi,
        " "
      )
      .replace(/\s{2,}/g, " ")
      .replace(/\s*[-–—|:]\s*$/, "")
      .trim();

    if (t.length > MAX_TITLE_LEN) {
      const cut = t.slice(0, MAX_TITLE_LEN);
      const lastSpace = cut.lastIndexOf(" ");
      t = (lastSpace > 20 ? cut.slice(0, lastSpace) : cut).trim();
    }

    return t || "Events & Blog";
  })();

  const description =
    cleanText(blog.description, 120) ||
    `${seoTitle} - Read blog from Sri Maniya Institute about hotel management and events.`;

  const imageUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${blog.image_url}`;

  return {
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/events-blog/${blog.slug}`,
    },

    title: seoTitle,
    description: description,

    openGraph: {
      title: `${seoTitle} | Sri Maniya Institute`,
      description: description,
      url: `https://srimaniyainstitute.in/events-blog/${blog.slug}`,
      type: "article",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${seoTitle} | Sri Maniya Institute`,
      description: description,
      images: [imageUrl],
    },
  };
}

const page = async ({ params }: PageProps) => {
  const resolvedParams = params ? await params : undefined;
  const slug = resolvedParams?.slug;

  const [blog, categoryResult, allBlogsResult] = await Promise.all([
    fetchBlogBySlug(slug),
    getAllCategories().catch(() => null),
    getAllBlogPosts().catch(() => null),
  ]);

  const categories = Array.isArray(categoryResult?.data)
    ? categoryResult.data
    : [];
  const allBlogs = Array.isArray(allBlogsResult?.data)
    ? allBlogsResult.data.filter((b: any) => b?.active === true)
    : [];


  if (!blog) {
    notFound();
  }

  const cleanText = (html: unknown, limit = 160) => {
    const text = String(html ?? "")
      .replace(/<[^>]*>/g, "")
      .trim();
    return text.length > limit ? text.slice(0, limit) + "…" : text;
  };

  const description = cleanText(blog.description, 60);

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: description,
    image: `${process.env.NEXT_PUBLIC_API_BASE_URL}/${blog.image_url}`,
    datePublished: blog.created_at,
    dateModified: blog.updated_at || blog.created_at,
    author: {
      "@type": "Organization",
      name: "Sri Maniya Institute of Hotel Management",
    },
    publisher: {
      "@type": "EducationalOrganization",
      name: "Sri Maniya Institute of Hotel Management",
      logo: {
        "@type": "ImageObject",
        url: "https://srimaniyainstitute.in/logos/navbarlogo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://srimaniyainstitute.in/events-blog/${blog.slug}`,
    },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {/* sr-only */}
      <ArticleBody blog={blog} categories={categories} />

      <ViewPage blog={blog} categories={categories} allBlogs={allBlogs} />
 
      <RecentBlogs
        blogs={allBlogs}
        currentId={blog?.id}
        currentCategoryId={blog?.category_id}
      />
    </div>
  );
};

export default page;
