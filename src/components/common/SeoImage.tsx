import { forwardRef } from "react";
import NextImage, { type ImageProps } from "next/image";

type SeoImageProps = ImageProps & {
  /** Size attributes for a `fill` image (defaults 1200 × 800). Layout still comes from CSS. */
  intrinsicWidth?: number;
  intrinsicHeight?: number;
};

// Same positioning next/image uses for `fill`
const FILL_STYLE: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
};

/**
 * Drop-in replacement for `next/image` that fixes two SEO crawler warnings:
 *
 * 1. "Missing image title" – sets `title` from the alt text when no title is
 *    passed (decorative images with an empty alt get none).
 * 2. "Missing size attributes" – `fill` images normally render without
 *    `width`/`height`. Here they are rendered with real size attributes and the
 *    same absolute 100% × 100% styling, so they look identical.
 */
const SeoImage = forwardRef<HTMLImageElement, SeoImageProps>(function SeoImage(
  { title, alt, fill, intrinsicWidth = 1200, intrinsicHeight = 800, style, sizes, ...props },
  ref
) {
  const resolvedTitle = title ?? (alt?.trim() ? alt.trim() : undefined);

  if (fill) {
    return (
      <NextImage
        ref={ref}
        alt={alt}
        title={resolvedTitle}
        width={intrinsicWidth}
        height={intrinsicHeight}
        // fill images default to full viewport width, keep that for the srcset
        sizes={sizes ?? "100vw"}
        style={{ ...FILL_STYLE, ...style }}
        {...props}
      />
    );
  }

  return (
    <NextImage ref={ref} alt={alt} title={resolvedTitle} sizes={sizes} style={style} {...props} />
  );
});

export default SeoImage;
