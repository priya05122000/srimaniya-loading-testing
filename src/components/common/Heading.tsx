import React from "react";
import type { JSX } from "react";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel;
  children: React.ReactNode;
  className?: string;
  size?: "default" | "xl";
  "data-aos"?: string;
  "data-aos-duration"?: string | number;
}

const headingStyles: Record<HeadingLevel, string> = {
  1: "text-5xl sm:text-6xl lg:text-7xl font-bold",
  2: "text-5xl sm:text-6xl lg:text-7xl font-bold",
  3: "text-4xl sm:text-5xl lg:text-6xl font-bold",
  4: "text-3xl sm:text-4xl lg:text-5xl font-bold",
  5: "text-2xl sm:text-3xl lg:text-4xl font-bold",
  6: "text-xl sm:text-2xl lg:text-3xl font-bold",
};

const headingSizeVariants: Record<"default" | "xl", string> = {
  default: "text-5xl sm:text-6xl lg:text-7xl",
  xl: "text-5xl sm:text-6xl lg:text-7xl xl:text-[84px]",
};

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      level = 1,
      children,
      className = "",
      size = "default",
      "data-aos": aos,
      "data-aos-duration": duration,
      ...rest
    },
    ref
  ) => {
    const Tag = `h${level}` as keyof JSX.IntrinsicElements;

    let baseClass = headingStyles[level];
    // Only override for level 1 and if size is not default
    if (level === 1 && size !== "default") {
      baseClass = headingSizeVariants[size];
    }

    const props: React.HTMLAttributes<HTMLHeadingElement> = {
      className: `${baseClass} font-bold ${className}`,
      ...rest,
    };
    if (aos) {
      (props as React.HTMLAttributes<HTMLHeadingElement> & { [key: string]: unknown })["data-aos"] = aos;
      (props as React.HTMLAttributes<HTMLHeadingElement> & { [key: string]: unknown })["data-aos-duration"] = duration ?? 2000;
    }
    return React.createElement(Tag, { ...props, ref }, children);
  }
);

Heading.displayName = "Heading";

export default Heading;