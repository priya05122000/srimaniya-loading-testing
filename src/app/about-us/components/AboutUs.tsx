import Heading from '@/components/common/Heading'
import Paragraph from '@/components/common/Paragraph'
import Image from 'next/image'
import React from 'react'

const AboutUsImage: React.FC<{ className?: string }> = ({ className }) => (
  <Image
    src="/about-us/about-us.jpg"
    alt="About Us"
    width={1200}
    height={1200}
    className={className || "w-full h-full object-cover image-tag"}
  />
);

const AboutUs = () => {
  return (
    <div className="lg:h-[calc(100vh-80px)]">
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_2fr] xl:grid-cols-[1.2fr_2fr] relative h-full overflow-hidden">
        {/* Right-side big image placeholder */}
        <div></div>
        <div className="hidden lg:block ">
          <AboutUsImage className="w-full h-full lg:h-[calc(100vh-80px)] object-cover" />
        </div>

        {/* Absolute content/overlay section */}
        <div className="lg:absolute inset-0">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] xl:grid-cols-[3fr_1fr] h-full">
            {/* Left side image for mobile */}
            <div className="block lg:hidden relative border-b lg:border-b-0 lg:border-r border-grey-custom">
              <AboutUsImage className="w-full h-full object-cover" />
              <div className="absolute inset-0 z-20 lg:bg-[url('/designs/noise.svg')] bg-cover bg-no-repeat" />
            </div>

            {/* Main content and first slide overlay */}
            <div>
              <div className="grid grid-cols-1 lg:grid-cols-[5fr_1fr] xl:grid-cols-[2fr_1fr] 2xl:grid-cols-[1fr_1fr] relative h-full">
                {/* Text block */}
                <div
                  className="bg-(--blue) p-6 sm:p-8 relative overflow-hidden flex items-center h-full"
                  data-section
                >
                  <div className="">
                    <Heading
                      level={6}
                      className="text-white-custom  font-bold about-us-heading leading-tight"
                    >
                      About Us
                    </Heading>
                    <Paragraph
                      size="base"
                      className="text-white-custom mt-4 leading-relaxed xl:leading-loose text-justify"
                    >
                      Recognized as a leading hotel management college, our institute boasts strong industry partnerships and a globally relevant curriculum that prepares students for careers at prestigious hotels, cruise lines, airlines, and resorts worldwide.
                    </Paragraph>
                    <Paragraph
                      size="base"
                      className="text-white-custom mt-4 leading-relaxed xl:leading-loose text-justify"
                    >
                      Established with a mission to deliver world-class education in hotel management and catering, the institute blends practical training with academic rigor to ready students for lucrative and esteemed positions in the hospitality sector.

                    </Paragraph>
                    <Paragraph
                      size="base"
                      className="text-white-custom mt-4 leading-relaxed xl:leading-loose text-justify"
                    >
                      Our all-encompassing programs cover every aspect of hospitality, including front office operations, food and beverage management, housekeeping, culinary arts, and event management. With experienced faculty and an industry-aligned curriculum, we ensure that each student gains hands-on experience and develops the skills necessary to thrive in international hospitality careers. This makes us a top choice for those seeking a top hotel management college.
                    </Paragraph>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs
