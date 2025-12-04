"use client";

import React, { useEffect, useState, useRef, ReactNode, Suspense } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap/ScrollSmoother";
import { ToastContainer } from "react-toastify";
import { useGlobalLoader } from "@/providers/GlobalLoaderProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackToTopButton from "@/components/common/BackToTopButton";
import FloatingContactButtons from "@/components/common/FloatingContactButtons";
import "react-toastify/dist/ReactToastify.css";
import Script from "next/script";

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
    </>
  );
};

export default ClientLayout;
