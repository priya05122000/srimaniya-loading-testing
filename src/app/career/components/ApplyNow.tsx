"use client";
import React, { useRef, useState } from "react";
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

const ApplyNow: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null); // Fix type to match FileUploaderFieldProps
  const [localLoading, setLocalLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    resume: null as File | null,
    agree: false,
  });
  const [fileUploaderKey, setFileUploaderKey] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files ? files[0] : null }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalLoading(true);

    if (!formData.agree) {
      toast.error("You must agree to the terms and conditions.");
      setLocalLoading(false);
      return;
    }

    let resumePath = "";

    if (formData.resume) {
      const resumeFormData = new FormData();
      resumeFormData.append("file", formData.resume);

      try {
        const response = await uploadResumeFile(resumeFormData);
        resumePath = response.data?.file_path || "";
      } catch (error) {
        console.error("Resume upload failed:", error);
        toast.error("Resume upload failed.");
        setLocalLoading(false);
        return;
      }
    }

    const payload = {
      full_name: formData.name,
      email: formData.email || null,
      phone_number: formData.mobile,
      resume_url: resumePath,
    };

    try {
      await createJobApplication(payload);
      toast.success("Application submitted successfully!");
      // Clear all form fields after submit
      setFormData({
        name: "",
        email: "",
        mobile: "",
        resume: null,
        agree: false,
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Reset file input visually
      }
      // Also reset file name display in FileUploaderField
      // This requires a key prop to force re-mount
      setFileUploaderKey(prev => prev + 1);
    } catch (error: unknown) {
      if (
        error &&
        typeof error === 'object' &&
        'response' in error &&
        error.response &&
        typeof error.response === 'object'
      ) {
        const response = (error as { response?: { status?: number; data?: { message?: string } } }).response;
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
    <section
      className="bg-(--blue-overlay-custom) h-full sm:h-[600px] flex flex-col"
      data-section
      ref={sectionRef}
    >
      <div className="h-full relative">
        <Image
          src="/career/careerform.webp"
          alt="Chefs working"
          className="w-full sm:h-[600px] object-cover object-top image-tag"
          width={1200}
          height={1200}
          priority
        />
        <div className="md:absolute md:right-0 md:top-0 w-full md:w-1/2">
          <div className="h-full sm:h-[600px] bg-(--blue-overlay-light) backdrop-blur-md p-6 sm:p-8 flex flex-col justify-between gap-6" data-section>
            <div className="max-w-2xl ml-auto">
              <Heading
                level={4}
                className="text-(--white-custom) uppercase mb-4 text-end"
              >
                Apply Now
              </Heading>
            </div>
            <form className="flex flex-col gap-y-3" onSubmit={handleSubmit}>
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
              <FileUploaderField
                key={fileUploaderKey}
                label="Upload Resume"
                name="resume"
                onChange={handleChange}
                inputRef={fileInputRef as React.RefObject<HTMLInputElement>} // Fix type error by casting
              />
              <CheckboxField
                label="By submitting this form, I agree to Sri Maniya Institute’s Terms & Conditions and Privacy Policy."
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
              />
              <div className="block text-end mt-2">
                <div className="flex justify-end ml-auto">
                  <button
                    type="submit"
                    className="relative flex justify-center items-center rounded-full overflow-hidden cursor-pointer border border-(--yellow) group transition-all duration-300 min-w-[110px]"
                  >
                    <span className={`${localLoading ? "disabled" : ""} relative z-20 text-center no-underline w-full px-2 py-1 text-(--yellow) text-base transition-all duration-300 group-hover:text-(--blue)`}>
                      {localLoading ? "Submitting..." : "Submit"}
                    </span>
                    <span className="absolute left-0 top-0 w-full h-0 bg-(--yellow) transition-all duration-300 ease-in-out group-hover:h-full group-hover:top-auto group-hover:bottom-0 z-10" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplyNow;
