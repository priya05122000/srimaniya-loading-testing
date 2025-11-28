"use client";

import React, { useEffect, useState, FC } from "react";
import Heading from "@/components/common/Heading";
import Section from "@/components/common/Section";
import { getAllSiteInfo } from "@/services/siteInfoService";
import { SiteInfo } from "@/types";
import { useGlobalLoader } from "@/providers/GlobalLoaderProvider";

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
    <Heading
      level={4}
      className={`text-(--white-custom) px-4 py-3 w-full h-fit bg-cover ${headingOrderClass}`.trim()}
      style={{ backgroundImage: `url('${imageUrl}')` }}
    >
      <span>{title}</span>
    </Heading>
    <div
      className={`text-(--dark) text-justify font-medium leading-relaxed text-base lg:text-lg ${contentOrderClass}`.trim()}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  </div>
);

const useSiteInfo = () => {
  const [siteInfo, setSiteInfo] = useState<SiteInfo | null>(null);
  const { setLoading } = useGlobalLoader();

  useEffect(() => {
    const fetchSiteInfo = async () => {
      setLoading(true);
      try {
        const result = await getAllSiteInfo();
        const data = result?.data;
        if (Array.isArray(data) && data.length > 0) {
          setSiteInfo(data[0]);
        }
      } catch (error: unknown) {
        if (error && typeof error === "object" && "message" in error) {
          console.error(
            "Error fetching site info:",
            (error as { message?: string }).message || error
          );
        } else {
          console.error("Error fetching site info:", error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchSiteInfo();
  }, [setLoading]);

  return siteInfo;
};

const VisionMission: FC = () => {
  const siteInfo = useSiteInfo();

  return (
    <div className="bg-[linear-gradient(rgba(200,200,200,0.2)_0.1em,transparent_0.1em),linear-gradient(90deg,rgba(200,200,200,0.2)_0.1em,transparent_0.1em)] bg-size-[10em_5em]">
      <Section>
        <div className="py-10 sm:py-20 space-y-10 lg:space-y-20 lg:px-20">
          <InfoBlock
            title="01  Vision"
            imageUrl="/about-us/vision.png"
            htmlContent={siteInfo?.vision || ""}
            headingOrderClass="text-start sm:text-end sm:order-2 order-1"
            contentOrderClass="sm:order-1 order-2"
          />
          <InfoBlock
            title="02  Mission"
            imageUrl="/about-us/mission.png"
            htmlContent={siteInfo?.mission || ""}
          />
        </div>
      </Section>
    </div>

  );
};

export default VisionMission;
