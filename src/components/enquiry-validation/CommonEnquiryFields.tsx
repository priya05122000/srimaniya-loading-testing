"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { GoDownload } from "react-icons/go";
import Paragraph from "@/components/common/Paragraph";
import {
    CheckboxField,
    InputField,
    TextAreaField,
    FileUploaderField,
    SelectField,
} from "@/components/ui/FormFields";

// -------------------- Types --------------------
export type CommonEnquiryFormData = {
    name: string;
    email: string;
    mobile: string;
    message: string;
    course?: string;
    resume?: File | null;
    agree: boolean;
};

export type CommonEnquiryFieldsProps = {
    formData: CommonEnquiryFormData;
    handleChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    requiredMobile?: boolean;
    requiredName?: boolean;
    fileInputRef?: React.RefObject<HTMLInputElement>;
    courseOptions?: { value: string; label: string }[];
    onCourseChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    /**
     * Specify which fields to show. If not provided, all fields are shown.
     * Example: ['mobile']
     */
    fieldsToShow?: string[];
    loading?: boolean;
    submitText?: string;
};

// -------------------- Helper: Show Field --------------------
const showField = (fieldsToShow: string[] | undefined, field: string) => !fieldsToShow || fieldsToShow.includes(field);

// -------------------- Main Component --------------------
const CommonEnquiryFields: React.FC<CommonEnquiryFieldsProps> = ({
    formData,
    handleChange,
    requiredMobile = true,
    requiredName = true,
    fileInputRef,
    courseOptions = [],
    onCourseChange,
    fieldsToShow,
    loading = false,
    submitText = "Submit",
}) => {
    const pathname = usePathname();
    const isCareerPage = pathname === "/career";
    const isCoursePage = pathname === "/placements" || pathname === "/scholarship";

    // Resume reset trigger for FileUploaderField
    const [resumeResetTrigger, setResumeResetTrigger] = React.useState(false);
    React.useEffect(() => {
        if (formData.resume === undefined || formData.resume === null) {
            setResumeResetTrigger((v) => !v); // toggle to force reset
        }
    }, [formData.resume]);

    return (
        <>
            {showField(fieldsToShow, "name") && (
                <InputField
                    type="text"
                    label="Name *"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required={requiredName}
                    autoComplete="new-password"
                />
            )}
            {showField(fieldsToShow, "email") && (
                <InputField
                    type="email"
                    label={isCareerPage ? "Email *" : "Email"}
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required={isCareerPage}
                    autoComplete="new-password"
                />
            )}
            {showField(fieldsToShow, "mobile") && (
                <InputField
                    type="tel"
                    label="Mobile number *"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    required={requiredMobile}
                    autoComplete="new-password"
                />
            )}
            {showField(fieldsToShow, "resume") && isCareerPage && (
                <FileUploaderField
                    label="Upload Resume *"
                    name="resume"
                    onChange={handleChange}
                    required={requiredName}
                    inputRef={fileInputRef}
                    resetTrigger={resumeResetTrigger}
                    key={resumeResetTrigger ? 'resume-reset-1' : 'resume-reset-0'} // force remount
                />
            )}
            {showField(fieldsToShow, "course") && isCoursePage && courseOptions && courseOptions.length > 0 && (
                <SelectField
                    label="Course"
                    name="course"
                    value={formData.course || ""}
                    onChange={onCourseChange || (handleChange as any)}
                    options={courseOptions}
                />
            )}
            {showField(fieldsToShow, "message") && !isCareerPage && (
                <TextAreaField
                    label="Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={2}
                />
            )}
            {showField(fieldsToShow, "agree") && (
                <CheckboxField
                    label="By submitting this form, I agree to Sri Maniya Institute’s Terms and Conditions and Privacy Policy."
                    name="agree"
                    checked={formData.agree}
                    onChange={handleChange}
                />
            )}
            <div className="flex justify-end mt-4">
                {submitText === "Download Brochure" ? (
                    <DownloadBrochureButton loading={loading} />
                ) : (
                    <SubmitButton loading={loading} submitText={submitText} />
                )}
            </div>
        </>
    );
};

// -------------------- Reusable Buttons --------------------
const SubmitButton: React.FC<{ loading?: boolean; submitText?: string }> = ({ loading, submitText }) => (
    <button
        type="submit"
        className="relative flex justify-center items-center rounded-full bg-transparent overflow-hidden cursor-pointer border border-(--yellow) group transition-all duration-300 min-w-[110px]"
        disabled={loading}
        style={loading ? { pointerEvents: 'none', opacity: 0.7 } : {}}
    >
        <span className="relative z-20 text-center no-underline w-full px-2 py-1 text-(--yellow) text-base transition-all duration-300 group-hover:text-(--blue)">{loading ? "Submitting..." : submitText}</span>
        <span className="absolute left-0 top-0 w-full h-0 bg-(--yellow) transition-all duration-300 ease-in-out group-hover:h-full group-hover:top-auto group-hover:bottom-0 z-10" />
    </button>
);

const DownloadBrochureButton: React.FC<{ loading?: boolean }> = ({ loading }) => (
    <button
        type="submit"
        className="relative flex justify-center items-center gap-1 rounded bg-(--yellow) overflow-hidden cursor-pointer border border-(--yellow) group transition-all duration-300 px-4 py-1"
        disabled={loading}
        style={loading ? { pointerEvents: 'none', opacity: 0.7 } : {}}
    >
        <span className="relative z-20 gap-x-1 flex items-center text-center no-underline w-full text-(--blue) transition-all duration-300 group-hover:text-(--yellow)">
            {loading ? "Downloading Brochure..." : "Download Brochure"} <GoDownload aria-label="Download Brochure" />
        </span>
        <span className="absolute left-0 top-0 w-full h-0 bg-(--blue) transition-all duration-300 ease-in-out group-hover:h-full group-hover:top-auto group-hover:bottom-0 z-10" />
    </button>
);

// -------------------- Autofill Suppression Fields --------------------
export const AutofillSuppressionFields: React.FC = () => (
    <>
        <input type="text" name="fakeusernameremembered" autoComplete="username" style={{ display: "none" }} tabIndex={-1} />
        <input type="password" name="fakePassword" autoComplete="new-password" style={{ display: "none" }} tabIndex={-1} />
    </>
);

export default CommonEnquiryFields;
