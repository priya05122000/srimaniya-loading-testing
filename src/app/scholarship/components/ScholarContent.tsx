"use client";
import Heading from "@/components/common/Heading";
import Paragraph from "@/components/common/Paragraph";
import ParagraphList from "@/components/common/ParagraphList";
import Section from "@/components/common/Section";
import { useSplitTextHeadingAnimation } from "@/hooks/useSplitTextHeadingAnimation";
import Image from "next/image";
import React, { useRef } from "react";

// Reusable constants
const SCHOLAR_IMAGE = "/scholarship/scholarship.webp";
const SCHOLAR_IMAGE_ALT = "Scholarship Banner";
const SCHOLAR_IMAGE_DIMENSIONS = { width: 600, height: 400 };
const SCHOLARSHIP_BENEFITS = [
  {
    title: "ST / SC STUDENTS",
    desc: "(10% in Term fees on course selected)",
  },
  {
    title: "FIRST GRADUATION",
    desc: "(10% in Term fees on course selected)",
  },
  {
    title: "MERIT",
    desc: "10% in Term fees on course selected\n(90% marks scored in SSLC for diploma)",
  },
  {
    title: "MERIT",
    desc: "10% in Term fees on course selected\n(90% marks scored in HSC for Degree)",
  },
  {
    title: "MERIT",
    desc: "10% in Term fees on course selected\n(90% marks scored in UG for Post Degree)",
  },
  {
    title: "Sports Quota",
    desc: "Students with records of excellence in sports under National/State/District level shall be considered.",
  },
];

const ScholarContent = () => {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);

  useSplitTextHeadingAnimation({
    trigger: contentRef,
    first: paragraphRef,
    second: headingRef,
    delay: 0.3,
    enabled: true,
  });

  return (
    <div ref={contentRef}>
      <div className="py-10 sm:py-20">
        <Section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            <div>
              <Paragraph
                ref={paragraphRef}
                size="lg"
                className="text-(--blue) font-bold facilities-title-main"
              >
                Sri Maniya Institute
              </Paragraph>
              <Heading
                ref={headingRef}
                level={4}
                className="text-(--blue) leading-tight uppercase facilities-title-sub"
              >
                Scholarship
              </Heading>
            </div>
            <div>
              <Paragraph size="lg" className="text-(--dark) leading-relaxed text-justify">
                Sri Maniya Institute of Hotel Management offers hotel management scholarship aimed at supporting and motivating deserving students. These include merit-based scholarships, community-based scholarships, and scholarships specific to the college. The institute is committed to recognizing academic excellence and helping reduce financial barriers, ensuring that talented individuals have the opportunity to pursue quality hospitality education.
              </Paragraph>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 mt-16">
            <div>
              <Image
                src={SCHOLAR_IMAGE}
                alt={SCHOLAR_IMAGE_ALT}
                width={SCHOLAR_IMAGE_DIMENSIONS.width}
                height={SCHOLAR_IMAGE_DIMENSIONS.height}
                style={{ objectFit: "cover" }}
                className="w-full h-full image-tag"
              />
            </div>
            <div className="flex-col justify-center flex ">
              <div className="inline-block">
                <Paragraph
                  size="lg"
                  className="text-(--white-custom) mb-4 bg-(--blue) uppercase font-bold p-2 inline-block"
                >
                  SANCTIONED DURING ADMISSION (PROVIDED IN TERM II)
                </Paragraph>
                <ParagraphList size="lg" className="text-(--dark)">
                  {SCHOLARSHIP_BENEFITS.map((item, idx) => (
                    <li key={idx}>
                      <strong>{item.title}</strong>
                      <br />
                      {item.desc.split("\n").map((line, i) => (
                        <React.Fragment key={i}>
                          {line}
                          <br />
                        </React.Fragment>
                      ))}
                    </li>
                  ))}
                </ParagraphList>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
};

export default ScholarContent;
