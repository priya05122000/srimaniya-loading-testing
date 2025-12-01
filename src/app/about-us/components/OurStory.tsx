"use client";
import React, { useRef } from "react";
import Heading from "@/components/common/Heading";
import Paragraph from "@/components/common/Paragraph";
import Image from "next/image";

interface StorySectionProps {
  heading: string;
  children: React.ReactNode;
}

const StorySection: React.FC<StorySectionProps> = ({ heading, children }) => (
  <div className="mb-6">
    <span className="text-base lg:text-lg font-inter font-bold block mb-4 tracking-wide leading-relaxed">{heading}</span>
    <div className="font-extralight text-(--white-custom) leading-loose text-justify text-base">
      {children}
    </div>
  </div>
);

const STORY_TEXT = (
  <>
    <StorySection heading="Our Story: The Journey of a Young Driver Who Redefined Hospitality">
      In the coastal town of Kanyakumari, our legacy began in 1950 with the
      remarkable journey of Mr. Mani — whose humble beginnings as a taxi cleaner
      and Guest Service Associate laid the foundation for a lifelong mission in
      hospitality. Every day, he drove tourists across the scenic routes from
      Kanyakumari to Trivandrum, learning not just about places, but about people,
      service, and the true essence of hospitality. With dedication and
      perseverance, he turned his modest beginnings into a lifelong mission.
      <br />
      <br />
      In 1966, he laid the cornerstone of his dream by opening his first lodge,
      the Gopinivash, with just 10 rooms. This bold venture marked the start of a
      remarkable legacy, forgoing a personal dream home to answer the growing
      needs of travelers. Step by step, he expanded his ventures — launching Hotel
      Palace a veg Restaurant, which became a popular, and later the innovative
      Sangam Lodge, one of the first in Kanyakumari to introduce modern amenities
      like air-conditioning, television, and generators.
      <br />
      <br />
      His guiding principle was simple yet profound: {" "}
      <strong>
        Honesty and integrity are the two eyes of any business.
      </strong>{" "}
      Through his leadership, Mr. Mani built more than just hotels — he built
      trust, comfort, and lasting relationships. His humility never faded; even
      with success, he stayed grounded, treating his employees like family and his
      guests like friends in a true home-away-from-home. Over the years, he
      established many hotels and lodges, creating countless job opportunities and
      provided sustained business for the local community and suppliers. His
      dedication not only transformed his own ventures but also helped raise
      Kanyakumari’s hospitality standards, turning the town into a recognized and
      welcoming destination for travelers from across the country.
    </StorySection>
    <br />
    <StorySection heading="The Legacy Continues: Educating the Next Generation">
      Today, that same spirit finds its standard-bearer in his son, Mr. Gopala
      Krishnan, guiding the family's next chapter with the Sri Maniya Institute of
      Hotel Management. Founded to carry forward his father's dream of 'better
      hospitality,' the institution shapes future hoteliers, chefs, and leaders
      who embody the timeless values of sincerity, service, and compassion. What
      began as one man's journey in 1950 has grown into an enduring legacy — a
      testament to how passion and perseverance can turn the simplest journey into
      a living tradition that now educates and empowers others.
    </StorySection>
  </>
);

const OurStory: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);

  const handleReadMore = () => {
    if (paragraphRef.current) {
      const lineHeight = parseInt(getComputedStyle(paragraphRef.current).lineHeight);
      paragraphRef.current.scrollBy({ top: lineHeight, behavior: "smooth" });
    }
  };

  return (
    <div ref={sectionRef}>
      <div className="grid grid-cols-1 md:grid-cols-[auto_2fr] gap-0 h-full">
        {/* Left: Image */}
        <div
          className="flex items-center justify-center sm:w-[110%] lg:w-[106%] xl:w-[110%] z-10 h-full"
        >
          <Image
            src="/about-us/ourstory-old.jpg"
            alt="Our Story"
            width={1000}
            height={1000}
            className="w-full h-full sm:h-[400px] lg:h-[450px] xl:h-[590px]  object-cover object-top image-tag"
          />
        </div>
        {/* Right: Content */}
        <div
          className="bg-(--blue) text-(--white-custom) flex flex-col justify-around py-10  pl-6 sm:pl-20 pr-6 sm:pr-20 space-y-6"
          data-section
        >
          <Heading
            level={6}
            className="text-(--white-custom) font-bold our-story-heading leading-tight "
          >
            Our Story
          </Heading>
          <div
            className="text-(--white-custom) leading-relaxed xl:leading-loose text-justify h-full sm:h-[300px] xl:h-[450px] overflow-y-auto scroll-smooth"
            ref={paragraphRef}
          >
            {STORY_TEXT}
          </div>
          <button
            className="text-end italic underline cursor-pointer hidden sm:block"
            onClick={handleReadMore}
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default OurStory;
