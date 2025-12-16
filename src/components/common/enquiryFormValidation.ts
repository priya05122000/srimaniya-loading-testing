import { EnquiryFormData } from './useEnquiryForm';
import { toast } from "react-toastify";

export function validateEnquiryForm(formData: EnquiryFormData, requireAgree: boolean = true, requiredName: boolean = true): boolean {
    const nameRegex = /^[A-Za-z.\s]+$/;
    const mobileRegex = /^[6-9]\d{9}$/;
    const emailRegex = /^[A-Za-z0-9](?:[A-Za-z0-9._%+-]{0,63})@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/;
    const isCareerPage = typeof window !== 'undefined' && window.location.pathname === '/career';

    // Name validation
    if (requiredName && (!nameRegex.test(formData.name) || formData.name.length < 2 || formData.name.length > 50)) {
        return false;
    }
    // Mobile validation
    if (!mobileRegex.test(formData.mobile)) {
        return false;
    }
    // Email validation (optional)
    if (formData.email && !emailRegex.test(formData.email)) {
        return false;
    }
    // Agree checkbox
    if (requireAgree && !formData.agree) {
        return false;
    }
    // Resume validation for /career page
    if (isCareerPage) {
        const resume = (formData as any).resume;
        if (!resume || !(resume instanceof File)) return false;
        // File type/extension
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
        // File name: only letters, numbers, space, _, -
        if (!/^[-_A-Za-z0-9 .]+$/.test(fileName)) return false;
        // Max size 2MB
        if (fileSize > 2 * 1024 * 1024) return false;
        // Accept if either type or extension matches (not both required)
    }
    return true;
}

export function validateEnquiryFormWithToast(formData: EnquiryFormData, requireAgree: boolean = true, requiredName: boolean = true): boolean {
    const isCareerPage = typeof window !== 'undefined' && window.location.pathname === '/career';
    if (!validateEnquiryForm(formData, requireAgree, requiredName)) {
        // Name
        if (requiredName && (!/^[A-Za-z.\s]+$/.test(formData.name) || formData.name.length < 2 || formData.name.length > 50)) {
            toast.error("Please enter a valid full name (letters and spaces only, 2–50 chars).");
            return false;
        }
        // Mobile
        else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
            toast.error("Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.");
            return false;
        }
        // Email
        else if (formData.email && !/^[A-Za-z0-9](?:[A-Za-z0-9._%+-]{0,63})@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/.test(formData.email)) {
            toast.error("Please enter a valid professional email address.");
            return false;
        }
        // Agree
        else if (requireAgree && !formData.agree) {
            toast.error("You must agree to the terms before submitting.");
            return false;
        }
        // Resume (career page)
        else if (isCareerPage) {
            const resume = (formData as any).resume;
            if (!resume || !(resume instanceof File)) {
                toast.error("Please upload your resume (.pdf, .doc, .docx, max 2MB).");
                return false;
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
                    return false;
                } else if (!/^[-_A-Za-z0-9 .]+$/.test(fileName)) {
                    toast.error("Resume file name can only have letters, numbers, spaces, hyphens, and underscores.");
                    return false;
                } else if (fileSize > 2 * 1024 * 1024) {
                    toast.error("Resume file size must be 2MB or less.");
                    return false;
                }
                // Accept if either type or extension matches (not both required)
            }
        }
        return false;
    }
    return true;
}
