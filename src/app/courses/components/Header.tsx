import React, { FC } from "react";
import Paragraph from "@/components/common/Paragraph";

// Reusable constants for styling
const BG_IMAGE = "/courses/courses.webp";
const GRID_CLASSES = [
  "grid",
  "grid-cols-1",
  "sm:grid-cols-[1.5fr_1fr]",
  "lg:grid-cols-[2fr_1fr]",
  "xl:grid-cols-[3fr_1fr]",
  "h-full",
].join(" ");
const CONTENT_CLASSES = [
  "flex",
  "flex-col",
  "justify-evenly",
  "sm:justify-end",
  "text-end",
  "pl-6",
  "lg:pl-6",
  "pr-6",
  "lg:pr-8",
  "py-6",
  "lg:py-12",
  "overflow-hidden",
  "text-(--white-custom)",
  "h-[400px] sm:h-full",
  "bg-(--blue-overlay-strong)",
  "relative",
].join(" ");
const HEADING_CLASSES = "leading-tight animate-text uppercase text-3xl sm:text-4xl lg:text-5xl font-bold";
const PARAGRAPH_TEXT =
  "Discover our hotel management courses designed to provide industry-relevant knowledge and practical skills, forming a solid foundation for a successful career in hospitality.";

const Header: FC = () => (
  <div
    className="relative w-full h-100 md:h-87.5 lg:h-100 bg-cover bg-center"
    style={{ backgroundImage: `url('${BG_IMAGE}')` }}
    data-section
  >
    <div className={GRID_CLASSES}>
      <div className="sm:border-b lg:border-b-0 lg:border-r border-(--grey-custom)" />
      <div className={CONTENT_CLASSES} data-section>
        <div className="py-2 lg:py-4">
          <h1  className={HEADING_CLASSES}>
            {`Courses `}
            <br />
            {`and `}
            <br />
            {`Admission`}
          </h1>
        </div>
        <Paragraph size="base" className="leading-relaxed">
          {PARAGRAPH_TEXT}
        </Paragraph>
      </div>
    </div>
  </div>
);

export default Header;
