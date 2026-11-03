import type { MetadataRoute } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "") ||
  "https://srimaniyainstitute.in";

// A crawler that matches a named group ignores the `*` group entirely, so the
// named groups repeat these rather than inheriting them.
const DISALLOW = [
  "/admin",
  "/api/",
  "/pdf/",
  "/blog/author/",
  "/blog/category/uncategorized/",
  "*.php",
];

// AI and search crawlers explicitly welcomed. Each gets its own group with
// the same DISALLOW list (see note above).
const ALLOWED_BOTS = [
  // OpenAI (ChatGPT search, browsing, training)
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  // Anthropic (Claude)
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Google Gemini / Apple Intelligence
  "Google-Extended",
  "Applebot-Extended",
  // Microsoft Bing / Copilot
  "Bingbot",
  // Others
  "Amazonbot",
  "Meta-ExternalAgent",
  "DuckAssistBot",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      ...ALLOWED_BOTS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: DISALLOW,
      })),
      {
        userAgent: "*",
        allow: "/",
        disallow: DISALLOW,
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
