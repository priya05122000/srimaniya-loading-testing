import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "") ||
    "https://srimaniyainstitute.in";


  // ✅ Static pages
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

  const staticUrls: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${baseUrl}/${path}`,
    lastModified: new Date(),
    changeFrequency:
      path === "" || path === "events-blog" ? "daily" : "weekly",
    priority: path === "" ? 1.0 : path === "events-blog" ? 0.9 : 0.8,
  }));

  // ✅ Dynamic blog pages
  let dynamicUrls: MetadataRoute.Sitemap = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog-post/all`,
      {
        // cache: "no-store",
        next: { revalidate: 60 },
      }
    );

    const blog = await res.json();

    dynamicUrls = (blog?.data || []).map((item: any) => ({
      url: `${baseUrl}/events-blog/${item.slug}`,
      lastModified: new Date(item.updated_at || Date.now()),
      changeFrequency: "daily",
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Sitemap fetch error:", error);
  }

  // ✅ Combine all URLs
  return [...staticUrls, ...dynamicUrls];
}