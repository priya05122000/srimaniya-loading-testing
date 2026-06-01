"use client";
import React, { useRef, useState, useEffect } from "react";

import { useSplitTextHeadingAnimation } from "@/hooks/useSplitTextHeadingAnimation";
import Image from "next/image";

import { getAllJobs } from "@/services/jobService";




// Reusable constants
const BANNER_IMAGE = "/scholarship/scholarship-banner.webp";
const BANNER_HEADING = "₹51 Lakh Worth of Scholarships Awarded to Deserving Students";
const GRADIENT_OVERLAY = {
    background: "linear-gradient(to bottom, rgba(0,0,0,0) 30%, #0b2351 100%)",
    opacity: 0.8,
};

interface Job {
    id: string;
    title: string;
    description: string;
    experience_years: number;
    openings: number;
    is_active: boolean;
}



const ScholarBanner: React.FC = () => {
    const bannerRef = useRef<HTMLDivElement | null>(null);
    const headingRef = useRef<HTMLHeadingElement | null>(null); const [jobs, setJobs] = useState<Job[]>([]);


    useSplitTextHeadingAnimation({
        trigger: bannerRef,
        first: headingRef,
        delay: 0.3,
        enabled: true,
    });


    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const result = await getAllJobs();
                const data = result.data || [];
                const filtered = data.filter((job: Job) => job.is_active);
                setJobs(filtered);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };
        fetchJobs();
    }, []);

    return (
        <div className="sm:h-[calc(100vh-80px)]" ref={bannerRef}>
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
                    <h1 ref={headingRef} className="leading-tight font-jakarta scholarship text-3xl sm:text-4xl lg:text-5xl font-bold">{BANNER_HEADING}</h1>
                </div>
            </div>
        </div>
    );
};

export default ScholarBanner;
