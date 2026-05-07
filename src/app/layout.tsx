import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import type { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";

import "./globals.css";
import AnalyticsListener from "./analytics-listener";

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
        {/* Google Analytics + Google Ads */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GFHYHS0PBP"
          strategy="afterInteractive"
        />

        <Script id="google-tags" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];

            function gtag() {
              dataLayer.push(arguments);
            }

            window.gtag = gtag;

            gtag('js', new Date());

            gtag('config', 'G-GFHYHS0PBP', {
              send_page_view: false,
            });

            gtag('config', 'AW-17863144213');
          `}
        </Script>

        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({
                'gtm.start': new Date().getTime(),
                event:'gtm.js'
              });

              var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),
                  dl=l!='dataLayer'?'&l='+l:'';

              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;

              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TLLR36TQ');
          `}
        </Script>

        {/* Facebook Pixel */}
        <Script id="facebook-pixel" strategy="lazyOnload">
          {`
            !(function(f,b,e,v,n,t,s){
              if(f.fbq) return;

              n=f.fbq=function(){
                n.callMethod
                  ? n.callMethod.apply(n,arguments)
                  : n.queue.push(arguments);
              };

              if(!f._fbq) f._fbq=n;

              n.push=n;
              n.loaded=true;
              n.version='2.0';
              n.queue=[];

              t=b.createElement(e);
              t.async=true;
              t.src=v;

              s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s);

            })(
              window,
              document,
              'script',
              'https://connect.facebook.net/en_US/fbevents.js'
            );

            fbq('init', '1590176728705087');
            fbq('track', 'PageView');
          `}
        </Script>

        {/* GTM NoScript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TLLR36TQ"
            height="0"
            width="0"
            style={{
              display: "none",
              visibility: "hidden",
            }}
          />
        </noscript>

        {/* Facebook Pixel NoScript */}
        <noscript>
          <img
            src="https://www.facebook.com/tr?id=1590176728705087&ev=PageView&noscript=1"
            alt=""
            height="1"
            width="1"
            style={{ display: "none" }}
          />
        </noscript>

        <Suspense fallback={null}>
          <AnalyticsListener />
        </Suspense>

        {children}
      </body>
    </html>
  );
}
