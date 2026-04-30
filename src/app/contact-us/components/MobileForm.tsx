import React, { useEffect } from "react";
import CommonEnquiryFields from "@/components/enquiry-validation/CommonEnquiryFields";
import { useEnquiryForm } from "@/components/enquiry-validation/useEnquiryForm";
import { createAppoinmentRequest } from "@/services/appoinmentRequestService";
import { toast } from "react-toastify";

import { validateEnquiryFormWithToast } from "@/components/enquiry-validation/enquiryFormValidation";

const MobileForm = () => {
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
    captchaAction: "appointment_form",
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
      onSubmit={handleSubmit}
      className="space-y-4 w-full px-6"
      autoComplete="off"
    >
      {/* Hidden dummy input to suppress autofill */}
      <input
        type="text"
        name="fakeusernameremembered"
        autoComplete="username"
        style={{ display: "none" }}
        tabIndex={-1}
      />
      <input
        type="password"
        name="fakePassword"
        autoComplete="new-password"
        style={{ display: "none" }}
        tabIndex={-1}
      />
      <CommonEnquiryFields
        formData={formData}
        handleChange={handleChange}
        loading={loading}
        submitText="Submit"
        fieldsToShow={["name", "email", "mobile", "message", "agree"]}
      />
    </form>
  );
};

export default MobileForm;
