import Paragraph from "@/components/common/Paragraph";
import Section from "@/components/common/Section";
import React from "react";
import ParagraphList from "@/components/common/ParagraphList";
import HeadingAnimator from "@/components/common/HeadingAnimator";

const PlacementInfo: React.FC = () => {
  return (
    <HeadingAnimator first=".hotel-management-title" delay={0.3}>
      <Section

        className="placement-info py-10  sm:py-20"
      >
        <div className="lg:px-20">
          <section>
            <h1
              className="mb-10 font-jakarta text-3xl sm:text-4xl lg:text-5xl font-bold text-(--blue) text-start sm:text-center hotel-management-title uppercase leading-tight"
            >
              Placements at srimaniya institute
            </h1>

            <Paragraph size="base" className="text-(--dark) leading-relaxed">
              The Institute boasts strong connections with global hospitality brands, offering 100% placement assistance, career guidance, interview preparation, and internships. Students gain practical experience through part-time placements during their studies, preparing them for successful careers worldwide. This focus on career readiness makes Sri Maniya a top destination for students seeking excellent Sri Maniya Institute placement support and job opportunities.
            </Paragraph>
          </section>
          <h2 className="sr-only">Placement Information</h2>
          <section>
            <h3

              className="text-(--blue) font-jakarta font-semibold my-4 uppercase text-lg sm:text-xl lg:text-2xl"
            >
              Global Placements
            </h3>
            <Paragraph size="base" className="text-(--dark) leading-relaxed">
              We partner with leading international hospitality brands and hotel chains to offer our students outstanding global placement opportunities. Our alumni hold positions at prestigious luxury hotels and prominent resorts in key destinations around the world, reflecting the effectiveness of our hotel management placement support in launching successful international careers.
            </Paragraph>
          </section>
          <section>
            <h3

              className="text-(--blue) font-jakarta font-semibold my-4 uppercase text-lg sm:text-xl lg:text-2xl"
            >
              Part-Time Placements
            </h3>
            <Paragraph size="base" className="text-(--dark) leading-relaxed">
              We arrange part-time work opportunities for our students throughout their studies, allowing them to gain practical experience and develop professional skills that enhance their academic learning and future career prospects.
            </Paragraph>
          </section>
          <section>
            <h3

              className="text-(--blue) font-jakarta uppercase font-semibold my-4 text-lg sm:text-xl lg:text-2xl"
            >
              Our Commitment
            </h3>
            <ParagraphList size="base" className="text-(--dark) leading-relaxed">
              <li>100% placement assistance</li>
              <li>Tie-ups with global hospitality leaders</li>
              <li>Career guidance and interview training</li>
              <li>Internships and part-time work opportunities during courses</li>
            </ParagraphList>
          </section>
        </div>
      </Section>
    </HeadingAnimator>
  );
};

export default PlacementInfo;
