"use client";
import React, {
  useEffect,
  useState,
  ChangeEvent,
  FormEvent,
} from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import {
  CheckboxField,
  InputField,
  SelectField,
  TextAreaField,
} from "@/components/ui/FormFields";
import { createAppoinmentRequest } from "@/services/appoinmentRequestService";
import { getAllCourses } from "@/services/courseService";
import Heading from "@/components/common/Heading";

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

interface AppoinmentPayload {
  name: string;
  email: string | null;
  phone_number: string;
  message: string | null;
  course_id: string | null;
}

// Reusable constants
const INITIAL_FORM_DATA: FormData = {
  name: "",
  email: "",
  mobile: "",
  message: "",
  course: "",
  agree: false,
};
const IMAGE_PROPS = {
  src: "/scholarship/scholarform.jpeg",
  alt: "Scholarship Banner",
  fill: true,
  sizes: "(max-width: 768px) 100vw, 50vw",
  className: "object-cover object-top w-full h-full image-tag",
  priority: true,
};

const ScholarForm: React.FC = () => {
  const [courseOptions, setCourseOptions] = useState<CourseOption[]>([]);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [localLoading, setLocalLoading] = useState(false);

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const result = await getAllCourses();
        const data = result?.data || [];
        setCourseOptions(
          data.map((c: CourseOption) => ({ id: c.id, title: c.title }))
        );
      } catch {
        setCourseOptions([]);
      }
    };
    fetchCourses();
  }, []);

  // Handle input changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, type, value } = e.target;
    let fieldValue: string | boolean = value;
    if (type === "checkbox" && "checked" in e.target) {
      fieldValue = (e.target as HTMLInputElement).checked;
    }
    setFormData((prev) => ({ ...prev, [name]: fieldValue }));
  };

  // Handle form submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.agree) {
      toast.error("You must agree to the terms and conditions.");
      return;
    }
    setLocalLoading(true);
    const payload: AppoinmentPayload = {
      name: formData.name,
      email: formData.email || null,
      phone_number: formData.mobile,
      message: formData.message || null,
      course_id: formData.course || null,
    };
    try {
      await createAppoinmentRequest(payload);
      toast.success("Application submitted successfully!");
      setFormData(INITIAL_FORM_DATA);
    } catch (error: unknown) {
      if (
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof (error as { response?: { status?: number; data?: { message?: string } } }).response === "object"
      ) {
        const response = (
          error as {
            response?: { status?: number; data?: { message?: string } };
          }
        ).response;
        if (response?.status === 409) {
          toast.error(response.data?.message || "Duplicate application detected.");
        } else {
          toast.error(response?.data?.message || "Submission failed.");
        }
        console.error("Application error:", response?.data || error);
      } else {
        toast.error("Submission failed.");
        console.error("Application error:", error);
      }
    } finally {
      setLocalLoading(false);
    }
  };

  return (
    <div className="min-h-[100vh-80px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1.5fr]">
      {/* Form Section */}
      <div className="flex items-center justify-center bg-(--blue) p-4 md:p-8" data-section>
        <div className="w-full max-w-xl">
          <Heading level={4} className="uppercase text-end mb-6">
            Join With US
          </Heading>
          <form className="flex flex-col gap-y-2" onSubmit={handleSubmit}>
            <InputField
              type="text"
              label="Name *"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
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
              required
            />
            <SelectField
              label="Course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              options={courseOptions.map((course) => ({
                value: String(course.id),
                label: course.title,
              }))}
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
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="relative flex justify-center items-center rounded-full overflow-hidden cursor-pointer border border-(--yellow) group transition-all duration-300 min-w-[110px]"
                disabled={localLoading}
              >
                <span className="relative z-20 text-center w-full px-2 py-1 text-(--yellow) text-base transition-all duration-300 group-hover:text-(--blue)">
                  {localLoading ? "Submitting..." : "Submit"}
                </span>
                <span className="absolute left-0 top-0 w-full h-0 bg-(--yellow) transition-all duration-300 ease-in-out group-hover:h-full group-hover:top-auto group-hover:bottom-0 z-10" />
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* Image Section */}
      <div className="relative min-h-[300px] md:min-h-0">
        <Image {...IMAGE_PROPS} />
      </div>
    </div>
  );
};

export default ScholarForm;
