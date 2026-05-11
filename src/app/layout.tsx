import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import type { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";

import "./globals.css";
import GTM from "@/components/GTM";

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

  alternates: {
    canonical: "/",
  },

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
  display: "swap",
  variable: "--font-jakarta",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${plusJakarta.variable} ${inter.variable} font-inter antialiased`}
      >
        <GTM />

        {children}
      </body>
    </html>
  );
}
