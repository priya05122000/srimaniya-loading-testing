import { EnquiryFormData } from './useEnquiryForm';
import { toast } from "react-toastify";

export function validateEnquiryForm(formData: EnquiryFormData): boolean {
    const nameRegex = /^[A-Za-z.\s]+$/;
    // Updated: Mobile must start with 6,7,8,9 and be 10 digits
    const mobileRegex = /^[6-9]\d{9}$/;
    const emailRegex = /^[A-Za-z0-9](?:[A-Za-z0-9._%+-]{0,63})@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/;
    // List of common fake/typo domains to block
    const blockedDomains = [
        'gamil.com', 'gmial.com', 'gnail.com', 'gmaill.com', 'gmail.con', 'gmail.co',
        'yaho.com', 'yahooo.com', 'yahho.com', 'outlok.com', 'outlook.co', 'rediffmail.co',
        'hotmial.com', 'hotmai.com', 'icloud.co', 'protonmail.co', 'email.com', 'test.com', 'example.com'
    ];
    if (!nameRegex.test(formData.name) || formData.name.length < 2 || formData.name.length > 50) {
        return false;
    }
    if (!mobileRegex.test(formData.mobile)) {
        return false;
    }
    if (formData.email) {
        if (!emailRegex.test(formData.email)) {
            return false;
        }
        const domain = formData.email.split('@')[1]?.toLowerCase();
        if (domain && blockedDomains.includes(domain)) {
            return false;
        }
    }
    if (!formData.agree) {
        return false;
    }
    return true;
}

export function validateEnquiryFormWithToast(formData: EnquiryFormData): boolean {
    if (!validateEnquiryForm(formData)) {
        if (!/^[A-Za-z.\s]+$/.test(formData.name) || formData.name.length < 2 || formData.name.length > 50) {
            toast.error("Please enter a valid full name (letters and spaces only, 2–50 chars).");
        } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
            toast.error("Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.");
        } else if (formData.email && !/^[A-Za-z0-9](?:[A-Za-z0-9._%+-]{0,63})@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/.test(formData.email)) {
            toast.error("Please enter a valid professional email address.");
        } else if (formData.email) {
            const domain = formData.email.split('@')[1]?.toLowerCase();
            const blockedDomains = [
                'gamil.com', 'gmial.com', 'gnail.com', 'gmaill.com', 'gmail.con', 'gmail.co',
                'yaho.com', 'yahooo.com', 'yahho.com', 'outlok.com', 'outlook.co', 'rediffmail.co',
                'hotmial.com', 'hotmai.com', 'icloud.co', 'protonmail.co', 'email.com', 'test.com', 'example.com'
            ];
            if (domain && blockedDomains.includes(domain)) {
                toast.error("Please enter a valid email domain (not a fake or typo domain).");
            }
        } else if (!formData.agree) {
            toast.error("You must agree to the terms before submitting.");
        }
        return false;
    }
    return true;
}
