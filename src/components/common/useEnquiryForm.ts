import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { uploadResumeFile } from "@/services/fileService";

// Types
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
        const { name, type, value, checked, files } = e.target as HTMLInputElement;
        let newValue = value;

        if (type === "file") {
            setFormData((prev) => ({
                ...prev,
                [name]: files && files.length > 0 ? files[0] : null
            }));
            return;
        }

        if (name === "name") {
            newValue = value.replace(/[^A-Za-z.\s]/g, "");
        }

        if (name === "mobile") {
            // Only allow numbers, max 10 digits, and first digit must be 6-9
            newValue = value.replace(/\D/g, "").slice(0, 10);
            if (newValue.length > 0 && !/^[6-9]/.test(newValue)) {
                newValue = newValue.replace(/^[^6-9]+/, "");
            }
        }

        if (name === "email") {
            newValue = value.replace(/[^a-zA-Z0-9@._-]/g, "").replace(/(@.*)@/g, "$1");
        }

        if (name === "message") {
            newValue = value.replace(/[^A-Za-z0-9\s.,!?\'"()\-]/g, "").slice(0, 300);
        }

        // Convert email to lowercase before saving, but allow capital letters during input
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
        if (!requiredName) {
            tempFormData.name = "(popup)";
        }

        if (validateForm && !validateForm(tempFormData)) return;
        if (!executeRecaptcha) {
            setError("Captcha failed. Please refresh and try again.");
            return;
        }

        setLoading(true);
        try {
            const captchaToken = await executeRecaptcha(captchaAction);
            console.log("Captcha token:", captchaToken);
            let resumeUrl = null;

            if ((formData as any).resume) {
                // If resume file exists, upload it
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

            console.log(payload);

            await onSubmit(payload);
            setFormData(getInitialFormData());
            setSuccess("Enquiry submitted successfully!");
        } catch (error: any) {
            const errorMsg = error?.message || "Failed to submit enquiry.";
            setError(errorMsg);
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
