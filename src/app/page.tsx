import type { Metadata } from "next";
import HomePage from "./home/page";

export const metadata: Metadata = {
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL,
  },

  title: "Best Hotel Management Colleges in Tamil Nadu - Sri Maniya",
  description:
    "Srimaniya is the best hotel management Institute in tamil nadu that offers  hotel management career options after 12th &10th graduation.",
  keywords: [
    // Primary keywords
    "Sri Maniya Institute of Hotel Management",
    "hotel management in tamil nadu",
    "best hotel management colleges near me",
    "career opportunities in hotel management",
    "hotel management courses near me",
    // Secondary keywords
    "hotel management degree fees",
    "hotel management diploma courses after 12th",
    "hotel management course fees after 12th",
    "sri maniya hotel management fees details",
    "sri maniya hotel management courses",
    "bsc in catering science and hotel management",
    "hospitality management courses in tamilnadu",
    "hotel management course scope",
    "hotel management course fees after 12th",
    "hotel management degree fees",
  ],

  openGraph: {
    title: "Best Hotel Management Colleges in Tamil Nadu - Sri Maniya",
    description:
      "Join Sri Maniya Institute of Hotel Management – top hotel management college in Tamil Nadu.",
    url: "https://srimaniyainstitute.in",
    siteName: "Sri Maniya Institute",
    images: [
      {
        url: "https://srimaniyainstitute.in/home/enquireform.webp",
        width: 1200,
        height: 630,
        alt: "Sri Maniya Institute of Hotel Management",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Best Hotel Management Colleges in Tamil Nadu - Sri Maniya",
    description:
      "Join Sri Maniya Institute of Hotel Management – top hotel management college in Tamil Nadu.",
    images: ["https://srimaniyainstitute.in/home/enquireform.webp"],
  },
};

export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Sri Maniya Institute of Hotel Management",
    url: "https://srimaniyainstitute.in/",
    logo: "https://srimaniyainstitute.in/logos/navbarlogo.png",
    address: {
      "@type": "PostalAddress",
      streetAddress: "No: 6/66-D1, Government Hospital Road",
      addressLocality: "Kanyakumari",
      addressRegion: "Tamil Nadu",
      postalCode: "629702",
      addressCountry: "IN",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91-8903864444",
        contactType: "admissions",
      },
    ],
    sameAs: [
      "https://www.instagram.com/srimaniya_institute",
      "https://www.facebook.com/SriManiyaInstitute",
      "https://www.youtube.com/@srimaniyainstitute",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />
      <HomePage />
    </>
  );
}
