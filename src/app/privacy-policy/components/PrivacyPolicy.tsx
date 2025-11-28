"use client";
import Heading from "@/components/common/Heading";
import Paragraph from "@/components/common/Paragraph";
import Section from "@/components/common/Section";
import React, { useRef } from "react";
import { useSplitTextHeadingAnimation } from "@/hooks/useSplitTextHeadingAnimation";
import Link from "next/link";

const PrivacyPolicy = () => {
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
          Privacy Policy
        </Heading>
        <div className="flex justify-center my-6">
          <div className="w-20 h-1 bg-yellow-custom flex items-center"></div>
        </div>
        <Paragraph size="lg" className="text-dark-custom">
          Sri Maniya Institute of Hotel Management respects your privacy and is
          committed to protecting your personal information. This Privacy Policy
          explains how we collect, use, and safeguard the information you
          provide when using our website. By visiting or using our website, you
          agree to the terms outlined in this policy. We may collect personal
          information when you register for courses, request brochures,
          subscribe to newsletters, complete forms, or participate in surveys.
          This information may include your name, email address, phone number,
          and other details necessary to provide the requested services or
          information.
          <br />
          <br />
          We do not sell or share your personal information with any third party
          for commercial purposes. Your data is used solely to fulfill your
          requests and deliver the services you require. When you visit our
          website, we may automatically collect certain technical information,
          such as your IP address, browser type, operating system, date and time
          of access, and the referring page. This information is collected in
          aggregate form to help us improve our website and user experience and
          does not personally identify you.
          <br />
          <br />
          Our website may use cookies, which are small files stored on your
          device, to enhance your browsing experience, remember your
          preferences, and maintain login sessions. You can disable cookies in
          your browser settings, but some features of the website may not
          function properly if cookies are turned off. We may also use
          third-party analytics tools, such as Google Analytics and Meta Pixel,
          to understand website traffic and user behavior. These tools may
          collect data such as your IP address, browser type, and on-site
          activities through cookies or similar technologies. This information
          helps us analyze visitor interactions, improve our website
          performance, and enhance our marketing efforts.
          <br />
          <br />
          By submitting any online forms, you consent to the collection and use
          of your information for the purpose of responding to your requests or
          providing the services you have applied for. We store your information
          securely and use it only for the purposes stated in this policy. Our
          website may include links to external websites or social media
          platforms such as Facebook, Instagram, LinkedIn, or YouTube. Please
          note that we are not responsible for the privacy practices or content
          of these third-party sites. Your interactions with them are governed
          by their respective privacy policies.
          <br />
          <br />
          We take appropriate measures to protect your personal information from
          unauthorized access, misuse, or loss. However, please note that no
          method of data transmission over the internet is entirely secure, and
          you share information at your own risk. We may update this Privacy
          Policy periodically. Any changes will be posted on this page, and we
          encourage you to review it regularly to stay informed about how your
          information is protected.
          <br />
          <br />
          If you have any questions or concerns regarding this Privacy Policy or
          the handling of your personal information,
          <br />
          please contact us at:
          <br />
          <Link
            href="https://www.srimaniyainstitute.in/"
            className="font-bold text-blue-custom underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sri Maniya Institute of Hotel Management
          </Link>
          <br />
          <br />
          Email:{" "}
          <Link
            href="mailto:info@srimaniyainstitute.in"
            className="text-blue-custom underline"
          >
            info@srimaniyainstitute.in
          </Link>
        </Paragraph>
      </section>
    </Section>
  );
};

export default PrivacyPolicy;
