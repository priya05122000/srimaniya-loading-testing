import { toast } from "react-toastify";
import { EnquiryFormData } from "./useEnquiryForm";

// -------------------- Validation Regex Constants --------------------
const NAME_REGEX = /^[A-Za-z.\s]+$/;
const MOBILE_REGEX = /^[6-9]\d{9}$/;
const EMAIL_REGEX = /^[A-Za-z0-9](?:[A-Za-z0-9._%+-]{0,63})@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/;
const MESSAGE_REGEX = /^[A-Za-z0-9\s.,!?\'"()\-]{0,300}$/;

// -------------------- Core Validation Function --------------------
export function validateEnquiryForm(
    formData: EnquiryFormData,
    requireAgree: boolean = true,
    requiredName: boolean = true
): boolean {
    const isCareerPage = typeof window !== 'undefined' && window.location.pathname === '/career';
    if (requiredName && (!NAME_REGEX.test(formData.name) || formData.name.length < 2 || formData.name.length > 50)) return false;
    if (!MOBILE_REGEX.test(formData.mobile)) return false;
    if (formData.email && !EMAIL_REGEX.test(formData.email)) return false;
    if (requireAgree && !formData.agree) return false;
    if (formData.message && !MESSAGE_REGEX.test(formData.message)) return false;
    if (isCareerPage) {
        const resume = (formData as any).resume;
        if (!resume || !(resume instanceof File)) return false;
        const allowedTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ];
        const allowedExts = [".pdf", ".doc", ".docx"];
        const fileName = resume.name;
        const fileSize = resume.size;
        const ext = fileName.substring(fileName.lastIndexOf(".")).toLowerCase();
        if (!allowedTypes.includes(resume.type) && !allowedExts.includes(ext)) return false;
        if (!/^[-_A-Za-z0-9 .]+$/.test(fileName)) return false;
        if (fileSize > 2 * 1024 * 1024) return false;
    }
    return true;
}

// -------------------- Toast Validation Wrapper --------------------
export function validateEnquiryFormWithToast(
    formData: EnquiryFormData,
    requireAgree: boolean = true,
    requiredName: boolean = true
): boolean {
    const isCareerPage = typeof window !== 'undefined' && window.location.pathname === '/career';
    if (!validateEnquiryForm(formData, requireAgree, requiredName)) {
        if (requiredName && (!NAME_REGEX.test(formData.name) || formData.name.length < 2 || formData.name.length > 50)) {
            toast.error("Please enter a valid full name (letters and spaces only, 2–50 chars).");
        } else if (!MOBILE_REGEX.test(formData.mobile)) {
            toast.error("Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.");
        } else if (formData.email && !EMAIL_REGEX.test(formData.email)) {
            toast.error("Please enter a valid professional email address.");
        } else if (requireAgree && !formData.agree) {
            toast.error("You must agree to the terms before submitting.");
        } else if (formData.message && !MESSAGE_REGEX.test(formData.message)) {
            toast.error("Please enter a valid message (letters, numbers, spaces, and . , ! ? ' \" ( ) - allowed, max 300 chars).");
        } else if (isCareerPage) {
            const resume = (formData as any).resume;
            if (!resume || !(resume instanceof File)) {
                toast.error("Please upload your resume (.pdf, .doc, .docx, max 2MB).");
            } else {
                const allowedTypes = [
                    "application/pdf",
                    "application/msword",
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                ];
                const allowedExts = [".pdf", ".doc", ".docx"];
                const fileName = resume.name;
                const fileSize = resume.size;
                const ext = fileName.substring(fileName.lastIndexOf(".")).toLowerCase();
                if (!allowedTypes.includes(resume.type) && !allowedExts.includes(ext)) {
                    toast.error("Resume must be a PDF, DOC, or DOCX file.");
                } else if (!/^[-_A-Za-z0-9 .]+$/.test(fileName)) {
                    toast.error("Resume file name can only have letters, numbers, spaces, hyphens, and underscores.");
                } else if (fileSize > 2 * 1024 * 1024) {
                    toast.error("Resume file size must be 2MB or less.");
                }
            }
        }
        return false;
    }
    return true;
}
