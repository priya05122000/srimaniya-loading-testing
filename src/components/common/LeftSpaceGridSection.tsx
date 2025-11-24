import React from "react";

interface LeftSpaceGridSectionProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
}

const LeftSpaceGridSection = React.forwardRef<HTMLElement, LeftSpaceGridSectionProps>(
    ({ children, className = "", id }, ref) => {
        return (
            <section
                ref={ref}
                className={`relative pr-6 pl-6 sm:pr-0 sm:pl-4 lg:pl-8 lg:pr-0 xl:pl-0 xl:pr-0  ${className}`}
                id={id}
            >
                <div
                    className="
          grid
          grid-cols-[1fr_minmax(auto,theme(maxWidth.full))_1fr]
          sm:grid-cols-[1fr_minmax(auto,var(--container-2xl))_1fr]
          md:grid-cols-[1fr_minmax(auto,var(--container-3xl))_1fr]
          lg:grid-cols-[1fr_minmax(auto,var(--container-5xl))_1fr]
          xl:grid-cols-[1fr_minmax(auto,var(--container-7xl))_1fr]
          mx-auto px-0 md:pl-4 md:pr-0 lg:pr-0 lg:pl-8 xl:pr-0 xl:pl-0">
                    <div className="col-span-2 col-start-2">
                        {children}
                    </div>
                </div>
            </section>
        );
    }
);

LeftSpaceGridSection.displayName = "LeftSpaceGridSection";

export default LeftSpaceGridSection;
