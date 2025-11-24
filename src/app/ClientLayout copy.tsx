"use client";

import React, {
  useEffect,
  useState,
  useRef,
  ReactNode,
  Suspense,
  useContext,
} from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap/ScrollSmoother";
import { ToastContainer } from "react-toastify";
import { LoadingContext } from "@/app/layout";
import Navbar from "@/components/Navbar";
import AOSInit from "@/components/AOSInit";
import Footer from "@/components/Footer";
import BackToTopButton from "@/components/BackToTopButton";
import FloatingContactButtons from "@/components/FloatingContactButtons";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

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
  const { loading } = useContext(LoadingContext);

  // State
  const [isBlueSection, setIsBlueSection] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
  const [showOnlyFooter, setShowOnlyFooter] = useState<boolean>(true);
  const [footerVisible, setFooterVisible] = useState<boolean>(false);
  const [navbarVisible, setNavbarVisible] = useState<boolean>(true);

  // Initialize ScrollSmoother for desktop
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
  }, [loading]);

  // Scroll to top when loading finishes
  useEffect(() => {
    if (!loading) window.scrollTo(0, 0);
  }, [loading]);

  // Scroll-related logic for progress and blue section detection
  useEffect(() => {
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

  // Footer-only reveal logic for desktop and non-home pages
  useEffect(() => {
    if (typeof window === "undefined") return;

    // if (
    //   window.innerWidth < 1024 ||
    //   pathname === "/" ||
    //   loading ||
    //   window.location.hash === "#enquire-form" ||
    //   window.location.search.startsWith("?course=")
    // ) {
    //   setShowOnlyFooter(false);
    //   setFooterVisible(true);
    //   return;
    // }

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
  }, [loading, pathname]);

  // Navbar visibility based on footer intersection
  useEffect(() => {
    if (typeof window === "undefined") return;
    const footer = document.getElementById("footer");
    if (!footer) return;
    let observer: IntersectionObserver | null = null;
    observer = new window.IntersectionObserver(
      ([entry]) => {
        if (pathname === "/") {
          setNavbarVisible(true);
        } else {
          setNavbarVisible(entry.intersectionRatio < 0.5);
        }
      },
      { root: null, threshold: 0.5 }
    );
    observer.observe(footer);
    return () => {
      if (observer && footer) observer.unobserve(footer);
    };
  }, [footerVisible, pathname]);

  // Render
  return (
    <>
      <AOSInit />
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
      {pathname !== "/registration-form" && (
        <>
          <div className="block lg:hidden">{navbarVisible && <Navbar />}</div>
          <div className="hidden lg:block">
            {/* {pathname !== "/" && navbarVisible && <Navbar />} */}
            {navbarVisible && <Navbar />}
          </div>
        </>
      )}
      {/* <Navbar /> */}

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
            className={`relative z-10 ${pathname !== "/registration-form" ? " pt-[80px]" : ""
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
              {/* <Footer /> */}
              {/* {pathname !== "/" && <Footer />} */}
              {pathname !== "/registration-form" && <Footer />}
            </div>
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default ClientLayout;
