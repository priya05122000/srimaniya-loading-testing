import React, { useEffect } from "react";
import { useEnquiryForm } from "@/components/enquiry-validation/useEnquiryForm";
import { toast } from "react-toastify";
import { createAppoinmentRequest } from "@/services/appoinmentRequestService";
import { validateEnquiryFormWithToast } from "@/components/enquiry-validation/enquiryFormValidation";
import CommonEnquiryFields, {
  AutofillSuppressionFields,
} from "@/components/enquiry-validation/CommonEnquiryFields";

const FormInner = () => {
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
  );
};

export default FormInner;
