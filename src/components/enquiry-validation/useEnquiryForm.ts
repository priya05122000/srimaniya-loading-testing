import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { uploadResumeFile } from "@/services/fileService";

// -------------------- Types & Initial State --------------------
export type EnquiryFormData = {
    name: string;
    email: string;
    mobile: string;
    message: string;
    course?: string;
    agree: boolean;
};

export const getInitialFormData = (): EnquiryFormData => ({
    name: "",
    email: "",
    mobile: "",
    message: "",
    course: "",
    agree: false,
});

// -------------------- Validation Helpers --------------------
const sanitizeName = (value: string) => value.replace(/[^A-Za-z.\s]/g, "");
const sanitizeMobile = (value: string) => value.replace(/\D/g, "").slice(0, 10).replace(/^[^6-9]+/, "");
const sanitizeEmail = (value: string) => value.replace(/[^a-zA-Z0-9@._-]/g, "").replace(/(@.*)@/g, "$1");
const sanitizeMessage = (value: string) => value.replace(/[^A-Za-z0-9\s.,!?\'"()\-]/g, "").slice(0, 300);

// -------------------- useEnquiryForm Hook --------------------
export function useEnquiryForm({
    validateForm,
    onSubmit,
    captchaAction = "enquiry_form",
    requiredName = true,
}: {
    validateForm?: (formData: EnquiryFormData) => boolean;
    onSubmit: (payload: any) => Promise<void>;
    captchaAction?: string;
    requiredName?: boolean;
}) {
    const [formData, setFormData] = useState<EnquiryFormData>(getInitialFormData());
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const { executeRecaptcha } = useGoogleReCaptcha();

    // Unified handleChange
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, type, value, checked } = e.target as HTMLInputElement;
        let newValue = value;

        switch (name) {
            case "name":
                newValue = sanitizeName(value);
                break;
            case "mobile":
                newValue = sanitizeMobile(value);
                break;
            case "email":
                newValue = sanitizeEmail(value);
                break;
            case "message":
                newValue = sanitizeMessage(value);
                break;
            default:
                break;
        }

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox"
                ? checked
                : (name === "email" && typeof newValue === "string"
                    ? newValue.toLowerCase()
                    : newValue)
        }));
    };

    // Unified handleSubmit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        let tempFormData = { ...formData };
        if (!requiredName) tempFormData.name = "(popup)";
        if (validateForm && !validateForm(tempFormData)) return;
        if (!executeRecaptcha) {
            setError("Captcha failed. Please refresh and try again.");
            console.log("executeRecaptcha not available");
            return;
        }
        setLoading(true);
        try {
            const captchaToken = await executeRecaptcha(captchaAction);
            // console.log("Captcha token:", captchaToken);

            let resumeUrl = null;
            if ((formData as any).resume) {
                const resumeFormData = new FormData();
                resumeFormData.append("file", (formData as any).resume);
                const uploadResponse = await uploadResumeFile(resumeFormData);
                resumeUrl = uploadResponse.data?.file_path || null;
            }
            const payload = {
                name: tempFormData.name,
                email: tempFormData.email || null,
                phone_number: tempFormData.mobile ? `+91${tempFormData.mobile}` : null,
                message: tempFormData.message || null,
                course_id: tempFormData.course || null,
                token: captchaToken,
                resume_url: resumeUrl,
            };
            await onSubmit(payload);
            setFormData(getInitialFormData());
            setSuccess("Enquiry submitted successfully!");
        } catch (error: any) {
            setError(error?.message || "Failed to submit enquiry.");
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        setFormData,
        handleChange,
        handleSubmit,
        loading,
        error,
        setError,
        success,
        setSuccess,
    };
}
