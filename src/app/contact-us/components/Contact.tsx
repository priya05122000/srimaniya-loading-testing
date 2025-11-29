"use client";
import Heading from "@/components/common/Heading";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import LeftSpaceGridSection from "@/components/common/LeftSpaceGridSection";
import Paragraph from "@/components/common/Paragraph";

import React, { useRef, useState, useEffect } from "react";
import { useSplitTextHeadingAnimation } from "@/hooks/useSplitTextHeadingAnimation";
import { SiteInfo } from "@/types";
import { getAllSiteInfo } from "@/services/siteInfoService";
import { useGlobalLoader } from "@/providers/GlobalLoaderProvider";

interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  lines: string[];
  className?: string;
}

// Reusable utility for phone formatting
const formatIndianPhone = (phone: string) => {
  const cleaned = phone.replace(/\s+/g, "");
  const match = cleaned.match(/^(\+91)(\d{5})(\d{5})$/);
  return match ? `${match[1]} ${match[2]} ${match[3]}` : phone;
};

// Reusable line renderer
const renderContactLine = (title: string, line: string, idx: number) => {
  if (!line) return null;
  if (title === "Email") {
    return (
      <a
        key={idx}
        href={`mailto:${line}`}
        className="font-normal wrap-break-word hover:underline text-sm sm:text-base"
        aria-label={`Email ${idx + 1}`}
      >
        {line}
      </a>
    );
  }
  if (title === "Phone") {
    const tel = line.replace(/\s+/g, "");
    return (
      <a
        key={idx}
        href={`tel:${tel}`}
        className="font-normal wrap-break-word  text-sm sm:text-base"
        aria-label={`Phone ${idx + 1}`}
      >
        {formatIndianPhone(line)}
      </a>
    );
  }
  if (title === "Address") {
    return (
      <a
        key={idx}
        href="https://maps.app.goo.gl/8WnBXaFHggJdfoFN8"
        target="_blank"
        rel="noopener noreferrer"
        className="font-normal wrap-break-word  text-sm sm:text-base"
        aria-label={`Address ${idx + 1}`}
        dangerouslySetInnerHTML={{ __html: line }}
      />
    );
  }
  return (
    <div key={idx} className="font-normal wrap-break-word text-sm sm:text-base">{line}</div>
  );
};

const ContactCard = React.memo(({ icon, title, lines, className }: ContactCardProps) => {
  const safeLines = Array.isArray(lines) ? lines : typeof lines === "string" && lines ? [lines] : [];
  let iconHref: string | undefined;
  if (title === "Phone" && safeLines[0]) iconHref = `tel:${safeLines[0].replace(/\s+/g, "")}`;
  else if (title === "Email" && safeLines[0]) iconHref = `mailto:${safeLines[0]}`;
  else if (title === "Address" && safeLines[0]) iconHref = "https://maps.app.goo.gl/8WnBXaFHggJdfoFN8";

  return (
    <div className={`flex lg:flex-col bg-(--blue) text-(--white-custom) w-full lg:w-auto border-r border-(--grey-custom) ${className ?? ""} h-full`} data-section>
      <div className="p-6 lg:h-44 flex items-center">
        {iconHref ? (
          <a href={iconHref} target={title === "Address" ? "_blank" : undefined} rel={title === "Address" ? "noopener noreferrer" : undefined} aria-label={title} className="inline-flex">{icon}</a>
        ) : icon}
      </div>
      <div className="p-3 sm:px-6 sm:py-5 lg:h-32 border-l lg:border-l-0 lg:border-t border-(--grey-custom) flex flex-col justify-start">
        <Paragraph size="xl" className="font-semibold mb-2">{title}</Paragraph>
        {safeLines.length > 0 ? safeLines.map((line, idx) => renderContactLine(title, line, idx)) : <div className="text-wrap font-normal  text-base">—</div>}
        {/* <div className="block sm:hidden">
          {safeLines.length > 0 ? safeLines.slice(0, 1).map((line, idx) => renderContactLine(title, line, idx)) : <div className="font-normal  text-sm">—</div>}
        </div> */}
      </div>
    </div>
  );
});
ContactCard.displayName = "ContactCard";

const Contact = () => {
  const [siteInfo, setSiteInfo] = useState<SiteInfo | null>(null);
  const { setLoading } = useGlobalLoader();
  const contactRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);

  useSplitTextHeadingAnimation({
    trigger: contactRef,
    first: paragraphRef,
    second: headingRef,
    delay: 0.3,
    enabled: !!siteInfo,
  });

  useEffect(() => {
    const fetchSiteInfo = async () => {
      setLoading(true);
      try {
        const result = await getAllSiteInfo();
        const data = result?.data;
        if (Array.isArray(data) && data.length > 0) setSiteInfo(data[0]);
      } catch (error: unknown) {
        if (error && typeof error === "object" && "message" in error) {
          console.error("Error fetching site info:", (error as { message?: string }).message || error);
        } else {
          console.error("Error fetching site info:", error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchSiteInfo();
  }, [setLoading]);


  const contactCards: ContactCardProps[] = [
    { icon: <FiPhone size={34} />, title: "Phone", lines: [siteInfo?.phone_primary || "", siteInfo?.phone_secondary || ""], className: "w-full lg:w-[28%] xl:w-[30%]" },
    { icon: <FiMail size={34} />, title: "Email", lines: [siteInfo?.email_primary || "", siteInfo?.email_secondary || ""], className: "w-full lg:w-[28%] xl:w-[30%]" },
    { icon: <FiMapPin size={34} />, title: "Address", lines: siteInfo?.address ? Array.isArray(siteInfo.address) ? siteInfo.address : [siteInfo.address] : [], className: "w-full lg:w-[35%] xl:w-[30%]" },
  ];

  return (
    <div ref={contactRef}>
      <LeftSpaceGridSection className="pt-10 sm:pt-20 pb-10" >
        <div className="mb-10">
          <Paragraph ref={paragraphRef} size="lg" className="text-(--blue) font-bold contact-us-text">Sri Maniya Institute Contact</Paragraph>
          <Heading ref={headingRef} level={4} className="text-(--blue) uppercase contact-us-heading leading-tight">Your Gateway to Global<br /> Hospitality Careers.</Heading>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-stretch lg:justify-end gap-4 lg:gap-0 w-full pr-0 sm:pr-8">
          {contactCards.map((card) => <ContactCard key={card.title} {...card} />)}
        </div>
      </LeftSpaceGridSection>
    </div >
  );
};

Contact.displayName = "Contact";
export default Contact;
