import { useEffect, useRef } from "react";

const SKIP_PATHS = ["/", "/registration-form"];

export function useFooterScroll(
  pathname: string,
  setNavbarVisible: (v: boolean) => void,
  setPageVisible: (v: boolean) => void
) {
  const isFirstMount = useRef(true);

  useEffect(() => {
    setNavbarVisible(true);

    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    if (
      SKIP_PATHS.includes(pathname) ||
      window.location.hash === "#enquire-form"
    ) {
      return;
    }

    const run = async () => {
      const [{ default: ScrollTrigger }, { default: ScrollSmoother }] =
        await Promise.all([
          import("gsap/ScrollTrigger"),
          import("gsap/ScrollSmoother"),
        ]);

      ScrollTrigger.refresh();
      setPageVisible(true);

      const smoother = ScrollSmoother.get();
      const bottom = document.body.scrollHeight;

      if (smoother) {
        smoother.scrollTo(bottom, false);
      } else {
        window.scrollTo(0, bottom);
      }

      setTimeout(() => {
        if (smoother) {
          smoother.scrollTo(0, true);
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 80);
    };

    const timer = setTimeout(run, 150);

    return () => {
      clearTimeout(timer);
      setPageVisible(true);
    };
  }, [pathname]);
}
