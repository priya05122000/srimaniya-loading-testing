export const GA_TRACKING_ID = "G-GFHYHS0PBP"; // your GA ID

// Pageview – send to GA
export const pageview = (url: string) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("config", GA_TRACKING_ID, {
            page_path: url,
        });
    }
};
