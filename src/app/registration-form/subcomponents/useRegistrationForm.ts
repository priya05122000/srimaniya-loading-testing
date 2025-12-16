import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

// Types
export type RegistrationFormData = {
    StudentName: string;
    ParentName: string;
    StudentPhone: string;
    ParentPhone: string;
    StudentEmail: string;
    Address: string;
    City: string;
    State: string;
    District: string;
    PinCode: string;
};

export const getInitialRegistrationFormData = (): RegistrationFormData => ({
    StudentName: "",
    ParentName: "",
    StudentPhone: "",
    ParentPhone: "",
    StudentEmail: "",
    Address: "",
    City: "",
    State: "",
    District: "",
    PinCode: "",
});

export function useRegistrationForm({
    validateForm,
    onSubmit,
    captchaAction = "registration_form",
    requiredName = true,
}: {
    validateForm?: (formData: RegistrationFormData) => boolean;
    onSubmit: (payload: any) => Promise<void>;
    captchaAction?: string;
    requiredName?: boolean;
}) {
    const [formData, setFormData] = useState<RegistrationFormData>(getInitialRegistrationFormData());
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const { executeRecaptcha } = useGoogleReCaptcha();

    // Unified handleChange
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, type, value, checked } = e.target as HTMLInputElement;
        let newValue = value;

        // Only allow alphabets, dots, and spaces for StudentName and ParentName
        if (name === "StudentName" || name === "ParentName") {
            newValue = value.replace(/[^A-Za-z.\s]/g, "");
        }

        // Only allow numbers for phone fields
        if (["StudentPhone", "ParentPhone", "PinCode"].includes(name)) {
            newValue = value.replace(/\D/g, "");
            if (name === "StudentPhone" || name === "ParentPhone") {
                newValue = newValue.slice(0, 10);
            }
            if (name === "PinCode") {
                newValue = newValue.slice(0, 6);
            }
        }

        // Only allow valid email characters for StudentEmail
        if (name === "StudentEmail") {
            newValue = value.replace(/[^a-zA-Z0-9@._-]/g, "").replace(/(@.*)@/g, "$1");
        }

        if (name === "Address") {
            // Only allow allowed characters
            newValue = value.replace(/[^A-Za-z0-9\s,.\-\/#()]/g, "");
            // Optionally trim to 200 chars
            newValue = newValue.slice(0, 200);
        }

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : newValue,
        }));
    };

    // Unified handleSubmit
    const handleSubmit = async (e: React.FormEvent) => {
        console.log('handleSubmit called, event:', e); // Debug log
        e.preventDefault();
        setError(null);
        setSuccess(null);

        let tempFormData = { ...formData };
        if (!requiredName) {
            tempFormData.StudentName = "(popup)";
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
            const payload = {
                ...tempFormData,
                phone_number: tempFormData.StudentPhone ? `+91${tempFormData.StudentPhone}` : null,
                token: captchaToken,
            };
            await onSubmit(payload);
            setFormData(getInitialRegistrationFormData());
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
