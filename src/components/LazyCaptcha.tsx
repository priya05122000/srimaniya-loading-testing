"use client";

import { useEffect, useRef, useState } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

interface LazyCaptchaProps {
  children: React.ReactNode;
}

export default function LazyCaptcha({ children }: LazyCaptchaProps) {
  const [load, setLoad] = useState(false);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
    const el = ref.current;
    if (!el) return;
    const trigger = () => setLoad(true);
    el.addEventListener("pointerenter", trigger, { once: true });
    el.addEventListener("focusin", trigger, { once: true });
    return () => {
      el.removeEventListener("pointerenter", trigger);
      el.removeEventListener("focusin", trigger);
    };
  }, []);

  return (
    <div ref={ref} className="h-full w-full">
      {mounted && (load ? (
        <GoogleReCaptchaProvider
          reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
          scriptProps={{
            async: true,
            defer: true,
          }}
        >
          {children}
        </GoogleReCaptchaProvider>
      ) : (
        children
      ))}
    </div>
  );
}
