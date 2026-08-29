import React, { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
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
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "@id": `${BASE_URL}/registration-form#howto`,
      name: "How to apply for admission at Sri Maniya Institute of Hotel Management",
      description:
        "Steps to complete the student admission form and enrol in a hotel management course at Sri Maniya Institute, Kanyakumari.",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Fill the enquiry form",
          text: "Enter the student's name, mobile number, email, and location on this page and submit the form.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Talk to an admissions counsellor",
          text: "Our team calls you with course options, eligibility, fee structure and scholarship details.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Choose your course",
          text: "Select a diploma, pathway, degree or postgraduate hotel management programme based on your qualification and career goal.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Submit documents and pay the fee",
          text: "Provide your mark sheets, transfer certificate, ID and photographs, and pay the admission fee to confirm your seat.",
        },
        {
          "@type": "HowToStep",
          position: 5,
          name: "Join the batch",
          text: "Complete hostel formalities if required and start classes with first-year internship training.",
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${BASE_URL}/registration-form#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "Who is eligible to apply?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Students who have passed 10th or 12th standard (any stream) from a recognised board can apply. Diploma and pathway courses are open after 10th or 12th, degree courses after 12th, and postgraduate courses after a bachelor's degree.",
          },
        },
        {
          "@type": "Question",
          name: "What documents are required for admission?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You need your 10th and 12th mark sheets, transfer or school leaving certificate, community certificate if applicable, Aadhaar or other photo ID, passport-size photographs, and the degree certificate for postgraduate applicants.",
          },
        },
        {
          "@type": "Question",
          name: "Is there an entrance exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "There is no separate entrance exam. Admission is based on your qualifying marks and a short interaction with the admissions team.",
          },
        },
        {
          "@type": "Question",
          name: "When can I apply?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Applications are accepted through the year, with the main intake before the start of the academic session. Apply early as seats in each course are limited.",
          },
        },
        {
          "@type": "Question",
          name: "What happens after I submit the form?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "An admissions counsellor contacts you within one working day with course details, eligibility, fees, scholarships and the next steps for enrolment.",
          },
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

      <section className="sr-only">
        <h1>Sri Maniya Institute Student Admission Form</h1>
        <p>
          Use this page to apply for admission to Sri Maniya Institute of Hotel
          Management in Kanyakumari, Tamil Nadu. Enter the student and parent
          details, contact information and address, then submit the form. An
          admissions counsellor will call you with course options, eligibility,
          fee structure, scholarships and the next steps for enrolment.
        </p>

        <h2>The admission process</h2>
        <ol>
          <li>
            <strong>Submit the enquiry form</strong> on this page with the
            student&rsquo;s name, a working mobile number, email and location.
          </li>
          <li>
            <strong>Speak to an admissions counsellor</strong> who explains the
            available courses, eligibility, fees and scholarship options.
          </li>
          <li>
            <strong>Choose your course</strong> &mdash; a diploma, pathway,
            degree or postgraduate programme in hotel management and catering.
          </li>
          <li>
            <strong>Submit your documents</strong> and pay the admission fee to
            confirm your seat.
          </li>
          <li>
            <strong>Complete hostel formalities</strong> if needed and join the
            batch, with internship training from the first year.
          </li>
        </ol>

        <h2>Eligibility</h2>
        <ul>
          <li>
            A pass in <strong>10th or 12th standard</strong> from a recognised
            board (any stream) for diploma and pathway courses.
          </li>
          <li>
            A pass in <strong>12th standard</strong> for degree courses in
            catering science and hotel management.
          </li>
          <li>
            A <strong>bachelor&rsquo;s degree</strong> for postgraduate and PG
            diploma programmes.
          </li>
          <li>
            There is <strong>no separate entrance exam</strong> &mdash; admission
            is based on qualifying marks and a short interaction with the
            admissions team.
          </li>
        </ul>

        <h2>Documents required</h2>
        <ul>
          <li>10th and 12th mark sheets</li>
          <li>Transfer certificate or school leaving certificate</li>
          <li>Community certificate (if applicable)</li>
          <li>Aadhaar card or other government photo ID</li>
          <li>Recent passport-size photographs</li>
          <li>Degree certificate and consolidated mark sheet (for PG applicants)</li>
        </ul>
        <p>
          Keep the parent or guardian&rsquo;s name and phone number, and the
          residential address with city, state, district and PIN code ready
          before you begin. Fee and admission details are shared after the
          enquiry form is submitted.
        </p>

        <h2>Courses you can apply for</h2>
        <p>
          Sri Maniya Institute offers hotel management and catering programmes
          across four levels:
        </p>
        <ul>
          <li>
            <strong>Diploma courses</strong> in hotel management and catering
            technology for students after 10th or 12th.
          </li>
          <li>
            <strong>Pathway courses</strong> that lead into a full degree
            programme.
          </li>
          <li>
            <strong>Degree courses</strong> such as B.Sc in Catering Science and
            Hotel Management.
          </li>
          <li>
            <strong>Postgraduate courses</strong> for graduates who want to
            specialise and move into management roles.
          </li>
        </ul>
        <p>
          Every programme covers food production, food and beverage service,
          front office and housekeeping, with hands-on training in the kitchens,
          restaurant and hotel, plus internships from the first year and 100%
          placement support across hotels, resorts, cruise lines and airlines in
          India and abroad. See the full{" "}
          <Link href="/courses">list of hotel management courses</Link> for
          duration and fee details.
        </p>

        <h2>Need help with your application?</h2>
        <p>
          Call <a href="tel:+918903864444">+91 89038 64444</a> or email{" "}
          <a href="mailto:admission@srimaniyainstitute.in">
            admission@srimaniyainstitute.in
          </a>
          . The admissions office at No: 6/66-D1, Government Hospital Road,
          Kanyakumari, Tamil Nadu - 629702 is open Monday to Saturday, 9:30 AM to
          5:30 PM. You can also <Link href="/contact-us">contact us</Link> with
          any questions.
        </p>
      </section>

      <Suspense fallback={<div>Loading...</div>}>
        <Form />
      </Suspense>
    </>
  );
};

export default Page;
