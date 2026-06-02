"use client";

import { useEffect } from "react";

export default function GTM() {
  useEffect(() => {
    let loaded = false;

    const load = () => {
      if (loaded) return;
      loaded = true;

      const events = ["mousedown", "touchstart", "scroll", "keydown"];
      events.forEach((e) => window.removeEventListener(e, load));
      clearTimeout(fallbackTimer);

      (window as { dataLayer?: object[] }).dataLayer =
        (window as { dataLayer?: object[] }).dataLayer || [];
      (window as unknown as { dataLayer: object[] }).dataLayer.push({
        "gtm.start": new Date().getTime(),
        event: "gtm.js",
      });

      const script = document.createElement("script");
      script.async = true;
      script.src =
        "https://www.googletagmanager.com/gtm.js?id=GTM-TLLR36TQ";
      document.head.appendChild(script);
    };

    const events = ["mousedown", "touchstart", "scroll", "keydown"];
    events.forEach((e) =>
      window.addEventListener(e, load, { passive: true, once: true })
    );

    // Fallback: load after 5 s even without interaction
    const fallbackTimer = setTimeout(load, 5000);

    return () => {
      clearTimeout(fallbackTimer);
      events.forEach((e) => window.removeEventListener(e, load));
    };
  }, []);

  return (
    <noscript>
      <iframe
        src="https://www.googletagmanager.com/ns.html?id=GTM-TLLR36TQ"
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}
