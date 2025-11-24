import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import React, { createContext } from "react";
import ClientLayout from "./ClientLayout";

export const LoadingContext = createContext({
  loading: false,
  setLoading: (_value: boolean) => {}
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-plus-jakarta",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-inter",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-H79NPYM0EX"
          strategy="afterInteractive"
        />
        <Script id="ga" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-H79NPYM0EX', { anonymize_ip: true });
          `}
        </Script>
      </head>
      <body className="antialiased">
        {/* All client logic moves inside ClientLayout */}
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
