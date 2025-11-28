"use client";
import Heading from "@/components/common/Heading";
import Paragraph from "@/components/common/Paragraph";
import Section from "@/components/common/Section";
import React, { useRef } from "react";
import ParagraphList from "@/components/common/ParagraphList";
import { useSplitTextHeadingAnimation } from '@/hooks/useSplitTextHeadingAnimation';

const PlacementInfo: React.FC = () => {
  const placementRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useSplitTextHeadingAnimation({
    trigger: placementRef,
    first: headingRef,
    delay: 0.3,
    enabled: true,
  });

  return (
    <div ref={placementRef}>
      <Section

        className="placement-info py-10  sm:py-20"
      >
        <div className="lg:px-20">
          <section>
            <Heading
              ref={headingRef}
              level={4}
              className="mb-10 text-(--blue) text-center hotel-management-title uppercase leading-tight"
            >
              Placements at srimaniya institute
            </Heading>

            <Paragraph size="lg" className="text-(--dark) leading-relaxed">
              The Institute boasts strong connections with global hospitality brands, offering 100% placement assistance, career guidance, interview preparation, and internships. Students gain practical experience through part-time placements during their studies, preparing them for successful careers worldwide. This focus on career readiness makes Sri Maniya a top destination for students seeking excellent Sri Maniya Institute placement support and job opportunities.
            </Paragraph>
          </section>
          <section>
            <Paragraph
              size="xl"
              className="text-(--blue) font-semibold my-4 uppercase"
            >
              Global Placements
            </Paragraph>
            <Paragraph size="lg" className="text-(--dark) leading-relaxed">
              We partner with leading international hospitality brands and hotel chains to offer our students outstanding global placement opportunities. Our alumni hold positions at prestigious luxury hotels and prominent resorts in key destinations around the world, reflecting the effectiveness of our hotel management placement support in launching successful international careers.
            </Paragraph>
          </section>
          <section>
            <Paragraph
              size="xl"
              className="text-(--blue) font-semibold my-4 uppercase"
            >
              Part-Time Placements
            </Paragraph>
            <Paragraph size="lg" className="text-(--dark) leading-relaxed">
              We arrange part-time work opportunities for our students throughout their studies, allowing them to gain practical experience and develop professional skills that enhance their academic learning and future career prospects.
            </Paragraph>
          </section>
          <section>
            <Paragraph
              size="xl"
              className="text-(--blue) uppercase font-semibold my-4"
            >
              Our Commitment
            </Paragraph>
            <ParagraphList size="lg" className="text-(--dark) leading-relaxed">
              <li>100% placement assistance</li>
              <li>Tie-ups with global hospitality leaders</li>
              <li>Career guidance and interview training</li>
              <li>Internships and part-time work opportunities during courses</li>
            </ParagraphList>
          </section>
        </div>
      </Section>
    </div>

  );
};

export default PlacementInfo;
