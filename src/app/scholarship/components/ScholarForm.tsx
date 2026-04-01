"use client";
import React, {
  useEffect,
  useState,
  ChangeEvent,
  FormEvent,
} from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { createAppoinmentRequest } from "@/services/appoinmentRequestService";
import { getAllCourses } from "@/services/courseService";
import Heading from "@/components/common/Heading";
import CommonEnquiryFields, { AutofillSuppressionFields } from "@/components/enquiry-validation/CommonEnquiryFields";
import { useEnquiryForm } from "@/components/enquiry-validation/useEnquiryForm";
import { validateEnquiryFormWithToast } from "@/components/enquiry-validation/enquiryFormValidation";

// Types
interface CourseOption {
  id: number;
  title: string;
}

interface FormData {
  name: string;
  email: string;
  mobile: string;
  message: string;
  course: string;
  agree: boolean;
}


const IMAGE_PROPS = {
  src: "/scholarship/scholarform.webp",
  alt: "Hotel management scholarship at Sri Maniya Institute",
  fill: true,
  sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw",
  className: "object-cover object-top",
  priority: true,
};

const ScholarForm: React.FC = () => {
  const [courseOptions, setCourseOptions] = useState<CourseOption[]>([]);
  const { formData, handleChange, handleSubmit, loading, error, success, setError, setSuccess } = useEnquiryForm({
    validateForm: validateEnquiryFormWithToast,
    onSubmit: createAppoinmentRequest,
    captchaAction: "scholar_form",
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
        setCourseOptions(data.map((c: CourseOption) => ({ id: c.id, title: c.title })));
      })
      .catch(() => setCourseOptions([]));
  }, []);


  return (
    <div className="min-h-[100vh-80px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1.5fr]">
      <div className="flex items-center justify-center bg-(--blue) p-4 md:p-8" data-section>
        <div className="w-full max-w-xl">
          <h3 className="uppercase text-end mb-6 text-3xl sm:text-4xl lg:text-5xl font-bold">Join With US</h3>
          <form className="flex flex-col gap-y-2" onSubmit={handleSubmit} autoComplete="off">
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
        </div>
      </div>
      <div className="relative w-full h-100 sm:h-auto">
        <Image {...IMAGE_PROPS} />
      </div>
    </div>
  );
};

export default ScholarForm;
