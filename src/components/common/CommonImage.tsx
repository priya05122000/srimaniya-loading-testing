import Image from "next/image";

type ImageType = "hero" | "card" | "avatar" | "icon";

interface CommonImageProps {
  src: string;
  alt: string;
  type: ImageType;
  className?: string;
  priority?: boolean;
  unoptimized?: boolean;
}

export default function CommonImage({
  src,
  alt,
  type,
  className = "",
  priority = false,
  unoptimized = false,
}: CommonImageProps) {
  // defaults
  let width = 400;
  let height = 300;
  let sizes = "100vw";
  let quality = 60;
  let loading: "lazy" | "eager" = "lazy";

  switch (type) {
    case "hero":
      width = 1440;
      height = 800;
      sizes =
        "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1440px";
      quality = 70;
      loading = "eager";
      break;

    case "card":
      width = 420;
      height = 385;
      sizes =
        "(max-width: 640px) 90vw, (max-width: 1024px) 33vw, 420px";
      quality = 60;
      break;

    case "avatar":
      width = 420;
      height = 470;
      sizes =
        "(max-width: 640px) 90vw, 420px";
      quality = 65;
      break;

    case "icon":
      width = 160;
      height = 160;
      sizes = "160px";
      quality = 55;
      break;
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      quality={quality}
      loading={priority ? "eager" : loading}
      priority={priority}
      fetchPriority={priority ? "high" : "auto"}
      unoptimized={unoptimized}
      className={className}
    />
  );
}
