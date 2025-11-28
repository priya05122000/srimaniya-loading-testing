"use client";
import React, { FC, ReactNode } from "react";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import Section from "@/components/common/Section";
import Paragraph from "@/components/common/Paragraph";
import ParagraphList from "@/components/common/ParagraphList";
import { ANIMATIONS } from "@/components/Animations";
import Link from "next/link";

type SidebarInfo = {
  label: string;
  value: ReactNode;
};

type ShareLink = {
  href: string;
  icon: ReactNode;
  label: string;
};

const SIDEBAR_DATA: SidebarInfo[] = [
  { label: "Posted by", value: "IzhTech" },
  { label: "Date", value: "3/2/2025" },
  { label: "Share", value: null }, // Placeholder for ShareSection
];

const SHARE_LINKS: ShareLink[] = [
  { href: "#", icon: <FaFacebook />, label: "Facebook" },
  { href: "#", icon: <FaLinkedin />, label: "Linkedin" },
];

// Reusable SidebarRow
const SidebarRow: FC<SidebarInfo> = React.memo(({ label, value }) => (
  <div className="grid grid-cols-[auto_1fr] gap-2 items-start">
    <div className="mt-2 hidden sm:block">
      <hr className="border border-(--grey-custom) w-15" />
    </div>
    <div>
      <Paragraph size="lg" className="text-(--grey-light-custom)">{label}</Paragraph>
      {typeof value === "string" ? (
        <Paragraph size="lg" className="font-bold text-(--dark)">{value}</Paragraph>
      ) : value}
    </div>
  </div>
));
SidebarRow.displayName = "SidebarRow";

// Reusable ShareSection
const ShareSection: FC = React.memo(() => (
  <div className="flex flex-col gap-2 mt-2">
    {SHARE_LINKS.map((link) => (
      <Link
        key={link.label}
        href={link.href}
        className="flex items-center gap-2 text-(--dark) font-bold text-sm md:text-base xl:text-lg transition"
      >
        {link.icon} {link.label}
      </Link>
    ))}
  </div>
));
ShareSection.displayName = "ShareSection";

const BLOG_PARAGRAPH = "Hotel management encompasses the strategic oversight of all operations.";

const BlogDetails: FC = () => {
  // Insert ShareSection into SIDEBAR_DATA
  const sidebarData: SidebarInfo[] = SIDEBAR_DATA.map((item) =>
    item.label === "Share" ? { ...item, value: <ShareSection /> } : item
  );

  return (
    <Section className="relative overflow-hidden">
      <div className="flex flex-col md:flex-row gap-10 py-10 sm:py-0">
        {/* Sidebar */}
        <aside className="w-full sm:w-[30%] lg:w-[25%] xl:w-[20%] space-y-8 sm:border-r border-(--grey-custom) gap-4 md:gap-15 lg:gap-8 sm:py-16 flex flex-row sm:flex-col justify-between sm:justify-start">
          {sidebarData.map((item) => (
            <SidebarRow key={item.label} label={item.label} value={item.value} />
          ))}
        </aside>
        {/* Main Content */}
        <main className="w-full sm:w-[70%] lg:w-[75%] xl:w-[80%] space-y-8 sm:py-16">
          <div>
            <Paragraph size="xl" className="font-bold text-(--dark) mb-3">Events & Blog</Paragraph>
            <Paragraph className="font-bold text-(--dark)">{BLOG_PARAGRAPH} <br />{BLOG_PARAGRAPH}</Paragraph>
            <Paragraph className="mt-3 text-(--dark)">{BLOG_PARAGRAPH}</Paragraph>
          </div>
          <div>
            <Paragraph size="xl" className="font-bold text-(--dark) mb-3">Events & Blog</Paragraph>
            <ParagraphList size="lg" className="space-y-2 text-(--dark)" {...ANIMATIONS.zoomIn}>
              {Array.from({ length: 4 }).map((_, i) => (
                <li key={i}>{BLOG_PARAGRAPH}</li>
              ))}
            </ParagraphList>
          </div>
          <div className="border-l-3 border-(--grey-custom) pl-4 w-full md:w-[90%] xl:w-[80%]">
            <Paragraph size="lg" className="text-(--dark) leading-relaxed">
              {BLOG_PARAGRAPH} Hotel management encompasses of all operations. Hotel management encompasses.
            </Paragraph>
          </div>
        </main>
      </div>
    </Section>
  );
};

export default BlogDetails;
