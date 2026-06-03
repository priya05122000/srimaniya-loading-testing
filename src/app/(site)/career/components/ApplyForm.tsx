import React, { useRef, useEffect } from "react";
import { createJobApplication } from "@/services/jobAppointmentService";
import { toast } from "react-toastify";
import CommonEnquiryFields from "@/components/enquiry-validation/CommonEnquiryFields";
import { useEnquiryForm } from "@/components/enquiry-validation/useEnquiryForm";
import { validateEnquiryFormWithToast } from "@/components/enquiry-validation/enquiryFormValidation";
import { AutofillSuppressionFields } from "@/components/enquiry-validation/CommonEnquiryFields";

const ApplyForm = () => {
  const fileInputRef = useRef<HTMLInputElement>(null!); // Use non-null assertion for type compatibility
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
    <form
      className="flex flex-col gap-y-2"
      onSubmit={handleSubmit}
      autoComplete="off"
    >
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
  );
};

export default ApplyForm;
