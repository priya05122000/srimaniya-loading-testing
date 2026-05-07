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
  const [isBlueSection, setIsBlueSection] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useScrollLogic(setScrollProgress, setShowBackToTop, setIsBlueSection);
  

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
      <Navbar />
      <BackToTopButton
        isBlueSection={isBlueSection}
        scrollProgress={scrollProgress}
        show={showBackToTop}
      />
      <FloatingContactButtons isBlueSection={isBlueSection} />
      <main className={`relative z-10 pt-20`}>{children}</main>
      <Footer />
    </>
  );
};

export default ClientLayout;
