import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import Script from "next/script";
import GlobalLoaderProvider from "@/providers/GlobalLoaderProvider";
import GlobalLoader from "@/components/GlobalLoader";
import AnalyticsListener from "./analytics-listener";
import { Suspense } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-plus-jakarta",
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
    <html lang="en">
      <head>

        <meta name="google-site-verification" content="MBrN2i_3C1_R_3fLCH95BtHXL-j9n2ipNYmByFZLu6w" />

        {/* GA4 Script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GFHYHS0PBP"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GFHYHS0PBP');
          `}
        </Script>

        <link
          rel="stylesheet"
          href="https://www.srimaniyainstitute.in/css/f84e46655353ea6a.css"
          precedence="default"
        />
        <link
          rel="stylesheet"
          href="https://www.srimaniyainstitute.in/css/f040a396bfcf60e2.css"
          precedence="default"
        />
        <link
          rel="stylesheet"
          href="https://www.srimaniyainstitute.in/css/0c535f7b5bca7f9a.css"
          precedence="default"
        />

        <Script
          src="https://www.srimaniyainstitute.in/chunks/1255-83cb42014f6de1e2.js"
          type="module"
          strategy="afterInteractive"
        />
        <Script
          src="https://www.srimaniyainstitute.in/chunks/1255-83cb42014f6de1e2.legacy.js"
          noModule
          strategy="afterInteractive"
        />

      </head>

      <body className={`${plusJakarta.variable} ${inter.variable} antialiased`}>
        <Suspense fallback={null}>
          <AnalyticsListener />
        </Suspense>

        <GlobalLoaderProvider>
          <GlobalLoader />
          <ClientLayout>{children}</ClientLayout>
        </GlobalLoaderProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
