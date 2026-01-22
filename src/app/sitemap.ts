import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const staticPages = [
    "",
    "about-us",
    "contact-us",
    "courses",
    "placements",
    "scholarship",
    "events-blog",
    "career",
  ];

  const staticUrls = staticPages.map((path) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/${path}`,
    lastModified: new Date(),
    changeFrequency:
      path === "" || path === "events-blog"
        ? "daily"
        : "weekly",
    priority: path === "" ? 1.0 : path === "events-blog" ? 0.9 : 0.8,
  }));


  const blog = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog-post/all`,
    { cache: "no-store" }
  ).then((res) => res.json());

  const dynamicUrls = blog.data.map((blog: any) => ({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/events-blog/${blog.slug}`,
    lastModified: new Date(blog.updated_at || Date.now()),
    changeFrequency: "daily",
    priority: 0.7,
  }));

  return [...staticUrls, ...dynamicUrls];
}
