import type { Metadata } from "next";
import { getBlogPostBySlug } from "@/services/blogPostService";
import ViewPage from "./ViewPage";

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const result = await getBlogPostBySlug(slug);
  const blog = result?.data;

  if (!blog) {
    return {
      title: "Event Blog | Sri Maniya Institute",
      description: "Events and updates from Sri Maniya Institute",
    };
  }

  const cleanText = (html: string, limit = 160) => {
    const text = html.replace(/<[^>]*>/g, "").trim();
    return text.length > limit ? text.slice(0, limit) + "…" : text;
  };

  const description = cleanText(blog.description, 60);

  const imageUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/files/${blog.image_url}`;

  return {
    title: blog.title,
    description: description,

    openGraph: {
      title: blog.title,
      description: description,
      url: `https://srimaniyainstitute.in/events-blog-view/${blog.slug}`,
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

const page = () => {
  return (
    <div>
      <ViewPage />
    </div>
  );
};

export default page;
