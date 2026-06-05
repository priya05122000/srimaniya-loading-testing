"use client";

import React, {
  useEffect,
  useState,
  useRef,
  ReactNode,
  Suspense,
} from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useScrollLogic } from "@/hooks/useScrollLogic";
import { useScrollSmoother } from "@/hooks/useScrollSmoother";
import { useNavbarVisibility } from "@/hooks/useNavbarVisibility";
import EnquiryPopup from "@/components/common/EnquiryPopup";

const BackToTopButton = dynamic(
  () => import("@/components/common/BackToTopButton"),
  { ssr: false },
);
const FloatingContactButtons = dynamic(
  () => import("@/components/common/FloatingContactButtons"),
  { ssr: false },
);
const ToastContainer = dynamic(
  () => import("react-toastify").then((m) => ({ default: m.ToastContainer })),
  { ssr: false },
);

interface ClientLayoutProps {
  children: ReactNode;
  showSmoother?: boolean;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({
  children,
  showSmoother = true,
}) => {
  const smootherRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const [isBlueSection, setIsBlueSection] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const navbarSuppressRef = useRef(false);
  const isFirstMount = useRef(true);

  useScrollSmoother(smootherRef as React.RefObject<HTMLDivElement>);

  // Initial load: show footer, reset scroll
  useEffect(() => {
    if (window.location.hash === "#enquire-form") {
      setTimeout(async () => {
        const enquireSection = document.getElementById("enquire-form");
        if (!enquireSection) return;
        try {
          const { default: ScrollSmoother } = await import("gsap/ScrollSmoother");
          const smoother = ScrollSmoother.get();
          if (smoother) {
            smoother.scrollTo(enquireSection, true);
          } else {
            enquireSection.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        } catch {
          enquireSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 500);
    } else {
      window.scrollTo(0, 0);
    }
    setFooterVisible(true);

    const timer = setTimeout(() => {
      if (!sessionStorage.getItem("enquiry_popup_shown")) {
        setShowPopup(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Restore navbar + refresh ScrollTrigger on navigation
  useEffect(() => {
    setNavbarVisible(true);

    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    const run = async () => {
      const { default: ScrollTrigger } = await import("gsap/ScrollTrigger");
      ScrollTrigger.refresh();
      setPageVisible(true);
    };

    const timer = setTimeout(run, 150);

    return () => {
      clearTimeout(timer);
      setPageVisible(true);
    };
  }, [pathname]);

  const handleClosePopup = () => {
    setShowPopup(false);
    sessionStorage.setItem("enquiry_popup_shown", "1");
  };

  useScrollLogic(setScrollProgress, setShowBackToTop, setIsBlueSection);

  useNavbarVisibility({
    footerVisible,
    pathname,
    setNavbarVisible,
    suppressRef: navbarSuppressRef,
  });

  return (
    <>
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
      {pathname !== "/registration-form" && (
        <div
          className={`fixed top-0 left-0 right-0 z-50 transition-opacity duration-500 ${
            navbarVisible
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
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
            className={`relative z-10 ${
              pathname !== "/registration-form" ? "pt-20" : ""
            }`}
            style={{
              opacity: pageVisible ? 1 : 0,
              transition: pageVisible ? "opacity 0.4s ease" : "none",
            }}
          >
            {children}
          </main>
          <Suspense fallback={<div>Loading...</div>}>
            <div
              style={{
                opacity:
                  pathname === "/registration-form" ? 0 : footerVisible ? 1 : 0,
                transition: "opacity 0.7s cubic-bezier(0.4,0,0.2,1)",
              }}
            >
              {pathname !== "/registration-form" && <Footer />}
            </div>
          </Suspense>
        </div>
      </div>
      <EnquiryPopup show={showPopup} onClose={handleClosePopup} />
    </>
  );
};

export default ClientLayout;
