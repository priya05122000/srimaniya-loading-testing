import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import type { Metadata } from "next";

import "./globals.css";
import GTM from "@/components/GTM";
import SitePreloader from "@/components/SitePreloader";
import { PRELOADER_BOOT_SCRIPT } from "@/lib/site-reveal";

export const metadata: Metadata = {
  metadataBase: new URL("https://srimaniyainstitute.in"),

  title: {
    default: "Sri Maniya Institute of Hotel Management",
    template: "%s | Sri Maniya Institute",
  },

  description:
    "Best hotel management institute in Tamil Nadu offering diploma, degree and placement support for students.",

  keywords: [
    "hotel management",
    "hotel management course Tamil Nadu",
    "hospitality course",
    "hotel management institute",
  ],

  verification: {
    google: "MBrN2i_3C1_R_3fLCH95BtHXL-j9n2ipNYmByFZLu6w",
  },

  // No site-wide canonical: each page sets its own. A canonical of "/" here was
  // inherited by every page without one (e.g. /registration-form) and pointed it at the home page.

  openGraph: {
    title: "Sri Maniya Institute of Hotel Management",
    description:
      "Build your career in hotel management with top training and placement support.",
    url: "https://srimaniyainstitute.in",
    siteName: "Sri Maniya Institute",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Sri Maniya Institute of Hotel Management",
    description:
      "Build your career in hotel management with top training and placement support.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "optional",
  variable: "--font-jakarta",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "optional",
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The preloader boot script adds a class to <html> before hydration.
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* First-load preloader boot — must run during parse, before paint. */}
        <script dangerouslySetInnerHTML={{ __html: PRELOADER_BOOT_SCRIPT }} />
      </head>
      <body
        className={`${plusJakarta.variable} ${inter.variable} font-inter antialiased`}
      >
        <GTM />

        {/* Without JS nothing would ever dismiss the loader. */}
        <noscript>
          <style>{`#site-preloader{display:none}`}</style>
        </noscript>
        <SitePreloader />

        {children}
      </body>
    </html>
  );
}
