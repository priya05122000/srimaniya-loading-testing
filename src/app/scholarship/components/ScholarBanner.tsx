"use client";
import React, { useRef, useState, useEffect } from "react";

// Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { useSplitTextHeadingAnimation } from "@/hooks/useSplitTextHeadingAnimation";
import Heading from "@/components/common/Heading";
import Image from "next/image";

import { getAllJobs } from "@/services/jobService";
import { useGlobalLoader } from "@/providers/GlobalLoaderProvider";




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
    const { loading, setLoading } = useGlobalLoader();


    useSplitTextHeadingAnimation({
        trigger: bannerRef,
        first: headingRef,
        delay: 0.3,
        enabled: true,
    });


    useEffect(() => {
        setLoading(true);
        const fetchJobs = async () => {
            try {
                const result = await getAllJobs();
                const data = result.data || [];
                const filtered = data.filter((job: Job) => job.is_active);
                setJobs(filtered);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, [setLoading]);

    return (
        <div className="sm:h-[calc(100vh-80px)]" ref={bannerRef}>
            <div className="h-full min-h-[300px] relative">
                <Image
                    src={BANNER_IMAGE}
                    alt="sri maniya institute scholarship, scholarship in hospitality management, hotel management scholarship in tamilnadu, merit based scholarship sri maniya institute, hotel management college scholarship tamil nadu, scholarship for diploma degree students, Sri Maniya College scholarship eligibility"
                    width={1000}
                    height={1000}
                    style={{ objectFit: "cover" }}
                    className="absolute inset-0 w-full h-full object-top image-tag"
                />
                <div className="absolute inset-0" style={GRADIENT_OVERLAY}></div>
                <div className="absolute left-0 sm:left-8 bottom-8 sm:bottom-16 px-6 sm:px-0 w-full sm:w-2/3 xl:w-1/2">
                    <h1 ref={headingRef} className="leading-tight scholarship text-3xl sm:text-4xl lg:text-5xl font-bold">{BANNER_HEADING}</h1>
                </div>
            </div>
        </div>
    );
};

export default ScholarBanner;
