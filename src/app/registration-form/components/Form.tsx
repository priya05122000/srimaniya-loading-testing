"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";

import Heading from "@/components/common/Heading";
import Paragraph from "@/components/common/Paragraph";

// Data
import districts from "./districts.json";
import { useRegistrationForm } from "@/app/registration-form/subcomponents/useRegistrationForm";
import CommonRegistrationFields, {
  AutofillSuppressionFields,
} from "@/app/registration-form/subcomponents/CommonRegistrationFields";
import type { RegistrationFormData } from "@/app/registration-form/subcomponents/useRegistrationForm";
import { ValidateRegistrationFormWithToast } from "@/app/registration-form/subcomponents/registrationFormValidation";
import Link from "next/link";
import LazyCaptcha from "@/components/LazyCaptcha";

// -------------------- Types & Constants --------------------
export const initialForm: RegistrationFormData = {
  StudentName: "",
  ParentName: "",
  StudentPhone: "",
  ParentPhone: "",
  StudentEmail: "",
  Address: "",
  City: "",
  State: "",
  District: "",
  PinCode: "",
};

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
  const [districtOptions, setDistrictOptions] = useState<string[]>([]);
  const router = useRouter();

  // --- Registration Form Hook ---
  const { formData, handleChange, handleSubmit, loading, setFormData } =
    useRegistrationForm({
      validateForm: (formData: RegistrationFormData) =>
        ValidateRegistrationFormWithToast(formData, true, true),
      onSubmit: async (payload) => {
        try {
          // --- Prepare Payloads ---
          const backendPayload = {
            name: payload.StudentName,
            phone_number: payload.ParentPhone
              ? `+91${payload.ParentPhone}`
              : null,
            email: payload.StudentEmail || null,
            token: payload.token,
          };
          const googleScriptPayload = {
            StudentName: payload.StudentName || "",
            StudentPhone: payload.StudentPhone
              ? `+91${payload.StudentPhone}`
              : "",
            StudentEmail: payload.StudentEmail || "",
            ParentName: payload.ParentName || "",
            ParentPhone: payload.ParentPhone ? `+91${payload.ParentPhone}` : "",
            State: payload.State || "",
            PinCode: payload.PinCode || "",
            Address: payload.Address || "",
            City: payload.City || "",
            District: payload.District || "",
          };
          // --- Google Script Submission ---
          await fetch(
            "https://script.google.com/macros/s/AKfycbxQ0OGd2A5Tvs0_MQxcUWtWfwEmyAyHpdY6mcUXZKj87QXG0JP2ilZ9CTQxmhfkP6_r/exec",
            {
              method: "POST",
              mode: "no-cors",
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: new URLSearchParams(googleScriptPayload),
            },
          );
          // --- Backend Submission ---
          const response =
            await import("@/services/appoinmentRequestService").then((m) =>
              m.createAppoinmentRequest({
                name: backendPayload.name,
                phone_number: backendPayload.phone_number,
                email: backendPayload.email,
                token: backendPayload.token,
              }),
            );
          if (
            !response ||
            !response.status ||
            response.responseCode !== "INSERT_SUCCESS"
          ) {
            toast.error("Failed to submit the form. Please try again.");
            return;
          }
          toast.success("Form submitted successfully!");
          setFormData(initialForm);
        } catch (err) {
          console.error(err);
          toast.error("Failed to submit the form. Please try again.");
        }
      },
      captchaAction: "popup_form",
      requiredName: true,
    });

  // --- District Options Effect ---
  useEffect(() => {
    if (
      formData.State &&
      (districts as Record<string, string[]>)[formData.State]
    ) {
      setDistrictOptions(
        (districts as Record<string, string[]>)[formData.State],
      );
    } else {
      setDistrictOptions([]);
    }
  }, [formData.State]);

  // --- Merge for CommonRegistrationFields ---
  const mergedFormData = {
    ...formData,
    name: formData.StudentName,
    email: formData.StudentEmail,
    mobile: formData.StudentPhone,
    message: "",
    agree: false,
  };

  const handleBack = () => router.back();
  const handleClear = () => setFormData(initialForm);

  // --- Render ---
  return (
    <div className="bg-(--blue) min-h-screen" data-section>
      <div className="p-6">
        <button
          type="button"
          className="border rounded-full p-2 md:p-3 cursor-pointer"
          onClick={handleBack}
        >
          <FaArrowLeft aria-label="Back" />
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
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 ">
            Student Enquire Form
          </h1>
          <LazyCaptcha>
            {/*  Form */}
            <form onSubmit={handleSubmit} className="space-y-2 mt-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-20">
                <AutofillSuppressionFields />
                <CommonRegistrationFields
                  formData={mergedFormData}
                  handleChange={handleChange}
                  fieldsToShow={[
                    "StudentName",
                    "ParentName",
                    "StudentPhone",
                    "ParentPhone",
                    "StudentEmail",
                    "City",
                    "State",
                    "District",
                    "PinCode",
                    "Address",
                  ]}
                  loading={loading}
                  districts={districts}
                  districtOptions={districtOptions}
                  toast={toast}
                />
              </div>
              {/* Full width button row below the grid */}
              <div className="w-full flex flex-row justify-between my-4 gap-2">
                <button
                  className="relative flex justify-center items-center gap-1 rounded-full bg-(--blue) overflow-hidden cursor-pointer border border-(--yellow) group transition-all duration-300 px-3 py-1"
                  onClick={handleClear}
                  type="button"
                >
                  <span className="relative gap-x-1 z-20 flex items-center text-center no-underline w-full text-(--yellow) transition-all duration-300 group-hover:text-(--blue)">
                    Clear
                  </span>
                  <span className="absolute left-0 top-0 w-full h-0 bg-(--yellow) transition-all duration-300 ease-in-out group-hover:h-full group-hover:top-auto group-hover:bottom-0 z-10" />
                </button>
                <button
                  type="submit"
                  className="relative flex justify-center items-center rounded-full bg-transparent overflow-hidden cursor-pointer border border-(--yellow) group transition-all duration-300 min-w-[110px]"
                  disabled={loading}
                  style={loading ? { pointerEvents: "none", opacity: 0.7 } : {}}
                >
                  <span className="relative z-20 text-center no-underline w-full px-2 py-1 text-(--yellow) text-base transition-all duration-300 group-hover:text-(--blue)">
                    {loading ? "Submitting..." : "Submit"}
                  </span>
                  <span className="absolute left-0 top-0 w-full h-0 bg-(--yellow) transition-all duration-300 ease-in-out group-hover:h-full group-hover:top-auto group-hover:bottom-0 z-10" />
                </button>
              </div>
              <Paragraph size="base" className="mt-8 text-(--yellow)">
                Note: Admission and fee details will be shared after you submit
                the enquiry form.
              </Paragraph>
            </form>
          </LazyCaptcha>
          <ContactInfo />
        </div>
      </div>
    </div>
  );
};

export default Form;
