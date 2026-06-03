"use client";
import React, { useRef } from "react";
import Image from "next/image";

import ApplyForm from "./ApplyForm";

const ApplyNow: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  return (
    <section
      className="bg-(--blue-overlay-custom) sm:h-137.5 flex flex-col"
      data-section
      ref={sectionRef}
    >
      <div className="relative">
        <Image
          src="/career/careerform.webp"
          alt="Sri Maniya Institute careers"
          className="w-full h-87.5 sm:h-137.5 object-cover object-top image-tag"
          width={1200}
          height={1200}
          priority
        />
        <div className="md:absolute md:right-0 md:top-0 w-full md:w-1/2">
          <div
            className="sm:h-137.5 bg-(--blue-overlay-light) backdrop-blur-md p-6 sm:p-8 flex flex-col justify-between gap-6"
            data-section
          >
            <div className="max-w-2xl ml-auto">
              <h3 className="text-(--white-custom) font-jakarta uppercase mb-4 text-end text-3xl sm:text-4xl lg:text-5xl font-bold">
                Apply Now
              </h3>
            </div>
            <ApplyForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplyNow;
