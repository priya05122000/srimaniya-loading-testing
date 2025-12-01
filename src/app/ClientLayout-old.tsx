"use client";

import React, { ReactNode, Suspense, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackToTopButton from "@/components/common/BackToTopButton";
import FloatingContactButtons from "@/components/common/FloatingContactButtons";
import "react-toastify/dist/ReactToastify.css";
import Script from "next/script";

interface ClientLayoutProps {
  children: ReactNode;
  showSmoother?: boolean;
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


const ClientLayout: React.FC<ClientLayoutProps> = ({
  children,
  showSmoother = true,
}) => {
  const pathname = usePathname();

  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-GFHYHS0PBP"
      />
      <Script id="google-analytics" strategy="afterInteractive">
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
      {/* Always show Navbar except on /registration-form */}
      {pathname !== "/registration-form" && <Navbar />}
      {/* Always show BackToTopButton and FloatingContactButtons */}
      <BackToTopButton isBlueSection={false} scrollProgress={0} show={false} />
      <FloatingContactButtons isBlueSection={false} />
      <div id="smooth-wrapper" className={showSmoother ? undefined : "hidden"}>
        <div className="smoother-content">
          <main className={`relative z-10${pathname !== "/registration-form" ? " pt-20" : ""}`}>
            {children}
          </main>
          <Suspense fallback={<div>Loading...</div>}>
            <div>
              {pathname !== "/registration-form" && <Footer />}
            </div>
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default ClientLayout;
