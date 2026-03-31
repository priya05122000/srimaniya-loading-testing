import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "") ||
    "https://srimaniyainstitute.in";


  return {
    rules: [
      {
        userAgent: "*",
        allow: "/", // ✅ allow everything
        disallow: [
          "/admin",
          "/api",
          "/blog/author/",
          "/blog/category/uncategorized/",
          "/blog/author/*/feed/",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`, // ✅ dynamic
  };
}