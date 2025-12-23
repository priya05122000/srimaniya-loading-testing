import { redirect } from "next/navigation";
import { getBlogPostById } from "@/services/blogPostService";

export default async function EventsBlogRedirect(props: any) {
  const id = props.searchParams?.id;

  if (!id) {
    return <h1>Invalid URL</h1>;
  }

  const result = await getBlogPostById(id);
  const blogPost = result.data;

  if (!blogPost?.slug) {
    return <h1>Blog post not found</h1>;
  }

  redirect(`/events-blog-view/${blogPost.slug}`);
}
