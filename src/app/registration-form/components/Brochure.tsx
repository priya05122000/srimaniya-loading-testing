"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";

// Custom Components
import { InputField, SelectField } from "@/components/ui/FormFields";
// import Section from "@/components/Section";
import Paragraph from "@/components/common/Paragraph";

import districts from "./districts.json";

// Types
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

// Contact Info Component
const ContactInfo = () => (
  <div className="contact-info mt-8 md:mt-4 text-center text-white text-base">
    <Paragraph size="lg" className="mb-1">
      Phone :
      <a href="tel:+918903864444" className="ml-1">
        +91 89038 64444
      </a>
    </Paragraph>
    <Paragraph size="lg" className="mb-1">
      Email :
      <a href="mailto:admission@srimaniyainstitute.in" className="ml-1">
        admission@srimaniyainstitute.in
      </a>
      <span className="mx-1">|</span>
      Website :
      <a
        href="http://www.srimaniyainstitute.in"
        target="_blank"
        rel="noopener noreferrer"
        className="ml-1"
      >
        www.srimaniyainstitute.in
      </a>
    </Paragraph>
    <Paragraph size="lg" className="mb-1">
      Address : No: 6/66-D1, Government Hospital Road, Kanyakumari, Tamil Nadu –
      629702.
    </Paragraph>
  </div>
);

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

  const handleClear = () => {
    setForm(initialForm);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { StudentName, StudentPhone, StudentEmail, City, State, District } =
      form;
    const brochureName = `(brochure) ${StudentName}`;
    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbxQ0OGd2A5Tvs0_MQxcUWtWfwEmyAyHpdY6mcUXZKj87QXG0JP2ilZ9CTQxmhfkP6_r/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            StudentName: brochureName,
            ParentName: "null",
            StudentPhone,
            ParentPhone: "null",
            StudentEmail: StudentEmail || "null",
            Address: "null",
            City: City || "null",
            State: State || "null",
            District: District || "null",
            PinCode: "null",
          }),
        }
      );
      toast.success("Form submitted successfully!");
      setForm(initialForm);
      // Trigger brochure download
      const brochureUrl = "/pdf/brochure.pdf"; // Update path if needed
      const link = document.createElement("a");
      link.href = brochureUrl;
      link.download = "brochure.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit the form. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="relative bg-(--blue) min-h-screen flex items-center justify-center py-8 px-2" data-section>
      <div className="absolute top-5 md:top-15 left-6 md:left-12">
        <button
          type="button"
          className="border rounded-full p-2 md:p-3 cursor-pointer"
          onClick={handleBack}
        >
          <FaArrowLeft />
        </button>
      </div>

      <div className="w-full max-w-3xl rounded-lg  p-4 md:p-8">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Image
            src="/logos/navbarlogo.png"
            alt="Logo"
            width={376}
            height={94}
            className="w-48 md:w-72"
            priority
          />
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-2 mt-5">
          <div className="grid grid-cols-1 gap-y-4 gap-x-6">
            <InputField
              label="Name *"
              name="StudentName"
              required
              value={form.StudentName}
              onChange={handleChange}
            />
            <InputField
              label="Phone Number *"
              name="StudentPhone"
              type="tel"
              required
              value={form.StudentPhone}
              onChange={handleChange}
              pattern="[0-9]{10}"
              maxLength={10}
            />
            <InputField
              label="Email"
              name="StudentEmail"
              type="email"
              value={form.StudentEmail}
              onChange={handleChange}
            />
            <InputField
              label="City / Town / Village"
              name="City"
              value={form.City}
              onChange={handleChange}
            />
            <SelectField
              label="State"
              name="State"
              required
              value={form.State}
              onChange={handleChange}
              options={Object.keys(districts).map((state) => ({
                value: state,
                label: state,
              }))}
            />
            <SelectField
              label="District"
              name="District"
              required
              value={form.District}
              onChange={handleChange}
              options={
                !form.State
                  ? [{ value: "", label: "Select State First" }]
                  : districtOptions.map((district) => ({
                    value: district,
                    label: district,
                  }))
              }
              onClick={() => {
                if (!form.State) {
                  toast.error("Please select the State first.");
                }
              }}
            />
          </div>
          {/* Buttons */}
          <div className="flex flex-row justify-between my-4 gap-2">
            <button
              type="button"
              className="px-4 py-2 border border-(--yellow) text-(--yellow) rounded cursor-pointer"
              onClick={handleClear}
              disabled={submitting}
            >
              Clear
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-(--yellow) hover:bg-(--yellow) transition font-semibold text-black rounded cursor-pointer"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </div>
          {/* Note */}
          <Paragraph size="base" className="mt-4 text-(--yellow)">
            Note: Brochure details will be shared after you submit the form.
          </Paragraph>
        </form>
        {/* Contact Info */}
        <ContactInfo />
      </div>
    </div>
  );
};

export default Form;
