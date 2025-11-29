"use client";

import React, { useState, useRef, useEffect } from "react";

interface CollapsibleHTMLProps {
    html: string;
    maxHeight?: number; // base height (default 200)
}

const CollapsibleHTML: React.FC<CollapsibleHTMLProps> = ({
    html,
    maxHeight = 300,
}) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [currentHeight, setCurrentHeight] = useState(maxHeight);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const [expandedFully, setExpandedFully] = useState(false);

    useEffect(() => {
        if (contentRef.current) {
            setIsOverflowing(contentRef.current.scrollHeight > maxHeight);
        }
    }, [html, maxHeight]);

    const handleToggle = () => {
        const el = contentRef.current;
        if (!el) return;

        // Full height of content
        const fullHeight = el.scrollHeight;

        if (expandedFully) {
            // Collapse
            const topBeforeCollapse = el.getBoundingClientRect().top + window.scrollY;
            setCurrentHeight(maxHeight);
            setExpandedFully(false);

            // Smooth scroll back up
            setTimeout(() => {
                window.scrollTo({
                    top: topBeforeCollapse - 100,
                    behavior: "smooth",
                });
            }, 300);
        } else {
            // Expand fully
            setCurrentHeight(fullHeight);
            setExpandedFully(true);
        }
    };

    return (
        <div className="relative">
            <div
                ref={contentRef}
                className="transition-all duration-500 overflow-hidden"
                style={{
                    maxHeight: `${currentHeight}px`,
                }}
            >
                <div
                    className="leading-relaxed text-(--dark) text-base text-justify "
                    dangerouslySetInnerHTML={{ __html: html }}
                />
            </div>

            {isOverflowing && (
                <div className="mt-3 text-end">
                    <button
                        onClick={handleToggle}
                        className=" font-medium cursor-pointer transition-all duration-300 text-(--dark)"
                    >
                        {expandedFully ? "View Less ▲" : "View More ▼"}
                    </button>
                </div>
            )}

            {!expandedFully && isOverflowing && (
                <div className="absolute bottom-8 left-0 w-full h-16 bg-linear-to-t from-[#eeecea] to-transparent pointer-events-none" />
            )}
        </div>
    );
};

export default CollapsibleHTML;
