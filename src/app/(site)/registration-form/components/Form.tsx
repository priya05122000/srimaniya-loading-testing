"use client";

import Image from "next/image";
import { ArrowLeft } from "@/components/icons/Icons";
import { useRouter } from "next/navigation";

import Paragraph from "@/components/common/Paragraph"
import Link from "next/link";
import RegistrationFormInner from "./RegistrationFormInner";

// -------------------- Contact Info Component --------------------
const ContactInfo = () => (
  <div className="contact-info mt-8 sm:text-center text-white text-base">
    <Paragraph size="base" className="mb-1">
      Phone :
      <a href="tel:+918903864444" className="ml-1" hrefLang="en">
        +91 89038 64444
      </a>
    </Paragraph>
    <Paragraph size="base" className="mb-1 hidden sm:block">
      Email :
      <a
        href="mailto:admission@srimaniyainstitute.in"
        hrefLang="en"
        className="ml-1"
      >
        admission@srimaniyainstitute.in
      </a>
      <span className="mx-1">|</span>
      Website :
      <Link href="/" className="ml-1" hrefLang="en">
        www.srimaniyainstitute.in
      </Link>
    </Paragraph>
    <Paragraph size="base" className="mb-1 block sm:hidden">
      Email :
      <a
        href="mailto:admission@srimaniyainstitute.in"
        hrefLang="en"
        className="ml-1"
      >
        admission@srimaniyainstitute.in
      </a>
    </Paragraph>
    <Paragraph size="base" className="mb-1 block sm:hidden">
      Website :
      <a
        href="https://srimaniyainstitute.in"
        hrefLang="en"
        target="_blank"
        rel="noopener noreferrer"
        className="ml-1"
      >
        www.srimaniyainstitute.in
      </a>
    </Paragraph>
    <Paragraph size="base" className="mb-1">
      Address : No: 6/66-D1, Government Hospital Road, Kanyakumari, Tamil Nadu -
      629702.
    </Paragraph>
  </div>
);

// -------------------- Main Form Component --------------------
const Form: React.FC = () => {
  const router = useRouter();


  const handleBack = () => router.back();

  // --- Render ---
  return (
    <div className="bg-(--blue) min-h-screen" data-section>
      <div className="p-6">
        <button
          type="button"
          className="border rounded-full p-2 md:p-3 cursor-pointer"
          onClick={handleBack}
        >
          <ArrowLeft aria-label="Back" />
        </button>
      </div>
      <div className="relative flex items-center justify-center pb-8 px-2">
        <div className="w-full max-w-3xl md:max-w-4xl lg:max-w-6xl rounded-lg px-4 md:px-8">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <Image
              src="/logos/navbarlogo.png"
              alt="Logo"
              width={376}
              height={94}
              className="w-48 md:w-72 image-tag"
              priority
            />
          </div>
          {/* Heading */}
          {/* <Heading level={4} className="mb-8 ">Student Enquire Form</Heading> */}
          <h1 className="text-3xl font-jakarta sm:text-4xl lg:text-5xl font-bold mb-8 ">
            Student Admission Form
          </h1>
          <RegistrationFormInner />
          <ContactInfo />
        </div>
      </div>
    </div>
  );
};

export default Form;
