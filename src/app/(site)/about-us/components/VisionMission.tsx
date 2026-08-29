import React, { FC } from "react";
import Section from "@/components/common/Section";
import { SiteInfo } from "@/types";

// Reusable Section Block for Vision/Mission
interface InfoBlockProps {
  title: string;
  imageUrl: string;
  htmlContent: string;
  headingOrderClass?: string;
  contentOrderClass?: string;
}

const InfoBlock: FC<InfoBlockProps> = ({
  title,
  imageUrl,
  htmlContent,
  headingOrderClass = "",
  contentOrderClass = "",
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
    <h3
      className={`text-(--white-custom) text-3xl font-jakarta sm:text-4xl lg:text-5xl font-bold px-4 py-3 w-full h-fit bg-cover ${headingOrderClass}`.trim()}
      style={{ backgroundImage: `url('${imageUrl}')` }}
    >
      <span>{title}</span>
    </h3>
    <div
      className={`text-(--dark) text-justify font-medium leading-relaxed text-base lg:text-lg ${contentOrderClass}`.trim()}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  </div>
);

const VisionMission: FC<{ siteInfo: SiteInfo | null }> = ({ siteInfo }) => {
  return (
    <div className="bg-[linear-gradient(rgba(200,200,200,0.2)_0.1em,transparent_0.1em),linear-gradient(90deg,rgba(200,200,200,0.2)_0.1em,transparent_0.1em)] bg-size-[10em_5em]">
      <Section>
        <div className="py-10 sm:py-20 space-y-10 lg:space-y-20 lg:px-20">
          <h2 className="sr-only">Our Vision and Mission</h2>

          <InfoBlock
            title="01  Vision"
            imageUrl="/about-us/vision.webp"
            htmlContent={siteInfo?.vision || ""}
            headingOrderClass="text-start sm:text-end sm:order-2 order-1"
            contentOrderClass="sm:order-1 order-2"
          />
          <InfoBlock
            title="02  Mission"
            imageUrl="/about-us/mission.webp"
            htmlContent={siteInfo?.mission || ""}
          />
        </div>
      </Section>
    </div>
  );
};

export default VisionMission;
