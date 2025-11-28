"use client";
import Heading from "@/components/common/Heading";
import Paragraph from "@/components/common/Paragraph";
import Section from "@/components/common/Section";
import React, { useRef } from "react";
import { useSplitTextHeadingAnimation } from "@/hooks/useSplitTextHeadingAnimation";
import Link from "next/link";
import ParagraphList from "@/components/common/ParagraphList";

const TermsAndConditions = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useSplitTextHeadingAnimation({
    trigger: sectionRef,
    first: ".institute-name",
    second: ".privacy-policy",
  });
  return (
    <Section ref={sectionRef} className="placement-info space-y-6 py-12">
      <section>
        <Paragraph
          size="base"
          className="institute-name text-dark-custom uppercase text-center"
        >
          Sri Maniya Institute of Hotel Management
        </Paragraph>
        <Heading
          level={4}
          className="my-2 text-blue-custom text-center privacy-policy uppercase"
        >
          Terms and Conditions
        </Heading>
        <div className="flex justify-center my-6">
          <div className="w-20 h-1 bg-yellow-custom flex items-center"></div>
        </div>
        <div>
          <Paragraph size="lg" className="text-dark-custom ">
            <strong>Last Updated: </strong>04/11/2025
          </Paragraph>
          <Paragraph size="lg" className="text-dark-custom my-4">
            Welcome to{" "}
            <strong>Sri Maniya Institute of Hospitality Management</strong>{" "}
            (“we,” “our,” or “us”). By accessing or using our website{" "}
            <Link
              href="https://www.srimaniyainstitute.in"
              className="text-blue-custom underline font-bold"
            >
              www.srimaniyainstitute.in
            </Link>{" "}
            (the “Site”), you agree to comply with and be bound by these Terms
            and Conditions. If you do not agree, please refrain from using our
            Site.
          </Paragraph>
        </div>

        <div className="my-8">
          <Paragraph
            size="xl"
            className="my-4 text-blue-custom  uppercase font-bold"
          >
            General Information
          </Paragraph>
          <Paragraph size="lg" className="text-dark-custom">
            This website provides information mainly for general informational and promotional purposes about academic programs, courses, and institutional activities. Although accuracy is a priority, there may occasionally be errors or outdated information, and completeness of all details is not guaranteed.
          </Paragraph>
        </div>
        <div className="my-8">
          <Paragraph
            size="xl"
            className="my-4 text-blue-custom  uppercase font-bold"
          >
            Courses, Fees, and Content
          </Paragraph>
          <Paragraph size="lg" className="text-dark-custom">
            All course structures, fees, and admission criteria are subject to change at any time without prior notice. The Institute may modify, discontinue, or replace courses, faculty members, or facilities at its discretion.
          </Paragraph>
        </div>
        <div className="my-8">
          <Paragraph
            size="xl"
            className="my-4 text-blue-custom  uppercase font-bold"
          >
            Placement and Salary Disclaimer
          </Paragraph>
          <Paragraph size="lg" className="text-dark-custom">
            Any placement statistics, job offers, or salary package information shared through the website or promotional materials are illustrative only. These figures do not guarantee outcomes, placements, or specific salaries for any student. Placement success depends on individual merit, employer needs, and prevailing market conditions.
          </Paragraph>
        </div>
        <div className="my-8">
          <Paragraph
            size="xl"
            className="my-4 text-blue-custom  uppercase font-bold"
          >
            Use of Website
          </Paragraph>
          <Paragraph size="lg" className="text-dark-custom">
            Users are expected to use the website lawfully and must not attempt to disrupt or hack the site. Any unauthorized use can result in website access suspension or legal action.
          </Paragraph>
        </div>
        <div className="my-8">
          <Paragraph
            size="xl"
            className="my-4 text-blue-custom  uppercase font-bold"
          >
            Intellectual Property
          </Paragraph>
          <Paragraph size="lg" className="text-dark-custom">
            All content featured such as text, images, videos, logos, and graphics—is owned by Sri Maniya Institute of Hotel Management unless otherwise specified. Copying, modifying, or distributing content without permission is strictly forbidden.
          </Paragraph>
        </div>
        <div className="my-8">
          <Paragraph
            size="xl"
            className="my-4 text-blue-custom  uppercase font-bold"
          >
            Third-Party Links
          </Paragraph>
          <Paragraph size="lg" className="text-dark-custom">
            Links to external websites are provided solely for convenience and do not constitute endorsement. The Institute does not take responsibility for content, privacy, or accuracy of third-party sites.
          </Paragraph>
        </div>
        <div className="my-8">
          <Paragraph
            size="xl"
            className="my-4 text-blue-custom  uppercase font-bold"
          >
            Limitation of Liability
          </Paragraph>
          <Paragraph size="lg" className="text-dark-custom">
            The Institute cannot be held liable for any direct or indirect damages from:
          </Paragraph>
          <ParagraphList size="lg" className="text-dark-custom ml-8">
            <li>Use or inability to use the website.</li>
            <li>Reliance on site-provided information.</li>
            <li>Any errors, inaccuracies, or omissions on the site.</li>
          </ParagraphList>
        </div>
        <div className="my-8">
          <Paragraph
            size="xl"
            className="my-4 text-blue-custom  uppercase font-bold"
          >
            Privacy
          </Paragraph>
          <Paragraph size="lg" className="text-dark-custom">
            Use of the website is also covered by the Institute’s Privacy Policy, which details the handling of any personal information collected through the site.
          </Paragraph>
        </div>
        <div className="my-8">
          <Paragraph
            size="xl"
            className="my-4 text-blue-custom  uppercase font-bold"
          >
            Updates to Terms
          </Paragraph>
          <Paragraph size="lg" className="text-dark-custom">
            The Institute reserves the right to update or revise these Terms and Conditions without prior notice. Continued use of the website implies your acceptance of any revised terms.
          </Paragraph>
        </div>
        <div className="my-8">
          <Paragraph
            size="xl"
            className="my-4 text-blue-custom  uppercase font-bold"
          >
            Contact Us
          </Paragraph>
          <Paragraph size="lg" className="text-dark-custom">
            For any concerns or questions regarding these Terms and Conditions:
            <br />
            <strong>Sri Maniya Institute of Hospitality Management</strong>
            <br />
            +91 89038 64444
            <br />
            <Link
              href="https://www.srimaniyainstitute.in"
              className="text-blue-custom underline font-bold"
            >
              www.srimaniyainstitute.in
            </Link>
            <br />
            <Link
              href="mailto:info@srimaniyainstitute.in"
              className="text-blue-custom underline font-bold"
            >
              info@srimaniyainstitute.in
            </Link>
          </Paragraph>
        </div>
        <div className="my-8">
          <Paragraph size="lg" className="text-dark-custom">
            All users are advised to review these Terms regularly to stay informed of updates and changes.
          </Paragraph>
        </div>
      </section>
    </Section>
  );
};

export default TermsAndConditions;
