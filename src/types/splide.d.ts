declare module "@splidejs/react-splide" {
  import * as React from "react";

  interface SplideProps {
    options?: Record<string, unknown>;
    extensions?: Record<string, unknown>;
    className?: string;
    children?: React.ReactNode;
  }

  export const Splide: React.FC<SplideProps>;
  export const SplideSlide: React.FC<{
    className?: string;
    children?: React.ReactNode;
  }>;

  export const AutoScroll: unknown;
}
