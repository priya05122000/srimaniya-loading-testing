"use client";

import React, { useRef, useEffect, ReactNode } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

interface GSAPScrollSmootherProps {
    children: ReactNode;
    loading?: boolean;
}

const GSAPScrollSmoother: React.FC<GSAPScrollSmootherProps> = ({
    children,
    loading,
}) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (loading) return;

        const width = window.innerWidth;

        // ❌ Disable smooth scroll on mobile (important)
        if (width < 1024) {
            const existing = ScrollSmoother.get();
            if (existing) existing.kill();

            document.body.style.overflow = "auto";
            return;
        }

        // 🧹 Clean up any previous instance before creating a new one
        const existing = ScrollSmoother.get();
        if (existing) existing.kill();

        // ✅ Desktop only smooth scroll
        if (wrapperRef.current && contentRef.current) {
            const smoother = ScrollSmoother.create({
                wrapper: wrapperRef.current,
                content: contentRef.current,
                smooth: 4,
                effects: true,
            });

            ScrollTrigger.refresh();

            return () => {
                smoother.kill();
            };
        }
    }, [loading]);

    return (
        <div
            id="smooth-wrapper"
            ref={wrapperRef}
            className="overflow-hidden will-change-transform"
        >
            <div
                id="smooth-content"
                ref={contentRef}
                className="will-change-transform"
            >
                {children}
            </div>
        </div>
    );
};

export default GSAPScrollSmoother;
