"use client";
import React, { useEffect, useState, useContext } from "react";
import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);
import Section from "./Section";
import Link from "next/link";
import Image from "next/image";
import Paragraph from "./Paragraph";
import Span from "./Span";
import { LuArrowRight } from "react-icons/lu";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io5";

import { getAllCourses } from "@/services/courseService";
import { LoadingContext } from "@/app/layout";

const COMPANY = {
  name: "Sri Maniya",
  logo: "/logos/footerlogo.png",
  homeUrl: "/",
};

interface Course {
  id: string;
  title: string;
  // Add other properties as needed
}

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/srimaniya_institute/?utm_source=qr&igsh=MTYwOXVzNmxidHVndA%3D%3D#",
    icon: <AiFillInstagram className="text-xl" />,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/SriManiyaInstitute",
    icon: <FaFacebook className="text-xl" />,
  },
  {
    label: "Youtube",
    href: "https://www.youtube.com/@srimaniyainstitute",
    icon: <FaYoutube className="text-xl" />,
  },
  {
    label: "Linked in",
    href: "#",
    icon: <IoLogoLinkedin className="text-xl" />,
  },
];

const NAV_EXPLORE = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about-us" },
  { label: "Courses & Admissions", href: "/courses" },
  { label: "Placements", href: "/placements" },
  { label: "Scholarship", href: "/scholarship" },
  { label: "Events & blog", href: "/events-blog" },
  { label: "Career", href: "/career" },
  { label: "Contact us", href: "/contact-us" },
];

const CONTACTS1 = [
  "+91 80938 64444",
  "admission@srimaniyainstitute.in",
  "info@srimaniyainstitute.in",
];

const CONTACTS2 = [
  "No: 6/66-D1, Government Hospital Road,",
  "Kanyakumari, Tamil Nadu – 629702.",
];

const Footer = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const { setLoading } = useContext(LoadingContext);

  // Scroll to enquire-form if coming from another page
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.sessionStorage.getItem("scrollToEnquire") === "1"
    ) {
      window.sessionStorage.removeItem("scrollToEnquire");
      setTimeout(() => {
        const enquireSection = document.getElementById("enquire-form");
        const smootherRaw: unknown = (
          window as unknown as { ScrollSmoother?: { get?: () => unknown } }
        ).ScrollSmoother?.get?.();
        const isSmoother = (
          obj: unknown
        ): obj is {
          scrollTo: (target: HTMLElement, smooth: boolean) => void;
        } =>
          typeof obj === "object" &&
          obj !== null &&
          typeof (obj as { scrollTo?: unknown }).scrollTo === "function";
        if (enquireSection) {
          if (isSmoother(smootherRaw)) {
            smootherRaw.scrollTo(enquireSection, true);
          } else {
            gsap.to(window, {
              duration: 1,
              scrollTo: { y: enquireSection, offsetY: 0 },
              ease: "power2.inOut",
            });
          }
        }
      }, 400); // Wait for layout/GSAP to be ready
    }
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const result = await getAllCourses();
        const data = result?.data;
        setCourses(data);
      } catch (error: unknown) {
        if (error && typeof error === "object" && "message" in error) {
          console.error(
            (error as { message?: string }).message || "Failed to fetch courses"
          );
        } else {
          console.error("Failed to fetch courses");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [setLoading]);

  return (
    <footer
      id="footer"
      className="bg-blue-custom text-white-custom min-h-screen relative"
      data-section
    >
      {/* Decorative image behind */}
      <div className="absolute bottom-0 left-0 z-0 pointer-events-none">
        <Image
          src="/designs/M.png"
          alt="Sri Maniya Institute Decorative Design"
          width={500}
          height={500}
          className="w-full h-full sm:h-[400px] object-contain"
          priority
        />
      </div>
      {/* Main content above */}
      <div className="relative z-10 min-h-screen flex flex-col justify-between">
        <div>
          <Section>
            <div className="w-full">
              <div className="grid grid-cols-4 sm:grid-cols-4  w-full">
                {SOCIALS.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`flex items-center  gap-6 py-6 text-white-custom transition  group sm:border-r last:border-0 border-custom ${
                      item.label === "Instagram"
                        ? "justify-center sm:justify-start"
                        : "justify-center"
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="flex items-center gap-2">
                      {item.icon}
                      <Paragraph
                        size="lg"
                        className="font-medium hidden sm:block"
                      >
                        {item.label}
                      </Paragraph>
                    </div>
                    <LuArrowRight className="text-xl hidden sm:block" />
                  </Link>
                ))}
              </div>
            </div>
          </Section>
          <div className="border-b border-custom w-full"></div>
          {/* Socials Row */}

          {/* Main Content */}
          <Section>
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 sm:gap-10 xl:gap-0 pb-8 w-full">
                {/* Explore */}
                <div className=" xl:border-r xl:last:border-0 border-custom flex flex-col  justify-between  pt-6 lg:pt-10 xl:pt-16 pb-4 ">
                  <div>
                    <Span className=" font-bold text-white/34">Contact</Span>
                    <ul>
                      {CONTACTS1.map((item, idx) => (
                        <li key={idx} className="my-3 text-white-custom">
                          <Span>{item}</Span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {/* Course */}
                <div className="xl:border-r xl:last:border-0 border-custom flex   justify-start lg:justify-center  pt-6 lg:pt-10 xl:pt-16 pb-4 ">
                  <div>
                    <Span className="font-bold text-white/34">Address</Span>
                    <ul>
                      {CONTACTS2.map((item, idx) => (
                        <li
                          key={idx}
                          className="my-3 text-white-custom xl:w-[80%]"
                        >
                          <Span>{item}</Span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {/* Contact 1 */}
                <div className="xl:border-r xl:last:border-0 border-custom flex justify-start lg:justify-center pt-6 lg:pt-10 xl:pt-16 pb-4 xl:px-6">
                  <div>
                    <Span className="font-bold text-white/34">Course</Span>
                    <ul>
                      {courses.map((item) => (
                        <li key={item.id} className="my-3 text-white-custom">
                          <Link href={`/courses?course=${item.id}`}>
                            <Span>{item.title}</Span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Contact 2 + Enquire Now */}
                <div className="xl:border-r xl:last:border-0 border-custom flex justify-start lg:justify-center pt-6 lg:pt-10 xl:pt-16 pb-4">
                  <div>
                    <Span className="font-bold text-white/34">Explore</Span>
                    <ul>
                      {NAV_EXPLORE.map((item) => (
                        <li key={item.label} className="my-3 text-white-custom">
                          <Span>
                            <Link
                              href={item.href}
                              onClick={() => {
                                if (
                                  typeof window !== "undefined" &&
                                  window.sessionStorage
                                ) {
                                  window.sessionStorage.setItem(
                                    "scrollFooterThenTop",
                                    "1"
                                  );
                                }
                              }}
                            >
                              {item.label}
                            </Link>
                          </Span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Section>
        </div>

        <Section>
          <div>
            <div className="flex flex-col sm:flex-row justify-between">
              {/* Logo and Description */}
              <div className="w-full sm:w-sm">
                <div className="mb-6">
                  <Image
                    src={COMPANY.logo}
                    alt={`${COMPANY.name} Logo`}
                    width={500}
                    height={500}
                    className="w-auto h-16 object-contain"
                    priority
                  />
                </div>
                <Span className="text-white-custom">
                  Sri Maniya Institutions provides a focused learning
                  environment and strong legacy in hospitality. Its success is
                  built on dedicated faculty and motivated students.
                </Span>
              </div>

              <div className="mt-8 sm:mt-0">
                <button
                  type="button"
                  className="relative flex justify-center items-center rounded-full bg-blue-custom overflow-hidden cursor-pointer border border-yellow-custom group transition-all duration-300 min-w-[110px]"
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      const goToEnquire = () => {
                        const enquireSection =
                          document.getElementById("enquire-form");
                        const smootherRaw: unknown = (
                          window as unknown as {
                            ScrollSmoother?: { get?: () => unknown };
                          }
                        ).ScrollSmoother?.get?.();
                        const isSmoother = (
                          obj: unknown
                        ): obj is {
                          scrollTo: (
                            target: HTMLElement,
                            smooth: boolean
                          ) => void;
                        } =>
                          typeof obj === "object" &&
                          obj !== null &&
                          typeof (obj as { scrollTo?: unknown }).scrollTo ===
                            "function";
                        if (enquireSection) {
                          if (isSmoother(smootherRaw)) {
                            smootherRaw.scrollTo(enquireSection, true);
                          } else {
                            gsap.to(window, {
                              duration: 1,
                              scrollTo: { y: enquireSection, offsetY: 0 },
                              ease: "power2.inOut",
                            });
                          }
                        }
                      };
                      if (window.location.pathname !== "/") {
                        window.location.href = "/#enquire-form";
                        // After navigation, scroll to section (for GSAP smoother)
                        window.sessionStorage.setItem("scrollToEnquire", "1");
                      } else {
                        goToEnquire();
                      }
                    }
                  }}
                >
                  <span className="relative z-20 text-center no-underline w-full px-6 py-1 text-[#FFCE54] text-base transition-all duration-300 group-hover:text-[#0B2351]">
                    Enquire Now
                  </span>
                  <span className="absolute left-0 top-0 w-full h-0 bg-yellow-custom transition-all duration-300 ease-in-out group-hover:h-full group-hover:top-auto group-hover:bottom-0 z-10" />
                </button>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="flex flex-col md:flex-row items-start justify-between  my-12 xl:my-16 pb-10 border-b border-custom  gap-2 w-full">
              <Span className="text-start  ">
                Copyright ©2025 srimaniya institute, All Rights Reserved.
                <br />
                <Link href="/privacy-policy" className="underline ">
                  Privacy Policy
                </Link>{" . "}
                <Link href="/terms-and-conditions" className="underline">
                  Terms & Conditions
                </Link>
              </Span>
              <Span>
                Powered by{" "}
                <Link
                  href="https://izhtech.com/"
                  target="_blank"
                  className="underline"
                >
                  Izhtech Creative Solutions
                </Link>
              </Span>
            </div>
          </div>
        </Section>
      </div>
    </footer>
  );
};

export default Footer;
