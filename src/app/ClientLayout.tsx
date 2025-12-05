"use client";

import React, { useEffect, useState, useRef, ReactNode, Suspense } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap/ScrollSmoother";
import { ToastContainer, toast } from "react-toastify";
import { useGlobalLoader } from "@/providers/GlobalLoaderProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackToTopButton from "@/components/common/BackToTopButton";
import FloatingContactButtons from "@/components/common/FloatingContactButtons";
import "react-toastify/dist/ReactToastify.css";
import Script from "next/script";
import { AnimatePresence, motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import Heading from "@/components/common/Heading";
import Paragraph from "@/components/common/Paragraph";
import { createAppoinmentRequest } from "@/services/appoinmentRequestService";
import Link from "next/link";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// Custom hook for scroll-related logic
function useScrollLogic(
  setScrollProgress: React.Dispatch<React.SetStateAction<number>>,
  setShowBackToTop: React.Dispatch<React.SetStateAction<boolean>>,
  setIsBlueSection: React.Dispatch<React.SetStateAction<boolean>>
) {
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0);
      setShowBackToTop(window.scrollY > 500);

      const blueSections = document.querySelectorAll("[data-section]");
      const buttonY = window.innerHeight - 80;
      const buttonX = window.innerWidth - 80;
      const onBlue = Array.from(blueSections).some((section) => {
        const rect = section.getBoundingClientRect();
        return (
          buttonX >= rect.left &&
          buttonX <= rect.right &&
          buttonY >= rect.top &&
          buttonY <= rect.bottom
        );
      });
      setIsBlueSection(onBlue);
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [setScrollProgress, setShowBackToTop, setIsBlueSection]);
}

// Custom hook for ScrollSmoother initialization
function useScrollSmoother(
  loading: boolean,
  smootherRef: React.RefObject<HTMLDivElement>
) {
  useEffect(() => {
    if (!loading && smootherRef.current && window.innerWidth >= 1024) {
      const prevSmoother = ScrollSmoother.get();
      if (prevSmoother) prevSmoother.kill();
      const smoother = ScrollSmoother.create({
        smooth: 4,
        effects: true,
        wrapper: smootherRef.current,
        content: smootherRef.current.querySelector(".smoother-content"),
      });
      ScrollTrigger.refresh();
      return () => smoother.kill();
    }
  }, [loading, smootherRef]);
}

interface FooterRevealProps {
  loading: boolean;
  pathname: string;
  setShowOnlyFooter: React.Dispatch<React.SetStateAction<boolean>>;
  setFooterVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
function useFooterReveal({
  loading,
  pathname,
  setShowOnlyFooter,
  setFooterVisible,
}: FooterRevealProps) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (
      window.innerWidth < 1024 ||
      pathname === "/" ||
      loading ||
      window.location.hash === "#enquire-form"
    ) {
      setShowOnlyFooter(false);
      setFooterVisible(true);
      return;
    }
    setShowOnlyFooter(true);
    setFooterVisible(false);
    const t1 = setTimeout(() => {
      setFooterVisible(true);
      const footer = document.getElementById("footer");
      const smoother = ScrollSmoother.get();
      if (footer && smoother) {
        smoother.scrollTo(footer, false);
      } else if (footer) {
        footer.scrollIntoView({ behavior: "auto" });
      }
      setTimeout(() => {
        setShowOnlyFooter(false);
        setTimeout(() => {
          const footer2 = document.getElementById("footer");
          const smoother2 = ScrollSmoother.get();
          if (footer2 && smoother2) {
            smoother2.scrollTo(0, true);
          } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }, 100);
      }, 150);
    }, 150);
    return () => {
      if (t1) clearTimeout(t1);
    };
  }, [loading, pathname, setShowOnlyFooter, setFooterVisible]);
}

interface NavbarVisibilityProps {
  footerVisible: boolean;
  pathname: string;
  setNavbarVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
function useNavbarVisibility({
  footerVisible,
  pathname,
  setNavbarVisible,
}: NavbarVisibilityProps) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const footer = document.getElementById("footer");
    if (!footer) return;
    let observer: IntersectionObserver | null = null;
    observer = new window.IntersectionObserver(
      ([entry]) => {
        // Hide navbar if footer is more than 50% visible, always
        setNavbarVisible(entry.intersectionRatio < 0.5);
      },
      { root: null, threshold: 0.5 }
    );
    observer.observe(footer);
    return () => {
      if (observer && footer) observer.unobserve(footer);
    };
  }, [footerVisible, pathname, setNavbarVisible]);
}

interface ClientLayoutProps {
  children: ReactNode;
  showSmoother?: boolean;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({
  children,
  showSmoother = true,
}) => {
  const smootherRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;
  const pathname = usePathname();
  const { loading } = useGlobalLoader();

  // State
  const [isBlueSection, setIsBlueSection] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
  const [showOnlyFooter, setShowOnlyFooter] = useState<boolean>(true);
  const [footerVisible, setFooterVisible] = useState<boolean>(false);
  const [navbarVisible, setNavbarVisible] = useState<boolean>(true);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [popupSubmitting, setPopupSubmitting] = useState<boolean>(false);
  const [localLoading, setLocalLoading] = useState(false);

  const handleClosePopup = () => setShowPopup(false);
  const handleMobileNumberChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setMobileNumber(e.target.value);
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalLoading(true);
    try {
      // Prepare data
      const StudentName = "(popup)";
      const StudentPhone = mobileNumber;
      // Submit to Google Apps Script
      await fetch(
        "https://script.google.com/macros/s/AKfycbxQ0OGd2A5Tvs0_MQxcUWtWfwEmyAyHpdY6mcUXZKj87QXG0JP2ilZ9CTQxmhfkP6_r/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            StudentName,
            ParentName: "null",
            StudentPhone,
            ParentPhone: "null",
            StudentEmail: "null",
            Address: "null",
            City: "null",
            State: "null",
            District: "null",
            PinCode: "null",
          }),
        }
      );
      // Submit to createAppoinmentRequest
      const payload = { name: StudentName, phone_number: StudentPhone };
      const response = await createAppoinmentRequest(payload);
      if (!response || !response.status || response.responseCode !== "INSERT_SUCCESS") {
        toast.error("Failed to submit the form. Please try again.");
        setLocalLoading(false);
        return;
      }
      toast.success("Form submitted successfully!");
      setMobileNumber("");
      setShowPopup(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit the form. Please try again.");
    } finally {
      setLocalLoading(false);
    }
  };

  // Example: Show popup after 10 seconds (customize as needed)
  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Hooks for logic
  useScrollSmoother(loading, smootherRef);
  useEffect(() => {
    if (!loading) {
      if (window.location.hash !== "#enquire-form") {
        window.scrollTo(0, 0);
      }
    }
  }, [loading]);
  useScrollLogic(setScrollProgress, setShowBackToTop, setIsBlueSection);
  useFooterReveal({ loading, pathname, setShowOnlyFooter, setFooterVisible });
  useNavbarVisibility({ footerVisible, pathname, setNavbarVisible });

  // Route change track (page view)
  useEffect(() => {
    if (window.gtag) {
      window.gtag("config", "G-GFHYHS0PBP", {
        page_path: pathname,
      });
    }
  }, [pathname]);

  // Render
  return (
    <>
      <Script
        strategy="lazyOnload"
        src="https://www.googletagmanager.com/gtag/js?id=G-GFHYHS0PBP"
        defer
      />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-GFHYHS0PBP', {
      page_path: window.location.pathname,
    });
  `}
      </Script>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Hide Navbar for /registration-form route on all screen sizes */}
      {/* {pathname !== "/registration-form" && (
        <>
          <div >{navbarVisible && <Navbar />}</div>
        </>
      )} */}

      {/* Hide Navbar for /registration-form route */}
      {pathname !== "/registration-form" && (
        <div
          style={{
            opacity: navbarVisible ? 1 : 0, // fade in/out
            pointerEvents: navbarVisible ? "auto" : "none", // disable clicks when hidden
            // transition: "opacity 0.5s ease-in-out", // smooth transition
          }}
        >
          <Navbar />
        </div>
      )}

      <BackToTopButton
        isBlueSection={isBlueSection}
        scrollProgress={scrollProgress}
        show={showBackToTop}
      />
      <FloatingContactButtons isBlueSection={isBlueSection} />
      <div
        ref={smootherRef}
        id="smooth-wrapper"
        className={showSmoother ? undefined : "hidden"}
      >
        <div className="smoother-content">
          <main
            className={`relative z-10 ${pathname !== "/registration-form" ? " pt-20" : ""
              }`}
            style={{
              opacity: showOnlyFooter ? 0 : 1,
              pointerEvents: showOnlyFooter ? "none" : "auto",
              transition: "opacity 0.2s",
            }}
          >
            {children}
          </main>
          <Suspense fallback={<div>Loading...</div>}>
            <div
              style={{
                opacity: footerVisible ? 1 : 0,
                transition: "opacity 0.7s cubic-bezier(0.4,0,0.2,1)",
              }}
            >
              {pathname !== "/registration-form" && <Footer />}
            </div>
          </Suspense>
        </div>
      </div>
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed inset-0 z-100 flex items-center justify-center bg-(--black)/60 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-(--blue-overlay-custom) shadow-2xl p-6  w-[400px] relative backdrop-blur-md"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                className="absolute top-2 right-2 cursor-pointer text-xl text-(--bg-grey)"
                onClick={handleClosePopup}
                aria-label="Close"
              >
                <IoClose />
              </button>

              <Heading
                level={6}
                className="font-bold my-6 leading-tight text-center text-(--white) uppercase"
              >
                Enquire Now
              </Heading>

              <form onSubmit={handleSubscribe} className=" space-y-2  w-full mx-auto">
                <input
                  type="tel"
                  name="Mobile Number"
                  required
                  value={mobileNumber}
                  onChange={handleMobileNumberChange}
                  placeholder="Enter your Mobile number"
                  className="flex-1 w-full px-4 py-2 border text-(--dark) border-white bg-white focus:outline-none"
                  maxLength={10}
                  pattern="[0-9]{10}"
                  inputMode="numeric"
                />
                <div className=" flex justify-end mt-4">
                  <button
                    type="submit"
                    className="relative flex justify-center items-center rounded-full bg-transparent overflow-hidden cursor-pointer border border-(--yellow) group transition-all duration-300 min-w-[110px]"
                    disabled={localLoading}
                  >
                    <span className="relative z-20 text-center no-underline w-full px-2 py-1 text-(--yellow) text-base transition-all duration-300 group-hover:text-(--blue)">
                      {localLoading ? "Submitting..." : "Submit"}
                    </span>
                    <span className="absolute left-0 top-0 w-full h-0 bg-(--yellow) transition-all duration-300 ease-in-out group-hover:h-full group-hover:top-auto group-hover:bottom-0 z-10" />
                  </button>
                </div>

              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ClientLayout;
