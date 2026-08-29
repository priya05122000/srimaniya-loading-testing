import React from "react";
import type { Metadata } from "next";
import ContactPage from "./ContactPage";
import { getAllSiteInfo } from "@/services/siteInfoService";
import { SiteInfo } from "@/types";

export const metadata: Metadata = {
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/contact-us`,
  },

  title: "Hotel Management Institute Near Me | Tamil Nadu",
  description:
    "Have questions about admissions or courses? Reach Sri Maniya Institute in Kanyakumari — we're just a call away. Contact us today!",
  keywords: [
    "sri maniya institute contact",
    "hotel management institute contact Tamil Nadu",
    "institute of hotel management near me",
    "hotel management colleges in near me",
    "Best hotel management courses near me",
    "Sri Maniya Institute Tamil Nadu",
    "Sri Maniya Institute contact number",
    "Sri Maniya Institute Nagercoil",
    "Sri Maniya Institute near me",
    "hotel management institute location details",
    "hospitality institute contact Tamil Nadu",
    "Sri Maniya Institute enquiry form",
  ],

  openGraph: {
    title: "Hotel Management Institute Near Me | Tamil Nadu",
    description:
      "Have questions about admissions or courses? Reach Sri Maniya Institute in Kanyakumari — we're just a call away. Contact us today!",
    url: "https://srimaniyainstitute.in/contact-us",
    siteName: "Sri Maniya Institute",
    images: [
      {
        url: "https://srimaniyainstitute.in/contact-us/contact.webp",
        width: 1200,
        height: 630,
        alt: "Sri Maniya Institute of Hotel Management",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Hotel Management Institute Near Me | Tamil Nadu",
    description:
      "Have questions about admissions or courses? Reach Sri Maniya Institute in Kanyakumari — we're just a call away. Contact us today!",
    images: ["https://srimaniyainstitute.in/contact-us/contact.webp"],
  },
};

const page = async () => {
  const BASE_URL = "https://srimaniyainstitute.in";

  let siteInfo: SiteInfo | null = null;
  try {
    const result = await getAllSiteInfo();
    const data = result?.data;
    if (Array.isArray(data) && data.length > 0) siteInfo = data[0];
  } catch (error) {
    console.error("Error fetching site info:", error);
  }

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "@id": `${BASE_URL}/contact-us#contactpage`,
      url: `${BASE_URL}/contact-us`,
      name: "Contact Sri Maniya Institute",
      description:
        "Contact Sri Maniya Institute of Hotel Management for admissions, course details, and support.",
      mainEntity: {
        "@type": "EducationalOrganization",
        "@id": `${BASE_URL}/#organization`,
        name: "Sri Maniya Institute of Hotel Management",
        url: BASE_URL,
        email: "admission@srimaniyainstitute.in",
        telephone: "+91 89038 64444",
        address: {
          "@type": "PostalAddress",
          streetAddress: "No: 6/66-D1, Government Hospital Road",
          addressLocality: "Kanyakumari",
          addressRegion: "Tamil Nadu",
          postalCode: "629702",
          addressCountry: "IN",
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "admissions",
          telephone: "+91 89038 64444",
          email: "admission@srimaniyainstitute.in",
          availableLanguage: ["English", "Tamil"],
          hoursAvailable: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],
            opens: "09:30",
            closes: "17:30",
          },
        },
      },
    },

    // ✅ FAQ (matches the visible Q&A on the page)
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${BASE_URL}/contact-us#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "Where is Sri Maniya Institute of Hotel Management located?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The institute is at No: 6/66-D1, Government Hospital Road, Kanyakumari, Tamil Nadu - 629702. It is close to Kanyakumari town and the railway and bus stands, with easy road access from Nagercoil, Trivandrum and other parts of South Tamil Nadu.",
          },
        },
        {
          "@type": "Question",
          name: "How do I reach the campus?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "From Kanyakumari bus stand or railway station the campus is a short drive via Government Hospital Road. From Nagercoil it is about 20 km along the Kanyakumari road, and Trivandrum International Airport is roughly 85 km away.",
          },
        },
        {
          "@type": "Question",
          name: "What are the office hours for admission enquiries?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The admissions office is open Monday to Saturday, 9:30 AM to 5:30 PM. You can call or email any time and the team will respond on the next working day.",
          },
        },
        {
          "@type": "Question",
          name: "Can I visit the campus before applying?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Prospective students and parents are welcome to visit, see the training kitchens, restaurant and classrooms, and meet the faculty. Call ahead on +91 89038 64444 so the team can plan your visit.",
          },
        },
        {
          "@type": "Question",
          name: "How soon will I get a response after I submit an enquiry?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "An admissions counsellor usually calls or emails within one working day with course details, eligibility, fees and the next steps for enrolment.",
          },
        },
      ],
    },

    // ✅ Breadcrumb (IMPORTANT)
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: BASE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Contact Us",
          item: `${BASE_URL}/contact-us`,
        },
      ],
    },

  ];
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />
      <ContactPage siteInfo={siteInfo} />
    </>
  );
};

export default page;