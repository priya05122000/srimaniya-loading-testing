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

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "State") {
      setForm((prev) => ({ ...prev, District: "" }));
    }
  };

  const handleClear = () => setForm(initialForm);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    if (form.StudentEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.StudentEmail)) {
        toast.error("Please enter a valid email address.");
        setSubmitting(false);
        return;
      }
    }
    const {
      StudentName, ParentName, StudentPhone, ParentPhone, StudentEmail,
      Address, City, State, District, PinCode,
    } = form;
    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbxQ0OGd2A5Tvs0_MQxcUWtWfwEmyAyHpdY6mcUXZKj87QXG0JP2ilZ9CTQxmhfkP6_r/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            StudentName, ParentName, StudentPhone, ParentPhone,
            StudentEmail: StudentEmail || "Nil", Address, City, State, District, PinCode,
          }),
        }
      );
      const registrationName = `(registration) ${StudentName}`;
      const Payload = {
        name: registrationName,
        phone_number: StudentPhone,
        parent_phone: ParentPhone,
        email: StudentEmail || "Nil",
      };
      await createAppoinmentRequest(Payload);
      toast.success("Form submitted successfully!");
      setForm(initialForm);
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit the form. Please try again.");
    } finally {
      setSubmitting(false);
    }
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
              <InputField label="Student Name *" name="StudentName" required value={form.StudentName} onChange={handleChange} />
              <InputField label="Parent Name *" name="ParentName" required value={form.ParentName} onChange={handleChange} />
              <InputField label="Student Phone Number" name="StudentPhone" type="tel" required value={form.StudentPhone} onChange={handleChange} pattern="[0-9]{10}" maxLength={10} />
              <InputField label="Parent's Phone Number *" name="ParentPhone" type="tel" required value={form.ParentPhone} onChange={handleChange} pattern="[0-9]{10}" maxLength={10} />
              <InputField label="Email" name="StudentEmail" type="email" value={form.StudentEmail} onChange={handleChange} />
              <InputField label="City / Town / Village" name="City" required value={form.City} onChange={handleChange} />
              <SelectField label="State *" name="State" required value={form.State} onChange={handleChange} options={Object.keys(districts).map((state) => ({ value: state, label: state }))} />
              <SelectField label="District" name="District" required value={form.District} onChange={handleChange} options={!form.State ? [{ value: "", label: "Select State First" }] : districtOptions.map((district) => ({ value: district, label: district }))} onClick={() => { if (!form.State) toast.error("Please select the State first."); }} />
              <InputField label="Pin Code *" name="PinCode" required value={form.PinCode} onChange={handleChange} pattern="[0-9]{6}" maxLength={6} />
              <TextAreaField label="Address *" name="Address" required value={form.Address} onChange={handleChange} />
            </div>
            {/* Buttons */}
            <div className="flex flex-row justify-between my-4 gap-2">
              <button className="relative flex justify-center items-center gap-1 rounded-md bg-(--blue) overflow-hidden cursor-pointer border border-(--yellow) group transition-all duration-300 px-3 py-1" onClick={handleClear} disabled={submitting} type="button">
                <Paragraph size="base" className="relative gap-x-1 z-20 flex items-center text-center no-underline w-full text-(--yellow) transition-all duration-300 group-hover:text-(--blue)">Clear</Paragraph>
                <span className="absolute left-0 top-0 w-full h-0 bg-(--yellow) transition-all duration-300 ease-in-out group-hover:h-full group-hover:top-auto group-hover:bottom-0 z-10" />
              </button>
              <button className="relative flex justify-center items-center gap-1 rounded-md bg-(--yellow) overflow-hidden cursor-pointer border border-(--yellow) group transition-all duration-300 px-3 py-1" type="submit" disabled={submitting}>
                <Paragraph size="base" className="relative gap-x-1 z-20 flex items-center text-center no-underline w-full text-(--blue) transition-all duration-300 group-hover:text-(--yellow)">{submitting ? "Submitting..." : "Submit"}</Paragraph>
                <span className="absolute left-0 top-0 w-full h-0 bg-(--blue) transition-all duration-300 ease-in-out group-hover:h-full group-hover:top-auto group-hover:bottom-0 z-10" />
              </button>
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
