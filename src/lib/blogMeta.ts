// SEO description for a blog post.
// Uses the blog's subtitle (the short summary written in the admin); falls back
// to the description text only when the subtitle is empty. Either way the text
// is cut at a word boundary so it fits search results.

const META_DESCRIPTION_LIMIT = 155;

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

const META_TITLE_LIMIT = 60;
const SITE_SUFFIX = " | Sri Maniya Institute";

/**
 * <title> for a blog post, kept within 60 characters (what Google shows):
 *  - title + " | Sri Maniya Institute" when that fits,
 *  - otherwise the blog title alone,
 *  - and a long title is cut at a word boundary.
 * Use with `title: { absolute: ... }` so the layout template doesn't add the suffix again.
 */
export const getBlogMetaTitle = (title?: string | null) => {
  const clean = htmlToText(title);
  if (!clean) return "";
  const withSuffix = (t: string) =>
    t.length + SITE_SUFFIX.length <= META_TITLE_LIMIT ? t + SITE_SUFFIX : t;

  if (clean.length <= META_TITLE_LIMIT) return withSuffix(clean);

  // "Main title: subtitle" / "Main title - subtitle" → keep the main part if it is meaningful
  const main = clean.split(/\s*[:|–—]\s+|\s+-\s+/)[0].trim();
  if (main.length >= 20 && main.length <= META_TITLE_LIMIT) return withSuffix(main);

  return cutTitle(clean, META_TITLE_LIMIT);
};

// Words a cut title should not end on ("... Celebration at" → "... Celebration").
const DANGLING_WORDS = /\s+(a|an|the|and|or|of|at|in|on|for|to|with|by|from|&)$/i;

/** Cuts a title at a word boundary, without "…" and without a dangling word or punctuation. */
const cutTitle = (text: string, limit: number) => {
  let cut = text.slice(0, limit + 1);
  const lastSpace = cut.lastIndexOf(" ");
  cut = (lastSpace > 0 ? cut.slice(0, lastSpace) : text.slice(0, limit)).trim();
  let prev;
  do {
    prev = cut;
    cut = cut.replace(DANGLING_WORDS, "").replace(/[\s:;,|–—-]+$/, "").trim();
  } while (cut !== prev);
  return cut;
};

export const getBlogMetaDescription =(blog: BlogLike) => {
  const text = htmlToText(blog.sub_title) || htmlToText(blog.description);
  return text ? truncateText(text) : "";
};
