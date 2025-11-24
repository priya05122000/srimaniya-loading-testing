import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import Script from "next/script";
import GlobalLoaderProvider from "@/providers/GlobalLoaderProvider";
import GlobalLoader from "@/components/GlobalLoader";

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
      <body
        className={`${plusJakarta.variable} ${inter.variable} antialiased`}
      >
        <GlobalLoaderProvider>
          <GlobalLoader />
          <ClientLayout>{children}</ClientLayout>
        </GlobalLoaderProvider>
      </body>
    </html>
  );
}
