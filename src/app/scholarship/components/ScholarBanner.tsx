"use client";
import React, { useRef } from "react";

// Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import Image from "next/image";
import Heading from "@/components/common/Heading";
import { useSplitTextHeadingAnimation } from "@/hooks/useSplitTextHeadingAnimation";

// Reusable constants
const BANNER_IMAGE = "/scholarship/scholarship-banner.jpeg";
const BANNER_HEADING = "₹51 Lakh Worth of Scholarships Awarded to Deserving Students";
const GRADIENT_OVERLAY = {
    background: "linear-gradient(to bottom, rgba(0,0,0,0) 30%, #0b2351 100%)",
    opacity: 0.8,
};

const ScholarBanner: React.FC = () => {
    const bannerRef = useRef<HTMLDivElement | null>(null);
    const headingRef = useRef<HTMLHeadingElement | null>(null);

    useSplitTextHeadingAnimation({
        trigger: bannerRef,
        first: headingRef,
        delay: 0.3,
        enabled: true,
    });

    return (
        <div className="sm:h-[calc(100vh-80px)]" ref={bannerRef}>
            <div className="h-full min-h-[300px] relative">
                <Image
                    src={BANNER_IMAGE}
                    alt="Scholarship Banner"
                    width={1000}
                    height={1000}
                    style={{ objectFit: "cover" }}
                    className="absolute inset-0 w-full h-full object-top image-tag"
                />
                <div className="absolute inset-0" style={GRADIENT_OVERLAY}></div>
                <div className="absolute left-0 sm:left-8 bottom-8 sm:bottom-16 px-6 sm:px-0 w-full sm:w-2/3 xl:w-1/2">
                    <Heading ref={headingRef} level={4} className="leading-tight scholarship ">{BANNER_HEADING}</Heading>
                </div>
            </div>
        </div>
    );
};

export default ScholarBanner;
