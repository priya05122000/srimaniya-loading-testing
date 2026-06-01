"use client";
import React, { useEffect } from "react";
import Span from "@/components/common/Span";
import Heading from "@/components/common/Heading";
import Section from "@/components/common/Section";

// --- Utility: Responsive Video Component (reusable) ---
// const ShowReelVideo: React.FC<{ className?: string }> = ({ className }) => (
//   <video
//     src="/videos/reelvideo.mp4"
//     autoPlay
//     muted
//     loop
//     playsInline
//     className={className || "w-full h-full object-cover border-0"}
//   />
// );

const ShowReelVideo: React.FC<{ className?: string }> = ({ className }) => {
  const [loadVideo, setLoadVideo] = React.useState(false);
  const [videoReady, setVideoReady] = React.useState(false);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let trigger: any = null;
    (async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      trigger = ScrollTrigger.create({
        trigger: ".reveal-section",
        start: "top 80%",
        once: true,
        onEnter: () => setLoadVideo(true),
      });
    })();
    return () => trigger?.kill();
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Poster Image */}
      {!videoReady && (
        <img
          src="home/enquireform.webp"
          alt="Sri Maniya Institute"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Load Video Only After Scroll Trigger */}
      {loadVideo && (
        <video
          src="/videos/reelvideo.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          onCanPlay={() => setVideoReady(true)}
          className={`
            w-full h-full object-cover border-0
            transition-opacity duration-500
            ${videoReady ? "opacity-100" : "opacity-0"}
            ${className || ""}
          `}
        />
      )}
    </div>
  );
};

// --- Utility: Masked SVG Overlay (reusable) ---
const MaskedSVGOverlay: React.FC = () => (
  <svg className="hidden sm:block absolute inset-0 w-full h-full aspect-square">
    <defs>
      <pattern
        id="grid-pattern"
        width="160"
        height="80"
        patternUnits="userSpaceOnUse"
      >
        <image
          href="/designs/grainy.svg"
          x="0"
          y="0"
          width="160"
          className="image-tag"
          height="80"
          preserveAspectRatio="none"
        />
        <rect width="160" height="80" fill="transparent" />
        <path
          d="M 160 0 L 0 0 0 80"
          fill="none"
          stroke="#0B2351"
          strokeWidth="1.5"
          opacity="0.25"
        />
      </pattern>
      <mask id="rect-mask">
        <rect width="100%" height="100%" fill="white" />
        <rect
          id="mask-rect"
          x="50%"
          y="50%"
          width="300"
          height="150"
          fill="black"
          transform="translate(-150, -75)"
        />
      </mask>
    </defs>
    <g mask="url(#rect-mask)">
      <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      <rect width="100%" height="100%" fill="#EEECEA" fillOpacity="0.7" />
    </g>
  </svg>
);

export default function ShowReel() {
  useEffect(() => {
    if (window.innerWidth < 640) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let tl: any = null;
    (async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      const rect = document.querySelector<SVGRectElement>("#mask-rect");
      const leftText = document.querySelector<HTMLElement>("#left-text");
      const rightText = document.querySelector<HTMLElement>("#right-text");
      if (rect && leftText && rightText) {
        tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".reveal-section",
            start: "top top",
            end: "bottom top",
            scrub: true,
            pin: true,
          },
        });
        tl.to(rect, { scale: 8, transformOrigin: "50% 50%", ease: "none" });
        tl.to(leftText, { x: "-1000", ease: "none" }, "<");
        tl.to(rightText, { x: "1000", ease: "none" }, "<");
        setTimeout(() => ScrollTrigger.refresh(), 500);
      }
    })();
    return () => {
      tl?.scrollTrigger?.kill();
      tl?.kill();
    };
  }, []);

  return (
    <>
      <section className="hidden relative h-screen reveal-section sm:flex items-center justify-center overflow-x-hidden">
        {/* Background Video */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <ShowReelVideo />
          </div>
        </div>
        {/* Text + Overlay only on sm and up */}
        <div className="hidden sm:block relative z-10 w-full">
          <div className="grid grid-cols-3 xl:grid-cols-[2fr_1fr_2fr] items-center gap-14 lg:gap-10">
            <div id="left-text" className="text-end">
              <Span className="text-(--blue)">Started in </Span>
              <Heading level={3} className="text-(--blue)">
                1984
              </Heading>
            </div>
            <div className="relative w-full h-[150px] overflow-hidden"></div>
            <div id="right-text">
              <Span className="text-(--blue)">
                Institute of Hotel Management
              </Span>
              <Heading level={3} className="text-(--blue)">
                Sri Maniya <br /> Institute
              </Heading>
            </div>
          </div>
        </div>
        {/* SVG Overlay with Mask only on sm+ */}
        <MaskedSVGOverlay />
      </section>
      <Section className="block sm:hidden py-10 ">
        <div className="text-end">
          <Span className="text-(--blue)">Started in </Span>
          <Heading level={3} className="text-(--blue)">
            1984
          </Heading>
        </div>
        <div className="my-6">
          <ShowReelVideo />
        </div>
        <div>
          <Span className="text-(--blue)">Institute of Hotel Management</Span>
          <Heading level={3} className="text-(--blue)">
            Sri Maniya Institute
          </Heading>
        </div>
      </Section>
    </>
  );
}
