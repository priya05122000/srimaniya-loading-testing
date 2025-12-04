"use client";
import Heading from '@/components/common/Heading';
import { CheckboxField, InputField, TextAreaField } from '@/components/ui/FormFields';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { toast } from "react-toastify";
import { createAppoinmentRequest } from "@/services/appoinmentRequestService";

// Types for form data (reusable)
type EnquireFormData = {
  name: string;
  email: string;
  mobile: string;
  message: string;
  agree: boolean;
};

// Utility: Reset form data
function getInitialFormData(): EnquireFormData {
  return {
    name: "",
    email: "",
    mobile: "",
    message: "",
    agree: false,
  };
}

const EnquireForm = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [formData, setFormData] = useState<EnquireFormData>(getInitialFormData());
  const [localLoading, setLocalLoading] = useState(false);

  // Reusable change handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target;
    const value = target.type === "checkbox" ? (target as HTMLInputElement).checked : target.value;
    setFormData((prev: EnquireFormData) => ({ ...prev, [target.name]: value }));
  };

  // Reusable submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agree) {
      toast.error("You must agree to the terms before submitting.");
      return;
    }
    setLocalLoading(true);
    try {
      const payload = {
        name: formData.name,
        email: formData.email || null,
        phone_number: formData.mobile,
        message: formData.message || null,
      };
      await createAppoinmentRequest(payload);
      toast.success("Enquiry submitted successfully!");
      setFormData(getInitialFormData());
    } catch (error: unknown) {
      const errorMsg = (error && typeof error === 'object' && 'message' in error)
        ? (error as { message?: string }).message
        : "Failed to submit enquiry.";
      toast.error(errorMsg);
    } finally {
      setLocalLoading(false);
    }
  };

  return (
    <div className="md:h-[calc(100vh-80px)]" ref={sectionRef}>
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_1.5fr] lg:grid-cols-2 gap-0  md:h-[calc(100vh-80px)] relative">
        {/* Left: Image */}
        <div className="sm:w-[110%] lg:w-[106%] xl:w-[104%] min-h-[300px]">
          <Image
            src="/home/enquireform.webp"
            alt="Sri Maniya Institute of Hotel Management - hotel management courses near me, best hotel management colleges near me, career opportunities in hotel management, hospitality management courses in tamilnadu"
            width={2000}
            height={2000}
            className="w-full h-full  object-cover image-tag"
          />
        </div>
        {/* Right: Content */}
        <div className="flex flex-col justify-center min-h-[300px]">
          <div className="bg-(--blue) text-(--white-custom) flex flex-col justify-center h-full sm:h-[90%] py-8 sm:py-10 px-6 sm:px-8 xl:space-y-10 z-10 " data-section>
            <div className="max-w-2xl ml-auto">
              <Heading
                level={4}
                className="text-(--white-custom) uppercase text-end"
              >
                Enquire
              </Heading>
            </div>
            <form className="flex flex-col gap-y-2" onSubmit={handleSubmit} autoComplete="off">
              <InputField
                type="text"
                label="Name *"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <InputField
                type="email"
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <InputField
                type="tel"
                label="Mobile number *"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
              />
              <TextAreaField
                label="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={2}
              />
              <CheckboxField
                label="By submitting this form, I agree to Sri Maniya Institute’s Terms & Conditions and Privacy Policy."
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
              />
              <div className="block ml-auto mt-4">
                <button
                  type="submit"
                  className="relative flex justify-center items-center rounded-full bg-(--blue) overflow-hidden cursor-pointer border border-(--yellow) group transition-all duration-300 min-w-[110px]"
                  disabled={localLoading}
                >
                  <span className="relative z-20 text-center no-underline w-full px-2 py-1 text-(--yellow) text-base transition-all duration-300 group-hover:text-(--blue)">
                    {localLoading ? "Submitting..." : "Submit"}
                  </span>
                  <span className="absolute left-0 top-0 w-full h-0 bg-(--yellow) transition-all duration-300 ease-in-out group-hover:h-full group-hover:top-auto group-hover:bottom-0 z-10" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnquireForm;
