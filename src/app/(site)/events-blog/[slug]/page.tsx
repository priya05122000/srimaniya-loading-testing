import type { Metadata } from "next";
import { getBlogPostBySlug } from "@/services/blogPostService";
import ViewPage from "./ViewPage";
import { getBlogMetaDescription } from "@/lib/blogMeta";

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
  const result = await getBlogPostBySlug(slug);
  const blog = result?.data;

  if (!blog) {
    return {
      title: "Event Blog | Sri Maniya Institute",
      description: "Events and updates from Sri Maniya Institute",
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/events-blog`,
      },
    };
  }

  // Blog subtitle first; description text only as a fallback.
  const description =
    getBlogMetaDescription(blog) ||
    `${blog.title} - Read blog from Sri Maniya Institute about hotel management and events.`;

  const imageUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${blog.image_url}`;

  return {
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/events-blog/${blog.slug}`,
    },

    title: blog.title,
    description: description,

    openGraph: {
      title: blog.title,
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
      title: blog.title,
      description: description,
      images: [imageUrl],
    },
  };
}

const page = async ({ params }: PageProps) => {
  const resolvedParams = params ? await params : undefined;
  const slug = resolvedParams?.slug;
  const result = await getBlogPostBySlug(slug);
  const blog = result?.data;

  if (!blog) {
    return (
      <div>
        <h1>Blog not found</h1>
      </div>
    );
  }

  const description = getBlogMetaDescription(blog);

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
        url: "https://srimaniyainstitute.in/logos/sri-maniya-institute-header-logo.png",
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
      <ViewPage />
    </div>
  );
};

export default page;
