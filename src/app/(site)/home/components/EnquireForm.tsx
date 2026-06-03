"use client";
import { useRef } from "react";
import Image from "next/image";
import FormInner from "../subcomponents/FormInner";

const EnquireForm: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="md:h-[calc(100vh-80px)]" ref={sectionRef}>
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_1.5fr] lg:grid-cols-2 gap-0  md:h-[calc(100vh-80px)] relative">
        {/* Left: Image */}
        <div className="sm:w-[110%] lg:w-[106%] xl:w-[104%] min-h-75">
          <Image
            src="/home/enquireform.webp"
            alt="Enquiry form for Sri Maniya Institute of Hotel Management"
            width={2000}
            height={2000}
            className="w-full h-full  object-cover image-tag"
            unoptimized
          />
        </div>
        {/* Right: Content */}
        <div className="flex flex-col justify-center min-h-75">
          <div
            className="bg-(--blue) text-(--white-custom) flex flex-col justify-center h-full sm:h-[90%] py-8 sm:py-10 px-6 sm:px-8 xl:space-y-10 z-10 "
            data-section
          >
            <div className="max-w-2xl ml-auto">
              <p className="text-(--white-custom) uppercase text-end font-jakarta text-3xl sm:text-4xl lg:text-5xl font-bold">
                Enquire
              </p>
            </div>
            <FormInner />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnquireForm;
