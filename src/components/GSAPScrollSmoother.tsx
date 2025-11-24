"use client";
import React, { useRef, useEffect, ReactNode } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
gsap.ticker.fps(60);
gsap.ticker.lagSmoothing(1000, 16);

interface GSAPScrollSmootherProps {
    children: ReactNode;
    loading?: boolean;
}

const GSAPScrollSmoother: React.FC<GSAPScrollSmootherProps> = ({ children, loading }) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (loading) return;
        const width = window.innerWidth;
        if (width < 1024) {
            const existing = ScrollSmoother.get();
            if (existing) existing.kill();
            document.body.style.overflow = "auto";
            return;
        }
        if (wrapperRef.current && contentRef.current) {
            const existing = ScrollSmoother.get();
            if (existing) existing.kill();
            const smoother = ScrollSmoother.create({
                wrapper: wrapperRef.current,
                content: contentRef.current,
                smooth: 2,
                effects: true,
            });
            ScrollTrigger.refresh();
            return () => {
                smoother.kill();
            };
        }
    }, [loading]);

    return (
        <div id="smooth-wrapper" ref={wrapperRef} className="overflow-hidden will-change-transform">
            <div id="smooth-content" ref={contentRef} className="will-change-transform">
                {children}
            </div>
        </div>
    );
};

export default GSAPScrollSmoother;
