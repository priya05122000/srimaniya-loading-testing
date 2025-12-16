"use client";

import React from "react";
import {
    InputField,
    TextAreaField,
    SelectField,
} from "@/components/ui/FormFields";

// -------------------- Types --------------------
export type CommonRegistrationFormData = {
    StudentName: string;
    ParentName: string;
    StudentPhone: string;
    ParentPhone: string;
    StudentEmail: string;
    City: string;
    State: string;
    District: string;
    PinCode: string;
    Address: string;
};

export type CommonRegistrationFieldsProps = {
    formData: CommonRegistrationFormData;
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

// -------------------- Main Component --------------------
const CommonRegistrationFields: React.FC<CommonRegistrationFieldsProps & {
    districts?: Record<string, string[]>;
    districtOptions?: string[];
    toast?: any;
}> = ({
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
    districts = {},
    districtOptions = [],
    toast,
}) => {
        // Helper to check if a field should be shown
        const showField = (field: string) => !fieldsToShow || fieldsToShow.includes(field);

        return (
            <>
                {showField("StudentName") && (
                    <InputField label="Student Name *" name="StudentName" required value={formData.StudentName || ""} onChange={handleChange} />
                )}
                {showField("ParentName") && (
                    <InputField label="Parent Name *" name="ParentName" required value={formData.ParentName || ""} onChange={handleChange} />
                )}
                {showField("StudentPhone") && (
                    <InputField label="Student Phone Number" name="StudentPhone" type="tel" value={formData.StudentPhone || ""} onChange={handleChange} pattern="[0-9]{10}" maxLength={10} />
                )}
                {showField("ParentPhone") && (
                    <InputField label="Parent's Phone Number *" name="ParentPhone" type="tel" required value={formData.ParentPhone || ""} onChange={handleChange} pattern="[0-9]{10}" maxLength={10} />
                )}
                {showField("StudentEmail") && (
                    <InputField label="Email" name="StudentEmail" type="email" value={formData.StudentEmail || ""} onChange={handleChange} />
                )}
                {showField("City") && (
                    <InputField label="City / Town / Village" name="City" value={formData.City || ""} onChange={handleChange} />
                )}
                {showField("State") && (
                    <SelectField label="State *" name="State" required value={formData.State || ""} onChange={handleChange as any} options={Object.keys(districts).map((state) => ({ value: state, label: state }))} />
                )}
                {showField("District") && (
                    <SelectField label="District" name="District" value={formData.District || ""} onChange={handleChange as any} options={!formData.State ? [{ value: "", label: "Select State First" }] : districtOptions.map((district) => ({ value: district, label: district }))} onClick={() => { if (!formData.State && toast) toast.error("Please select the State first."); }} />
                )}
                {showField("PinCode") && (
                    <InputField label="Pin Code *" name="PinCode" required value={formData.PinCode || ""} onChange={handleChange} pattern="[0-9]{6}" maxLength={6} />
                )}
                {showField("Address") && (
                    <TextAreaField label="Address *" name="Address" required value={formData.Address || ""} onChange={handleChange} />
                )}
                <div className="flex justify-end mt-4">
                    <SubmitButton loading={loading} submitText={submitText} />
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
    >
        <span className="relative z-20 text-center no-underline w-full px-2 py-1 text-(--yellow) text-base transition-all duration-300 group-hover:text-(--blue)">{loading ? "Submitting..." : submitText}</span>
        <span className="absolute left-0 top-0 w-full h-0 bg-(--yellow) transition-all duration-300 ease-in-out group-hover:h-full group-hover:top-auto group-hover:bottom-0 z-10" />
    </button>
);



// -------------------- Autofill Suppression Fields --------------------
export const AutofillSuppressionFields: React.FC = () => (
    <>
        <input type="text" name="fakeusernameremembered" autoComplete="username" style={{ display: "none" }} tabIndex={-1} />
        <input type="password" name="fakePassword" autoComplete="new-password" style={{ display: "none" }} tabIndex={-1} />
    </>
);

export default CommonRegistrationFields;
