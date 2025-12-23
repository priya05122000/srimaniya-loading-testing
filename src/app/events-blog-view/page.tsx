import { redirect } from "next/navigation";
import { getBlogPostById } from "@/services/blogPostService";

interface Props {
  searchParams: {
    id?: string;
  };
}

export default async function EventsBlogRedirect({ searchParams }: Props) {
  const id = searchParams.id;

  if (!id) {
    return <h1>Invalid URL</h1>;
  }

  // DB call
  const result = await getBlogPostById(id);
  const blogPost = result.data;

  if (!blogPost || !blogPost.slug) {
    return <h1>Blog post not found</h1>;
  }

  // 🔁 Redirect to new slug URL
  redirect(`/events-blog-view/${blogPost.slug}`);
}
