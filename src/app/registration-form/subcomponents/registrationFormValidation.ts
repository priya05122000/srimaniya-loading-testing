import { toast } from "react-toastify";
import { RegistrationFormData } from "./useRegistrationForm";

// -------------------- Validation Regex Constants --------------------
const NAME_REGEX = /^[A-Za-z.\s]+$/;
const MOBILE_REGEX = /^[6-9]\d{9}$/;
const EMAIL_REGEX = /^[A-Za-z0-9](?:[A-Za-z0-9._%+-]{0,63})@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/;
const ADDRESS_REGEX = /^[A-Za-z0-9\s,.-\/#!()]{5,200}$/;
const PINCODE_REGEX = /^[1-9][0-9]{5}$/;
const CITY_REGEX = /^[A-Za-z.\-\s]{2,50}$/;

// -------------------- Core Validation Function --------------------
export function ValidateRegistrationForm(
    formData: RegistrationFormData,
    _requireAgree: boolean = true, // unused, kept for backward compatibility
    requiredName: boolean = true
): boolean {
    if (requiredName && (!NAME_REGEX.test(formData.StudentName) || formData.StudentName.length < 2 || formData.StudentName.length > 50)) return false;
    if (!NAME_REGEX.test(formData.ParentName) || formData.ParentName.length < 2 || formData.ParentName.length > 50) return false;
    if (formData.StudentPhone && !MOBILE_REGEX.test(formData.StudentPhone)) return false;
    if (!MOBILE_REGEX.test(formData.ParentPhone)) return false;
    if (formData.StudentEmail && !EMAIL_REGEX.test(formData.StudentEmail)) return false;
    if (formData.PinCode && !PINCODE_REGEX.test(formData.PinCode)) return false;
    if (!formData.Address || !ADDRESS_REGEX.test(formData.Address)) return false;
    if (formData.City && !CITY_REGEX.test(formData.City)) return false;
    if (!formData.State) return false;
    // District is optional
    return true;
}

// -------------------- Toast Validation Wrapper --------------------
export function ValidateRegistrationFormWithToast(
    formData: RegistrationFormData,
    _requireAgree: boolean = true, // unused, kept for backward compatibility
    requiredName: boolean = true
): boolean {
    if (!ValidateRegistrationForm(formData, _requireAgree, requiredName)) {
        if (requiredName && (!NAME_REGEX.test(formData.StudentName) || formData.StudentName.length < 2 || formData.StudentName.length > 50)) {
            toast.error("Please enter a valid student name (letters and spaces only, 2–50 chars).");
        } else if (!NAME_REGEX.test(formData.ParentName) || formData.ParentName.length < 2 || formData.ParentName.length > 50) {
            toast.error("Please enter a valid parent name (letters and spaces only, 2–50 chars).");
        } else if (formData.StudentPhone && !MOBILE_REGEX.test(formData.StudentPhone)) {
            toast.error("Please enter a valid 10-digit student phone number starting with 6, 7, 8, or 9.");
        } else if (!MOBILE_REGEX.test(formData.ParentPhone)) {
            toast.error("Please enter a valid 10-digit parent phone number starting with 6, 7, 8, or 9.");
        } else if (formData.StudentEmail && !EMAIL_REGEX.test(formData.StudentEmail)) {
            toast.error("Please enter a valid professional email address.");
        } else if (formData.PinCode && !PINCODE_REGEX.test(formData.PinCode)) {
            toast.error("Please enter a valid 6-digit pin code (first digit 1-9, never 0).");
        } else if (!formData.Address || !ADDRESS_REGEX.test(formData.Address)) {
            toast.error("Please enter a valid address (5–200 characters, only letters, numbers, spaces, and , . - / # ( ) allowed).");
        } else if (formData.City && !CITY_REGEX.test(formData.City)) {
            toast.error("Please enter a valid city/town/village name (letters, spaces, dot, hyphen only, 2–50 characters, no numbers).");
        } else if (!formData.State) {
            toast.error("Please select a state.");
        }
        // District is optional; no error if empty
        return false;
    }
    return true;
}
