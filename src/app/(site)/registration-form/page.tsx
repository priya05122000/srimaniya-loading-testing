import React, { Suspense } from "react";
import type { Metadata } from "next";
import Form from "./components/Form";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://srimaniyainstitute.in";

export const metadata: Metadata = {
  alternates: {
    canonical: `${BASE_URL}/registration-form`,
  },
  title: "Student Admission Form | Sri Maniya Institute",
  description:
    "Apply for admission to Sri Maniya Institute of Hotel Management, Kanyakumari. Fill the student admission form to start your hospitality career with internships from day one and 100% placement support.",
  openGraph: {
    title: "Student Admission Form | Sri Maniya Institute",
    description:
      "Apply for admission to Sri Maniya Institute of Hotel Management, Kanyakumari. Start your hospitality career with internships from day one and 100% placement support.",
    url: `${BASE_URL}/registration-form`,
    siteName: "Sri Maniya Institute",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Student Admission Form | Sri Maniya Institute",
    description:
      "Apply for admission to Sri Maniya Institute of Hotel Management, Kanyakumari.",
  },
};

const Page = () => {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${BASE_URL}/registration-form`,
      url: `${BASE_URL}/registration-form`,
      name: "Student Admission Form | Sri Maniya Institute",
      description:
        "Online admission form for Sri Maniya Institute of Hotel Management, Kanyakumari.",
      inLanguage: "en",
      isPartOf: { "@type": "WebSite", url: BASE_URL },
      publisher: {
        "@type": "CollegeOrUniversity",
        name: "Sri Maniya Institute of Hotel Management",
        url: BASE_URL,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "Registration Form",
          item: `${BASE_URL}/registration-form`,
        },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Server-rendered supporting content so the page ships real text, not
          just a form shell. */}
      <section className="sr-only">
        <h1>Sri Maniya Institute Student Admission Form</h1>
        <h2>How to apply for hotel management admission</h2>
        <p>
          Use this form to apply for admission to Sri Maniya Institute of Hotel
          Management in Kanyakumari, Tamil Nadu. Enter the student and parent
          details, contact information, and address, then submit the form. Our
          admissions team will contact you with course options, eligibility,
          fee structure, and the next steps for enrolment.
        </p>
        <h2>What you need</h2>
        <p>
          Keep the student&rsquo;s full name, a working mobile number and email
          address, the parent or guardian&rsquo;s name and phone number, and
          your residential address with city, state, district, and PIN code
          ready before you begin. Admission and fee details are shared after the
          enquiry form is submitted.
        </p>
        <h2>Why study at Sri Maniya Institute</h2>
        <p>
          Sri Maniya Institute offers hands-on hotel management and catering
          training with internships from the first year, an industry-aligned
          curriculum, experienced faculty, and 100% placement support across
          hotels, cruise lines, airlines, and resorts in India and abroad.
        </p>
        <p>
          For help with your application, call +91 89038 64444 or email
          admission@srimaniyainstitute.in.
        </p>
      </section>

      <Suspense fallback={<div>Loading...</div>}>
        <Form />
      </Suspense>
    </>
  );
};

export default Page;
