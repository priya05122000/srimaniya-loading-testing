"use client";
import Heading from "@/components/common/Heading";
import Image from "next/image";
import React, { useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { createAppoinmentRequest } from "@/services/appoinmentRequestService";
import CommonEnquiryFields, {
  AutofillSuppressionFields,
} from "@/components/enquiry-validation/CommonEnquiryFields";
import { useEnquiryForm } from "@/components/enquiry-validation/useEnquiryForm";
import { validateEnquiryFormWithToast } from "@/components/enquiry-validation/enquiryFormValidation";
import LazyCaptcha from "@/components/LazyCaptcha";

const EnquireForm: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const {
    formData,
    handleChange,
    handleSubmit,
    loading,
    error,
    success,
    setError,
    setSuccess,
  } = useEnquiryForm({
    validateForm: validateEnquiryFormWithToast,
    onSubmit: createAppoinmentRequest,
    captchaAction: "enquiry_form",
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

  return (
    <div className="md:h-[calc(100vh-80px)]" ref={sectionRef}>
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_1.5fr] lg:grid-cols-2 gap-0  md:h-[calc(100vh-80px)] relative">
        {/* Left: Image */}
        <div className="sm:w-[110%] lg:w-[106%] xl:w-[104%] min-h-[300px]">
          <Image
            src="/home/enquireform.webp"
            alt="Enquiry form for Sri Maniya Institute of Hotel Management"
            width={2000}
            height={2000}
            className="w-full h-full  object-cover image-tag"
            unoptimized
          />
        </div>
        {/* Right: Content */}
        <div className="flex flex-col justify-center min-h-[300px]">
          <div
            className="bg-(--blue) text-(--white-custom) flex flex-col justify-center h-full sm:h-[90%] py-8 sm:py-10 px-6 sm:px-8 xl:space-y-10 z-10 "
            data-section
          >
            <div className="max-w-2xl ml-auto">
              <p className="text-(--white-custom) uppercase text-end jakarta-heading text-3xl sm:text-4xl lg:text-5xl font-bold">
                Enquire
              </p>
            </div>
            <LazyCaptcha>
              <form
                className="flex flex-col gap-y-2"
                onSubmit={handleSubmit}
                autoComplete="off"
              >
                <AutofillSuppressionFields />
                <CommonEnquiryFields
                  formData={formData}
                  handleChange={handleChange}
                  loading={loading}
                  submitText="Submit"
                />
                {/* Submit button is now handled by CommonEnquiryFields */}
              </form>
            </LazyCaptcha>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnquireForm;
