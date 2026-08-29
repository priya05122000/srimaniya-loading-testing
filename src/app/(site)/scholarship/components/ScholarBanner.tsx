import React from "react";
import Image from "next/image";
import HeadingAnimator from "@/components/common/HeadingAnimator";

// Reusable constants
const BANNER_IMAGE = "/scholarship/scholarship-banner.webp";
const BANNER_HEADING =
  "₹51 Lakh Worth of Scholarships Awarded to Deserving Students";
const GRADIENT_OVERLAY = {
  background:
    "linear-gradient(to bottom, rgba(0,0,0,0) 30%, #0b2351 100%)",
  opacity: 0.8,
};

const ScholarBanner: React.FC = () => {
  return (
    <HeadingAnimator first=".scholarship" delay={0.3} className="sm:h-[calc(100vh-80px)]">
      <div className="h-full min-h-75 relative">
        <Image
          src={BANNER_IMAGE}
          alt="Scholarship program at Sri Maniya Institute of Hotel Management"
          width={1000}
          height={1000}
          style={{ objectFit: "cover" }}
          className="absolute inset-0 w-full h-full object-top image-tag"
        />
        <div className="absolute inset-0" style={GRADIENT_OVERLAY}></div>
        <div className="absolute left-0 sm:left-8 bottom-8 sm:bottom-16 px-6 sm:px-0 w-full sm:w-2/3 xl:w-1/2">
          <h1 className="leading-tight font-jakarta scholarship text-3xl sm:text-4xl lg:text-5xl font-bold">
            {BANNER_HEADING}
          </h1>
        </div>
      </div>
    </HeadingAnimator>
  );
};

export default ScholarBanner;
