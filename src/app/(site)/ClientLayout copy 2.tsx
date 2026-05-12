"use client";

// Imports
import React, { useEffect, useState, useRef, ReactNode, Suspense } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap/ScrollSmoother";
import { ToastContainer } from "react-toastify";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackToTopButton from "@/components/common/BackToTopButton";
import FloatingContactButtons from "@/components/common/FloatingContactButtons";
import "react-toastify/dist/ReactToastify.css";
import { useScrollLogic } from "@/hooks/useScrollLogic";
import { useScrollSmoother } from "@/hooks/useScrollSmoother";
import { useFooterReveal } from "@/hooks/useFooterReveal";
import { useNavbarVisibility } from "@/hooks/useNavbarVisibility";

// GSAP plugin registration
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// Types
interface ClientLayoutProps {
  children: ReactNode;
  showSmoother?: boolean;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({
  children,
  showSmoother = true,
}) => {
  // Refs
  const smootherRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // State
  const [isBlueSection, setIsBlueSection] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showOnlyFooter, setShowOnlyFooter] = useState(true);
  const [footerVisible, setFooterVisible] = useState(false);
  const [navbarVisible, setNavbarVisible] = useState(true);

  useScrollSmoother(smootherRef as React.RefObject<HTMLDivElement>);

  useEffect(() => {
    if (window.location.hash !== "#enquire-form") {
      window.scrollTo(0, 0);
    }
  }, []);

  useScrollLogic(setScrollProgress, setShowBackToTop, setIsBlueSection);

  useFooterReveal({
    pathname,
    setShowOnlyFooter,
    setFooterVisible,
  });

  useNavbarVisibility({ footerVisible, pathname, setNavbarVisible });

  useEffect(() => {
    if (window.gtag) {
      window.gtag("config", "G-GFHYHS0PBP", { page_path: pathname });
    }
  }, [pathname]);

  // Render
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
      {/* Navbar */}
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
      {/* Back to Top & Floating Buttons */}
      <BackToTopButton
        isBlueSection={isBlueSection}
        scrollProgress={scrollProgress}
        show={showBackToTop}
      />
      <FloatingContactButtons isBlueSection={isBlueSection} />
      {/* Main Content & Footer */}
      <div
        ref={smootherRef}
        id="smooth-wrapper"
        className={showSmoother ? undefined : "hidden"}
      >
        <div className="smoother-content">
          <main
            className={`relative z-10 ${
              pathname !== "/registration-form" ? " pt-20" : ""
            }`}
            // style={{
            //   opacity:
            //     pathname === "/registration-form" ? 1 : showOnlyFooter ? 0 : 1,
            //   pointerEvents:
            //     pathname === "/registration-form"
            //       ? "auto"
            //       : showOnlyFooter
            //         ? "none"
            //         : "auto",
            //   transition: "opacity 0.2s",
            // }}
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
    </>
  );
};

export default ClientLayout;
