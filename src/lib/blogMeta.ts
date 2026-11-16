// SEO description for a blog post.
// Uses the blog's subtitle (the short summary written in the admin); falls back
// to the description text only when the subtitle is empty. Either way the text
// is cut at a word boundary so it fits search results.

const META_DESCRIPTION_LIMIT = 160;

type BlogLike = {
  sub_title?: string | null;
  description?: string | null;
};

const ENTITIES: Record<string, string> = {
  "&nbsp;": " ",
  "&amp;": "&",
  "&quot;": '"',
  "&#39;": "'",
  "&apos;": "'",
  "&lt;": "<",
  "&gt;": ">",
};

/** HTML → plain text with collapsed whitespace. */
export const htmlToText = (html?: string | null) =>
  (html ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&[a-z#0-9]+;/gi, (e) => ENTITIES[e.toLowerCase()] ?? " ")
    .replace(/\s+/g, " ")
    .trim();

/** Shortens text to `limit` characters without cutting a word in half. */
export const truncateText = (text: string, limit = META_DESCRIPTION_LIMIT) => {
  if (text.length <= limit) return text;
  const cut = text.slice(0, limit - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > limit * 0.6 ? cut.slice(0, lastSpace) : cut).trim()}…`;
};

export const getBlogMetaDescription = (blog: BlogLike) => {
  const text = htmlToText(blog.sub_title) || htmlToText(blog.description);
  return text ? truncateText(text) : "";
};
