import { useEffect } from "react";

interface NavbarVisibilityProps {
  footerVisible: boolean;
  pathname: string;
  setNavbarVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export function useNavbarVisibility({
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
