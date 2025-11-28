"use client";
import React, { useRef, useState, useEffect, useContext } from "react";
import { useSplitTextHeadingAnimation } from "@/hooks/useSplitTextHeadingAnimation";
import Heading from "@/components/common/Heading";
import Paragraph from "@/components/common/Paragraph";
import Section from "@/components/common/Section";
import Image from "next/image";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

import { getAllJobs } from "@/services/jobService";
import { useGlobalLoader } from "@/providers/GlobalLoaderProvider";

// Reusable constants
const CAREER_IMAGE = "/career/career.jpg";
const CAREER_IMAGE_PROPS = {
  src: CAREER_IMAGE,
  alt: "About Us",
  width: 1200,
  height: 1200,
  className: "w-full h-full object-cover",
  priority: true,
};

interface Job {
  id: string;
  title: string;
  description: string;
  experience_years: number;
  openings: number;
}

const scrollToApplyNow = () => {
  const el = document.getElementById("apply-now-section");
  if (!el) return;
  const targetY = el.getBoundingClientRect().top + window.pageYOffset - 80;
  const startY = window.pageYOffset;
  const distance = targetY - startY;
  const duration = 800;
  let startTime: number | null = null;
  function easeInOutQuad(t: number) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }
  function animateScroll(currentTime: number) {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const ease = easeInOutQuad(progress);
    window.scrollTo(0, startY + distance * ease);
    if (progress < 1) requestAnimationFrame(animateScroll);
  }
  requestAnimationFrame(animateScroll);
};

const JobCard: React.FC<{ job: Job; index: number }> = ({ job, index }) => (
  <div className="lg:px-10 pb-6 relative flex flex-col justify-between ">
    <div>
      <div className="flex justify-between border-y border-(--grey-custom) py-3">
        <div className="flex flex-col">
          <Heading
            level={6}
            className="text-(--dark) font-semibold"
          >
            {String(index + 1).padStart(2, "0")}. {job.title}
          </Heading>
          <Paragraph
            size="base"
            className="text-(--dark) font-semibold mt-1"
          >
            {job.openings} Openings | {job.experience_years} Years Experience
          </Paragraph>
        </div>
        <div className="flex justify-end items-end mt-4">
          <button
            className="border-2 border-dark-custom rounded-full p-2 flex items-center justify-center transition-all duration-200 w-12 h-6 cursor-pointer"
            onClick={scrollToApplyNow}
            aria-label="Scroll to Apply Now"
          >
            <HiOutlineArrowNarrowRight className="font-normal text-(--dark) text-2xl" />
          </button>
        </div>
      </div>
      <div
        className="text-(--dark) mt-3 text-base text-justify leading-relaxed"
        dangerouslySetInnerHTML={{ __html: job.description }}
      />
    </div>
  </div>
);

const CareerSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const openingRef = useRef<HTMLDivElement | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const { loading, setLoading } = useGlobalLoader();



  useEffect(() => {
    setLoading(true);
    const fetchJobs = async () => {
      try {
        const result = await getAllJobs();
        setJobs(result?.data || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [setLoading]);

  return (
    <section className="relative">
      <div
        className="grid grid-cols-1 lg:grid-cols-[auto_1fr] xl:grid-cols-[1.2fr_2fr] relative"
        ref={sectionRef}
      >
        <div></div>
        <div className="hidden lg:block">
          <Image {...CAREER_IMAGE_PROPS} />
        </div>
        <div className="lg:absolute inset-0">
          <div className="grid grid-cols-1 sm:grid-cols-[1.5fr_1fr] lg:grid-cols-[2fr_1fr] xl:grid-cols-[3fr_1fr] h-full">
            <div className="block lg:hidden relative border-b sm:border-b-0 sm:border-r border-grey-custom lg:border-r-0">
              <Image {...CAREER_IMAGE_PROPS} />
              <div
                className={`absolute inset-0 z-20 transform transition-transform duration-700 ease-in-out bg-[url('/designs/noise.svg')] bg-cover bg-no-repeat`}
              />
            </div>
            <div className="">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] relative h-full">
                <div className="bg-(--blue) p-6 sm:p-8 relative overflow-hidden flex items-center" data-section>
                  <div className="">
                    <Heading
                      level={6}
                      className="text-(--white-custom)  font-bold career-heading"
                    >
                      Career
                    </Heading>
                    <Paragraph
                      size="base"
                      className="text-(--white-custom) mt-4 leading-relaxed xl:leading-loose text-justify"
                    >
                      We are looking for passionate and dedicated individuals who want to inspire, teach, and make a meaningful impact on tomorrow's hospitality leaders. At Sri Maniya Institute of Hotel Management, every role is crucial in shaping future leaders of the worldwide hospitality industry.
                    </Paragraph>
                    <Paragraph
                      size="base"
                      className="text-(--white-custom) mt-4 leading-relaxed xl:leading-loose"
                    >
                      Join {" "}
                      <strong>Sri Maniya Institute of Hotel Management</strong>{" "}
                      to advance your career while helping to develop the next generation of hospitality professionals.
                    </Paragraph>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Section className="py-10 sm:py-20" ref={openingRef}>
        <div>
          <Heading
            level={6}
            className="text-(--blue) mb-10 job-opening-heading leading-tight"
          >
            Job Openings
          </Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
            {jobs.map((job, index) => (
              <JobCard key={job.id} job={job} index={index} />
            ))}
          </div>
        </div>
      </Section>
    </section>
  );
};

export default CareerSection;
