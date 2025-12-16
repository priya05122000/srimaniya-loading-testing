"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  CheckboxField,
  InputField,
  FileUploaderField,
} from "@/components/ui/FormFields";
import Heading from "@/components/common/Heading";
import Image from "next/image";
import { createJobApplication } from "@/services/jobAppointmentService";
import { uploadResumeFile } from "@/services/fileService";
import { toast } from "react-toastify";
import CommonEnquiryFields from "@/components/common/CommonEnquiryFields";
import { useEnquiryForm } from "@/components/common/useEnquiryForm";
import { validateEnquiryFormWithToast } from "@/components/common/enquiryFormValidation";
import { AutofillSuppressionFields } from "@/components/common/CommonEnquiryFields";

const ApplyNow: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null!); // Use non-null assertion for type compatibility

  const { formData, handleChange, handleSubmit, loading, error, success, setError, setSuccess } = useEnquiryForm({
    validateForm: (formData) => {
      if (!formData.name.trim()) {
        toast.error("Name is required.");
        return false;
      }
      if (!formData.email.trim()) {
        toast.error("Email is required.");
        return false;
      }
      if (!formData.mobile.trim()) {
        toast.error("Mobile number is required.");
        return false;
      }
      if (!(formData as any).resume) {
        toast.error("Resume upload is required.");
        return false;
      }
      return validateEnquiryFormWithToast(formData);
    },
    onSubmit: createJobApplication,
    captchaAction: "career_form",
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
      setError(null);
    }
    if (success) {
      toast.success(success);
      setSuccess(null);
    }
  }, [error, success, setError, setSuccess]);

  useEffect(() => {
    if (success && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [success]);

  return (
    <section
      className="bg-(--blue-overlay-custom) h-full sm:h-[550px] flex flex-col"
      data-section
      ref={sectionRef}
    >
      <div className="h-full relative">
        <Image
          src="/career/careerform.webp"
          alt="Sri Maniya Institute careers"
          className="w-full sm:h-[550px] object-cover object-top image-tag"
          width={1200}
          height={1200}
          priority
        />
        <div className="md:absolute md:right-0 md:top-0 w-full md:w-1/2">
          <div className="h-full sm:h-[550px] bg-(--blue-overlay-light) backdrop-blur-md p-6 sm:p-8 flex flex-col justify-between gap-6" data-section>
            <div className="max-w-2xl ml-auto">
              <Heading
                level={4}
                className="text-(--white-custom) uppercase mb-4 text-end"
              >
                Apply Now
              </Heading>
            </div>
            <form className="flex flex-col gap-y-2" onSubmit={handleSubmit} autoComplete="off">
              <AutofillSuppressionFields />
              <CommonEnquiryFields
                formData={formData}
                handleChange={handleChange}
                fileInputRef={fileInputRef}
                loading={loading}
                submitText="Submit"
              />
              {/* Submit button is now handled by CommonEnquiryFields */}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplyNow;
