import { toast } from "react-toastify";
import { RegistrationFormData } from "./useRegistrationForm";

export function ValidateRegistrationForm(
    formData: RegistrationFormData,
    requireAgree: boolean = true,
    requiredName: boolean = true
): boolean {
    const nameRegex = /^[A-Za-z.\s]+$/;
    const mobileRegex = /^[6-9]\d{9}$/;
    const emailRegex = /^[A-Za-z0-9](?:[A-Za-z0-9._%+-]{0,63})@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/;
    const addressRegex = /^[A-Za-z0-9\s,.\-\/#()]{5,200}$/;

    // Student Name validation
    if (requiredName && (!nameRegex.test(formData.StudentName) || formData.StudentName.length < 2 || formData.StudentName.length > 50)) {
        return false;
    }
    // Parent Name validation
    if (!nameRegex.test(formData.ParentName) || formData.ParentName.length < 2 || formData.ParentName.length > 50) {
        return false;
    }
    // Student Phone validation
    if (!mobileRegex.test(formData.StudentPhone)) {
        return false;
    }
    // Parent Phone validation
    if (!mobileRegex.test(formData.ParentPhone)) {
        return false;
    }
    // Student Email validation (optional)
    if (formData.StudentEmail && !emailRegex.test(formData.StudentEmail)) {
        return false;
    }
    // PinCode validation
    if (formData.PinCode && !/^\d{6}$/.test(formData.PinCode)) {
        return false;
    }
    // Address validation
    if (!formData.Address || !addressRegex.test(formData.Address)) {
        return false;
    }
    // City validation (allow empty, but if not empty, must be at least 2 chars)
    if (formData.City && formData.City.length < 2) {
        return false;
    }
    // State and District validation
    if (!formData.State) {
        return false;
    }
    // District is optional
    return true;
}

export function ValidateRegistrationFormWithToast(
    formData: RegistrationFormData,
    requireAgree: boolean = true,
    requiredName: boolean = true
): boolean {
    const addressRegex = /^[A-Za-z0-9\s,.\-\/#()]{5,200}$/;

    if (!ValidateRegistrationForm(formData, requireAgree, requiredName)) {
        if (requiredName && (!/^[A-Za-z.\s]+$/.test(formData.StudentName) || formData.StudentName.length < 2 || formData.StudentName.length > 50)) {
            toast.error("Please enter a valid student name (letters and spaces only, 2–50 chars).");
            return false;
        } else if (!/^[A-Za-z.\s]+$/.test(formData.ParentName) || formData.ParentName.length < 2 || formData.ParentName.length > 50) {
            toast.error("Please enter a valid parent name (letters and spaces only, 2–50 chars).");
            return false;
        } else if (formData.StudentPhone && !/^[6-9]\d{9}$/.test(formData.StudentPhone)) {
            toast.error("Please enter a valid 10-digit student phone number starting with 6, 7, 8, or 9.");
            return false;
        } else if (!/^[6-9]\d{9}$/.test(formData.ParentPhone)) {
            toast.error("Please enter a valid 10-digit parent phone number starting with 6, 7, 8, or 9.");
            return false;
        } else if (formData.StudentEmail && !/^[A-Za-z0-9](?:[A-Za-z0-9._%+-]{0,63})@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/.test(formData.StudentEmail)) {
            toast.error("Please enter a valid email address.");
            return false;
        } else if (formData.PinCode && !/^\d{6}$/.test(formData.PinCode)) {
            toast.error("Please enter a valid 6-digit pin code.");
            return false;
        } else if (!formData.Address || !addressRegex.test(formData.Address)) {
            toast.error("Please enter a valid address (5–200 characters, only letters, numbers, spaces, and , . - / # ( ) allowed).");
            return false;
        } else if (formData.City && formData.City.length < 2) {
            toast.error("Please enter a valid city/town/village name (at least 2 characters) or leave it blank.");
            return false;
        } else if (!formData.State) {
            toast.error("Please select a state.");
            return false;
        }
        // District is optional; no error if empty
        return false;
    }
    return true;
}
