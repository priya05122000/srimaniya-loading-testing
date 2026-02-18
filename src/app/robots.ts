import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: [
          "/blog/author/",
          "/blog/category/uncategorized/",
          "/blog/author/*/feed/",
        ],
      },
    ],
    sitemap: "https://www.srimaniyainstitute.in/sitemap.xml",
  };
}
