import React, { useEffect, useState}from "react";
import CommonEnquiryFields from "@/components/enquiry-validation/CommonEnquiryFields";
import { validateEnquiryFormWithToast } from "@/components/enquiry-validation/enquiryFormValidation";
import { AutofillSuppressionFields } from "@/components/enquiry-validation/CommonEnquiryFields";
import { toast } from "react-toastify";
import { createAppoinmentRequest } from "@/services/appoinmentRequestService";

import { useEnquiryForm } from "@/components/enquiry-validation/useEnquiryForm";
import { getAllCourses } from "@/services/courseService";

interface CourseOption {
  id: number;
  title: string;
}

const BannerForm = () => {
    const [courseOptions, setCourseOptions] = useState<CourseOption[]>([]);
     
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

  useEffect(() => {
    getAllCourses()
      .then((result) => {
        const data = result?.data || [];
        setCourseOptions(
          data.map((c: CourseOption) => ({ id: c.id, title: c.title })),
        );
      })
      .catch(() => setCourseOptions([]));
  }, []);
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
        courseOptions={courseOptions.map((course) => ({
          value: String(course.id),
          label: course.title,
        }))}
        loading={loading}
        submitText="Submit"
      />
    </form>
  );
};

export default BannerForm;
