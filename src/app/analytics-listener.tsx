"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function AnalyticsListener() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        const url =
            pathname + (searchParams?.toString() ? `?${searchParams}` : "");

        if (typeof window !== "undefined" && window.gtag) {
            window.gtag("config", "G-GFHYHS0PBP", {
                page_path: url,
            });
        }
    }, [pathname, searchParams]);

    return null;
}
