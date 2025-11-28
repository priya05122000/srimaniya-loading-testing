"use client";

import React, { ReactNode } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useGlobalLoader } from "@/providers/GlobalLoaderProvider";
import GSAPScrollSmoother from "@/components/GSAPScrollSmoother";
import { ToastContainer } from "react-toastify";
import BackToTopButton from "@/components/common/BackToTopButton";
import FloatingContactButtons from "@/components/common/FloatingContactButtons";
import { usePathname } from "next/navigation";

interface ClientLayoutProps {
  children: ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const { loading } = useGlobalLoader();
  const pathname = usePathname();

  // State for BackToTopButton
  const [showBackToTop, setShowBackToTop] = React.useState(false);
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const [isBlueSection, setIsBlueSection] = React.useState(false); // Adjust logic as needed

  React.useEffect(() => {
    if (!loading) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [loading]);

  // Scroll-related logic for progress and blue section detection
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0);
      setShowBackToTop(window.scrollY > 500);

      const blueSections =
        document.querySelectorAll<HTMLElement>("[data-section]");
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
  }, []);


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
      {pathname !== "/registration-form" && <Navbar />}
      <BackToTopButton
        isBlueSection={isBlueSection}
        scrollProgress={scrollProgress}
        show={showBackToTop}
      />
      <FloatingContactButtons isBlueSection={isBlueSection} />
      <GSAPScrollSmoother loading={loading}>
        <main className="relative z-10 pt-20">
          {children}
        </main>

        {pathname !== "/registration-form" && <Footer />}
      </GSAPScrollSmoother>
    </>
  );
};

export default ClientLayout;
