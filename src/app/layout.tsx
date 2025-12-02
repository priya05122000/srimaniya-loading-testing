import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import Script from "next/script";
import GlobalLoaderProvider from "@/providers/GlobalLoaderProvider";
import GlobalLoader from "@/components/GlobalLoader";
import AnalyticsListener from "./analytics-listener";

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
      </head>

      <body className={`${plusJakarta.variable} ${inter.variable} antialiased`}>
        <AnalyticsListener /> {/* ⬅️ PAGE TRACKING HERE */}

        <GlobalLoaderProvider>
          <GlobalLoader />
          <ClientLayout>{children}</ClientLayout>
        </GlobalLoaderProvider>
      </body>
    </html>
  );
}
