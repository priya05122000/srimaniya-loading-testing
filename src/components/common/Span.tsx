import React from "react";

interface SpanProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  className?: string;
  "data-aos"?: string;
  "data-aos-duration"?: string | number;
}

const Span: React.FC<SpanProps> = ({
  children,
  className = "",
  "data-aos": aos,
  "data-aos-duration": duration,
  ...rest
}) => {
  const props: React.HTMLAttributes<HTMLSpanElement> = {
    className: `text-sm font-inter ${className}`,
    ...rest,
  };
  if (aos) {
    (props as React.HTMLAttributes<HTMLSpanElement> & { [key: string]: unknown })["data-aos"] = aos;
    (props as React.HTMLAttributes<HTMLSpanElement> & { [key: string]: unknown })["data-aos-duration"] = duration ?? 2000;
  }
  return <span {...props}>{children}</span>;
};

export default Span;