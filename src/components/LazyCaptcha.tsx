"use client";

import { useEffect, useRef, useState } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

interface LazyCaptchaProps {
  children: React.ReactNode;
  form?: string;
}

export default function LazyCaptcha({ children, form }: LazyCaptchaProps) {
  const [load, setLoad] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: form === "contact-us" ? "100px" : "300px",
        threshold: 0.1,
      }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [form]);

  return (
    <div ref={ref} className="h-full w-full">
      {load && (
        <GoogleReCaptchaProvider
          reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
          scriptProps={{
            async: true,
            defer: true,
          }}
        >
          {children}
        </GoogleReCaptchaProvider>
      )}
    </div>
  );
}