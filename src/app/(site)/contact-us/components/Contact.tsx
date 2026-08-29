import { Phone, Mail, MapPin } from "@/components/icons/Icons";
import LeftSpaceGridSection from "@/components/common/LeftSpaceGridSection";
import HeadingAnimator from "@/components/common/HeadingAnimator";
import React from "react";
import { SiteInfo } from "@/types";

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
        className="font-normal wrap-break-word hover:underline text-sm sm:text-base block"
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
        className="font-normal wrap-break-word text-sm sm:text-base block"
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
        className="font-normal wrap-break-word text-sm sm:text-base block"
        aria-label={`Address ${idx + 1}`}
        dangerouslySetInnerHTML={{ __html: line }}
      />
    );
  }
  return (
    <div key={idx} className="font-normal wrap-break-word text-sm sm:text-base">
      {line}
    </div>
  );
};

const ContactCard = ({ icon, title, lines, className }: ContactCardProps) => {
  const safeLines = Array.isArray(lines)
    ? lines
    : typeof lines === "string" && lines
      ? [lines]
      : [];
  let iconHref: string | undefined;
  if (title === "Phone" && safeLines[0])
    iconHref = `tel:${safeLines[0].replace(/\s+/g, "")}`;
  else if (title === "Email" && safeLines[0]) iconHref = `mailto:${safeLines[0]}`;
  else if (title === "Address" && safeLines[0])
    iconHref = "https://maps.app.goo.gl/8WnBXaFHggJdfoFN8";

  return (
    <div
      className={`flex lg:flex-col bg-(--blue) text-(--white-custom) w-full lg:w-auto border-r border-(--grey-custom) ${className ?? ""} h-full`}
      data-section
    >
      <div className="p-6 lg:h-44 flex items-center">
        {iconHref ? (
          <a
            href={iconHref}
            hrefLang="en"
            target={title === "Address" ? "_blank" : undefined}
            rel={title === "Address" ? "noopener noreferrer" : undefined}
            aria-label={title}
            className="inline-flex"
          >
            {icon}
          </a>
        ) : (
          icon
        )}
      </div>
      <div className="p-3 sm:px-6 sm:py-5 lg:h-32 border-l lg:border-l-0 lg:border-t border-(--grey-custom) flex flex-col justify-start">
        <h3 className="font-semibold font-jakarta text-lg sm:text-xl lg:text-2xl mb-2">
          {title}
        </h3>
        {safeLines.length > 0 ? (
          safeLines.map((line, idx) => renderContactLine(title, line, idx))
        ) : (
          <div className="text-wrap font-normal text-base">—</div>
        )}
      </div>
    </div>
  );
};

const Contact = ({ siteInfo }: { siteInfo: SiteInfo | null }) => {
  const contactCards: ContactCardProps[] = [
    {
      icon: <Phone className="w-8 h-8" aria-label="Phone" />,
      title: "Phone",
      lines: [siteInfo?.phone_primary || "", siteInfo?.phone_secondary || ""],
      className: "w-full lg:w-[28%] xl:w-[30%]",
    },
    {
      icon: <Mail className="w-8 h-8" aria-label="Email" />,
      title: "Email",
      lines: [siteInfo?.email_primary || "", siteInfo?.email_secondary || ""],
      className: "w-full lg:w-[28%] xl:w-[30%]",
    },
    {
      icon: <MapPin className="w-8 h-8" aria-label="Address" />,
      title: "Address",
      lines: siteInfo?.address
        ? Array.isArray(siteInfo.address)
          ? siteInfo.address
          : [siteInfo.address]
        : [],
      className: "w-full lg:w-[35%] xl:w-[30%]",
    },
  ];

  return (
    <HeadingAnimator first=".contact-us-text" second=".contact-us-heading" delay={0.3}>
      <LeftSpaceGridSection className="pt-10 sm:pt-20 pb-10">
        <div className="mb-10">
          <h1 className="text-(--blue) font-jakarta text-base lg:text-lg font-bold contact-us-text">
            Sri Maniya Institute Contact
          </h1>
          <h2 className="text-(--blue) font-jakarta text-3xl sm:text-4xl lg:text-5xl font-bold uppercase contact-us-heading leading-tight">
            Your Gateway to Global
            <br /> Hospitality Careers.
          </h2>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-stretch lg:justify-end gap-4 lg:gap-0 w-full pr-0 sm:pr-8">
          {contactCards.map((card) => (
            <ContactCard key={card.title} {...card} />
          ))}
        </div>
      </LeftSpaceGridSection>
    </HeadingAnimator>
  );
};

export default Contact;
