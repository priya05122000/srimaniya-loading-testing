"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";

// Custom Components
import {
  InputField,
  SelectField,
  TextAreaField,
} from "@/components/ui/FormFields";
import Heading from "@/components/common/Heading";
import Paragraph from "@/components/common/Paragraph";

// Data
import districts from "./districts.json";
import { createAppoinmentRequest } from "@/services/appoinmentRequestService";
import { useRegistrationForm } from "@/app/registration-form/subcomponents/useRegistrationForm";
import { ValidateRegistrationFormWithToast } from "@/app/registration-form/subcomponents/registrationFormValidation";
import CommonRegistrationFields, { AutofillSuppressionFields } from "@/app/registration-form/subcomponents/CommonRegistrationFields";

// -------------------- Types --------------------
type FormData = {
  StudentName: string;
  ParentName: string;
  StudentPhone: string;
  ParentPhone: string;
  StudentEmail: string;
  Address: string;
  City: string;
  State: string;
  District: string;
  PinCode: string;
};

// -------------------- Initial State --------------------
const initialForm: FormData = {
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

// -------------------- Contact Info --------------------
const ContactInfo = () => (
  <div className="contact-info mt-8 sm:text-center text-white text-base">
    <Paragraph size="base" className="mb-1">
      Phone :
      <a href="tel:+918903864444" className="ml-1">+91 89038 64444</a>
    </Paragraph>
    <Paragraph size="base" className="mb-1 hidden sm:block">
      Email :
      <a href="mailto:admission@srimaniyainstitute.in" className="ml-1">admission@srimaniyainstitute.in</a>
      <span className="mx-1">|</span>
      Website :
      <a href="http://www.srimaniyainstitute.in" target="_blank" rel="noopener noreferrer" className="ml-1">www.srimaniyainstitute.in</a>
    </Paragraph>
    <Paragraph size="base" className="mb-1 block sm:hidden">
      Email :
      <a href="mailto:admission@srimaniyainstitute.in" className="ml-1">admission@srimaniyainstitute.in</a>
    </Paragraph>
    <Paragraph size="base" className="mb-1 block sm:hidden">
      Website :
      <a href="http://www.srimaniyainstitute.in" target="_blank" rel="noopener noreferrer" className="ml-1">www.srimaniyainstitute.in</a>
    </Paragraph>
    <Paragraph size="base" className="mb-1">
      Address : No: 6/66-D1, Government Hospital Road, Kanyakumari, Tamil Nadu – 629702.
    </Paragraph>
  </div>
);

// -------------------- Main Form Component --------------------
const Form: React.FC = () => {
  const [form, setForm] = useState<FormData>(initialForm);
  const [districtOptions, setDistrictOptions] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (form.State && (districts as Record<string, string[]>)[form.State]) {
      setDistrictOptions((districts as Record<string, string[]>)[form.State]);
    } else {
      setDistrictOptions([]);
    }
  }, [form.State]);

  const { formData, handleChange, handleSubmit, loading, setFormData } = useRegistrationForm({
    validateForm: (formData) => {
      // Only these fields are mandatory
      const requiredFields: (keyof typeof formData)[] = ["StudentName", "ParentName", "ParentPhone", "State", "PinCode", "Address"];
      for (const field of requiredFields) {
        if (!formData[field] || (typeof formData[field] === 'string' && formData[field]!.trim() === '')) {
          toast.error(`${field.replace(/([A-Z])/g, ' $1')} is required.`);
          return false;
        }
      }
      // All other fields are optional, so skip further required checks
      return true;
    },
    onSubmit: async (payload) => {
      console.log('onSubmit called with payload:', payload); // Debug log
      try {
        // Split payload for backend and Google Script
        const backendPayload = {
          name: payload.StudentName,
          phone_number: payload.StudentPhone ? `+91${payload.StudentPhone}` : null,
          email: payload.StudentEmail || null,
          token: payload.token,
        };
        const googleScriptPayload = {
          ParentName: payload.ParentName || "",
          ParentPhone: payload.ParentPhone || "",
          State: payload.State || "",
          PinCode: payload.PinCode || "",
          Address: payload.Address || "",
          City: payload.City || "",
          District: payload.District || "",
          // Optionally include StudentName, StudentPhone, StudentEmail for reference
          StudentName: payload.StudentName || "",
          StudentPhone: payload.StudentPhone || "",
          StudentEmail: payload.StudentEmail || "",
        };

        // Send to Google Script (all except StudentName, StudentPhone, StudentEmail are required, but send all for record)
        await fetch(
          "https://script.google.com/macros/s/AKfycbxQ0OGd2A5Tvs0_MQxcUWtWfwEmyAyHpdY6mcUXZKj87QXG0JP2ilZ9CTQxmhfkP6_r/exec",
          {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(googleScriptPayload),
          }
        );
        // Send to backend (only StudentName, StudentPhone, StudentEmail)
        const response = await import("@/services/appoinmentRequestService").then(m => m.createAppoinmentRequest({
          name: backendPayload.name,
          phone_number: backendPayload.phone_number,
          email: backendPayload.email,
          token: backendPayload.token,
        }));
        if (!response || !response.status || response.responseCode !== "INSERT_SUCCESS") {
          toast.error("Failed to submit the form. Please try again.");
          return;
        }
        toast.success("Form submitted successfully!");
        // Reset registration form fields after submit
        setFormData({
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
        });
      } catch (err) {
        console.error(err);
        toast.error("Failed to submit the form. Please try again.");
      }
    },
    captchaAction: "popup_form",
    requiredName: true, // StudentName is required
  });

  // Merge registration fields into CommonEnquiryFields expected structure
  const mergedFormData = {
    ...formData,
    name: formData.StudentName,
    email: formData.StudentEmail,
    mobile: formData.StudentPhone,
    message: "",
    agree: false,
  };

  const handleBack = () => router.back();

  return (
    <div className="bg-(--blue) min-h-screen" data-section>
      <div className="p-6">
        <button
          type="button"
          className="border rounded-full p-2 md:p-3 cursor-pointer"
          onClick={handleBack}
        >
          <FaArrowLeft />
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
          <Heading level={4} className="mb-8 ">Student Enquire Form</Heading>
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-2 mt-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-20">
              <AutofillSuppressionFields />
              <CommonRegistrationFields
                formData={mergedFormData}
                handleChange={handleChange}
                requiredMobile={true}
                requiredName={false}
                fieldsToShow={["StudentName", "ParentName", "StudentPhone", "ParentPhone", "StudentEmail", "City", "State", "District", "PinCode", "Address"]}
                loading={loading}
                submitText="Submit"
                districts={districts}
                districtOptions={districtOptions}
                toast={toast}
              />
            </div>
            <Paragraph size="base" className="mt-8 text-(--yellow)">
              Note: Admission and fee details will be shared after you submit the enquiry form.
            </Paragraph>
          </form>
          <ContactInfo />
        </div>
      </div>
    </div>
  );
};

export default Form;
