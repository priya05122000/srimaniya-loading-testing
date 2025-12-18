import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

// -------------------- Types & Initial State --------------------
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

// -------------------- Validation Helpers --------------------
const sanitizeName = (value: string) => value.replace(/[^A-Za-z.\s]/g, "");
const sanitizePhone = (value: string) => value.replace(/\D/g, "").slice(0, 10).replace(/^[^6-9]+/, "");
const sanitizePinCode = (value: string) => value.replace(/\D/g, "").slice(0, 6).replace(/^[^1-9]+/, "");
const sanitizeEmail = (value: string) => value.replace(/[^a-zA-Z0-9@._-]/g, "").replace(/(@.*)@/g, "$1");
const sanitizeCity = (value: string) => value.replace(/[^A-Za-z.\-\s]/g, "");
const sanitizeAddress = (value: string) => value.replace(/[^A-Za-z0-9\s,.\-\/#!()]/g, "").slice(0, 200);

// -------------------- useRegistrationForm Hook --------------------
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

        switch (name) {
            case "StudentName":
            case "ParentName":
                newValue = sanitizeName(value);
                break;
            case "StudentPhone":
            case "ParentPhone":
                newValue = sanitizePhone(value);
                break;
            case "PinCode":
                newValue = sanitizePinCode(value);
                break;
            case "StudentEmail":
                newValue = sanitizeEmail(value);
                break;
            case "City":
                newValue = sanitizeCity(value);
                break;
            case "Address":
                newValue = sanitizeAddress(value);
                break;
            default:
                break;
        }

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox"
                ? checked
                : (name === "StudentEmail" && typeof newValue === "string"
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
        if (!requiredName) tempFormData.StudentName = "(popup)";
        if (validateForm && !validateForm(tempFormData)) return;
        if (!executeRecaptcha) {
            setError("Captcha failed. Please refresh and try again.");
            return;
        }
        setLoading(true);
        try {
            const captchaToken = await executeRecaptcha(captchaAction);
            const payload = {
                ...tempFormData,
                phone_number: tempFormData.StudentPhone ? `+91${tempFormData.StudentPhone}` : null,
                token: captchaToken,
            };
            await onSubmit(payload);
            setFormData(getInitialRegistrationFormData());
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
