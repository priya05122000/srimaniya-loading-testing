"use client";

import React, { useEffect, useState, useRef, ReactNode, Suspense } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { ToastContainer } from "react-toastify";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useScrollLogic } from "@/hooks/useScrollLogic";
import { useScrollSmoother } from "@/hooks/useScrollSmoother";
import { useFooterReveal } from "@/hooks/useFooterReveal";
import { useNavbarVisibility } from "@/hooks/useNavbarVisibility";

const BackToTopButton = dynamic(() => import("@/components/common/BackToTopButton"), { ssr: false });
const FloatingContactButtons = dynamic(() => import("@/components/common/FloatingContactButtons"), { ssr: false });

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
  const [, setShowOnlyFooter] = useState(true);
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
              pathname !== "/registration-form" ? " pt-20" : ""
            }`}
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
