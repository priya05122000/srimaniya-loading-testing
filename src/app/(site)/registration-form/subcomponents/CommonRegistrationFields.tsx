"use client";

import React from "react";
import {
    InputField,
    TextAreaField,
    SelectField,
} from "@/components/ui/FormFields";
import type { RegistrationFormData } from "./useRegistrationForm";

// -------------------- Types --------------------
export type CommonRegistrationFieldsProps = {
    formData: RegistrationFormData;
    handleChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    fieldsToShow?: string[];
    loading?: boolean;
    submitText?: string;
    handleClear?: () => void;
};

// -------------------- Helper: Show Field --------------------
const showField = (fieldsToShow: string[] | undefined, field: string) => !fieldsToShow || fieldsToShow.includes(field);

// -------------------- Main Component --------------------
const CommonRegistrationFields: React.FC<CommonRegistrationFieldsProps & {
    districts?: Record<string, string[]>;
    districtOptions?: string[];
    toast?: any;
}> = ({
    formData,
    handleChange,
    fieldsToShow,
    loading = false,
    submitText = "Submit",
    districts = {},
    districtOptions = [],
    toast,
    handleClear,
}) => (
        <>
            {showField(fieldsToShow, "StudentName") && (
                <InputField label="Student Name *" name="StudentName" required value={formData.StudentName || ""} onChange={handleChange} />
            )}
            {showField(fieldsToShow, "ParentName") && (
                <InputField label="Parent Name *" name="ParentName" required value={formData.ParentName || ""} onChange={handleChange} />
            )}
            {showField(fieldsToShow, "StudentPhone") && (
                <InputField label="Student Phone Number" name="StudentPhone" type="tel" value={formData.StudentPhone || ""} onChange={handleChange} pattern="[0-9]{10}" maxLength={10} />
            )}
            {showField(fieldsToShow, "ParentPhone") && (
                <InputField label="Parent's Phone Number *" name="ParentPhone" type="tel" required value={formData.ParentPhone || ""} onChange={handleChange} pattern="[0-9]{10}" maxLength={10} />
            )}
            {showField(fieldsToShow, "StudentEmail") && (
                <InputField label="Email" name="StudentEmail" type="email" value={formData.StudentEmail || ""} onChange={handleChange} />
            )}
            {showField(fieldsToShow, "City") && (
                <InputField label="City / Town / Village" name="City" value={formData.City || ""} onChange={handleChange} />
            )}
            {showField(fieldsToShow, "State") && (
                <SelectField label="State *" name="State" required value={formData.State || ""} onChange={handleChange as any} options={Object.keys(districts).map((state) => ({ value: state, label: state }))} />
            )}
            {showField(fieldsToShow, "District") && (
                <SelectField label="District" name="District" value={formData.District || ""} onChange={handleChange as any} options={!formData.State ? [{ value: "", label: "Select State First" }] : districtOptions.map((district) => ({ value: district, label: district }))} onClick={() => { if (!formData.State && toast) toast.error("Please select the State first."); }} />
            )}
            {showField(fieldsToShow, "PinCode") && (
                <InputField label="Pin Code *" name="PinCode" required value={formData.PinCode || ""} onChange={handleChange} pattern="[0-9]{6}" maxLength={6} />
            )}
            {showField(fieldsToShow, "Address") && (
                <TextAreaField label="Address *" name="Address" required value={formData.Address || ""} onChange={handleChange} />
            )}
        </>
    );

// -------------------- Autofill Suppression Fields --------------------
export const AutofillSuppressionFields: React.FC = () => (
    <>
        <input type="text" name="fakeusernameremembered" autoComplete="username" style={{ display: "none" }} tabIndex={-1} />
        <input type="password" name="fakePassword" autoComplete="new-password" style={{ display: "none" }} tabIndex={-1} />
    </>
);

export default CommonRegistrationFields;
