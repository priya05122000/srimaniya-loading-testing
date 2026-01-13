import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import Script from "next/script";
import GlobalLoaderProvider from "@/providers/GlobalLoaderProvider";
import ConditionalGlobalLoader from "@/components/ConditionalGlobalLoader";
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
        <meta
          name="google-site-verification"
          content="MBrN2i_3C1_R_3fLCH95BtHXL-j9n2ipNYmByFZLu6w"
        />

        {/* GA4 Script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GFHYHS0PBP"
          strategy="lazyOnload"
        />

        <Script id="gtag-init" strategy="lazyOnload">
          {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-GFHYHS0PBP', { send_page_view: false });
  `}
        </Script>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-5RZZ4B5Z');
            `,
          }}
        />
      </head>

      <body className={`${plusJakarta.variable} ${inter.variable} antialiased`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5RZZ4B5Z"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Suspense fallback={null}>
          <AnalyticsListener />
        </Suspense>

        <GlobalLoaderProvider>
          <ConditionalGlobalLoader />
          <ClientLayout>{children}</ClientLayout>
        </GlobalLoaderProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
