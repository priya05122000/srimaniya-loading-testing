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
          {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            <div>
              <Paragraph
                ref={paragraphRef}
                size="lg"
                className="text-(--blue) font-bold facilities-title-main"
              >
                Sri Maniya Institute
              </Paragraph>
              <h2
                ref={headingRef}

                className="text-(--blue) text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight uppercase facilities-title-sub"
              >
                Scholarship
              </h2>
            </div>
            <div>
              <Paragraph size="base" className="text-(--dark) leading-relaxed text-justify">
                Sri Maniya Institute of Hotel Management offers hotel management scholarship aimed at supporting and motivating deserving students. These include merit-based scholarships, community-based scholarships, and scholarships specific to the college. The institute is committed to recognizing academic excellence and helping reduce financial barriers, ensuring that talented individuals have the opportunity to pursue quality hospitality education.
              </Paragraph>
            </div>
          </div> */}

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-16">

            <div>
              {/* <Paragraph
                size="lg"
                className="text-(--blue) font-bold facilities-title-main"
              >
                Sri Maniya Institute
              </Paragraph> */}

              <h2 className=" leading-relaxed facilities-title-sub  text-(--blue) font-semibold mb-4 uppercase  text-base lg:text-lg">
                Hotel Management Scholarship at Sri Maniya Institute
              </h2>

              <div>
                <Paragraph size="base" className="text-(--dark) leading-relaxed text-justify">
                  Sri Maniya Institute of Hotel Management offers a hotel management scholarship in Tamil Nadu aimed at supporting and motivating deserving students. These include merit based scholarships, community based scholarships, and scholarships specific to the college.
                </Paragraph>

                <Paragraph size="base" className="text-(--dark) leading-relaxed text-justify mt-4">
                  The institute is committed to recognizing academic excellence and reducing financial barriers. This helps talented students get the opportunity to study quality hospitality courses and build a strong future.
                </Paragraph>
              </div>
            </div>
            <div>
              {/* <Paragraph
                size="lg"
                className="text-(--blue) font-bold facilities-title-main"
              >
                Why Choose
              </Paragraph> */}

              <h2 className="text-(--blue) leading-relaxed text-base lg:text-lg mb-4 font-bold  uppercase facilities-title-sub">
                Why Choose Our Scholarship
              </h2>

              <div>
                <Paragraph size="base" className="text-(--dark) leading-relaxed text-justify">
                  At Sri Maniya Institute, the support goes beyond fees. Students get strong training, real time practice, and career guidance. This makes learning more practical and useful.
                </Paragraph>

                <Paragraph size="base" className="text-(--dark) leading-relaxed text-justify mt-4">
                  This hotel management scholarship in Tamil Nadu helps reduce financial stress and gives more students access to quality education. It also opens doors to better career opportunities in hospitality.
                </Paragraph>
              </div>

            </div>


          </div>







          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 mt-16">
            <div>
              <Image
                src={SCHOLAR_IMAGE}
                alt="Student receiving scholarship at Sri Maniya Institute of Hotel Management"
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
                <ParagraphList size="base" className="text-(--dark)">
                  {SCHOLARSHIP_BENEFITS.map((item, idx) => (
                    <li key={idx} className="mb-2">
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

          <div className="mt-10">
            {/* <Paragraph
              size="lg"
              className="text-(--blue) font-bold facilities-title-main"
            >
              Apply Now
            </Paragraph> */}

            <h2 className="text-(--blue) text-base lg:text-lg mb-4 font-bold leading-relaxed uppercase facilities-title-sub">
              Apply for Sri Maniya Institute Scholarship
            </h2>

            <div>
              <Paragraph size="base" className="text-(--dark) leading-relaxed text-justify">
                If you are planning to study hotel management, apply now for the Sri Maniya institute scholarship. This is your chance to start your journey with the right support.
              </Paragraph>

              <Paragraph size="base" className="text-(--dark) leading-relaxed text-justify">
                Contact us today to know more about the scholarship for hotel management students and secure your future in hospitality.
              </Paragraph>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
};

export default ScholarContent;
