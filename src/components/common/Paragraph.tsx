import React from "react";

type ParagraphSize = "xl" | "lg" | "base";

interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  className?: string;
  size?: ParagraphSize;
  "data-aos"?: string;
  "data-aos-duration"?: string | number;
}

const sizeClasses: Record<ParagraphSize, string> = {
  xl: "text-lg sm:text-xl lg:text-2xl",
  lg: "text-base lg:text-lg",
  base: "text-base",
};

const Paragraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
  (
    {
      children,
      className = "",
      size = "base",
      "data-aos": aos,
      "data-aos-duration": duration,
      ...rest
    },
    ref
  ) => {
    const props: React.HTMLAttributes<HTMLParagraphElement> = {
      className: `${sizeClasses[size]}  font-inter ${className}`,
      ...rest,
    };
    if (aos) {
      (props as React.HTMLAttributes<HTMLParagraphElement> & { [key: string]: unknown })["data-aos"] = aos;
      (props as React.HTMLAttributes<HTMLParagraphElement> & { [key: string]: unknown })["data-aos-duration"] = duration ?? 2000;
    }
    return <p ref={ref} {...props}>{children}</p>;
  }

);

Paragraph.displayName = "Paragraph";

export default Paragraph;