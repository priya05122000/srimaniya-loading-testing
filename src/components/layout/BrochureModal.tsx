import React, { FC, ChangeEvent, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import CommonEnquiryFields, { AutofillSuppressionFields } from "@/components/enquiry-validation/CommonEnquiryFields";
import { validateEnquiryFormWithToast } from "@/components/enquiry-validation/enquiryFormValidation";
import { toast } from "react-toastify";
import { useEnquiryForm } from "@/components/enquiry-validation/useEnquiryForm";

export type BrochureFormData = {
    StudentName: string;
    StudentPhone: string;
};

interface BrochureModalProps {
    open: boolean;
    onClose: () => void;
    form: BrochureFormData;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const BrochureModal: FC<BrochureModalProps> = ({ open, onClose, form, onChange }) => {
    const { formData, handleChange, handleSubmit, loading } = useEnquiryForm({
        validateForm: (formData) => validateEnquiryFormWithToast(formData, false),
        onSubmit: async (payload) => {
            const brochureName = `(Brochure) ${payload.name}`;
            try {
                const responsePayload = { name: brochureName, phone_number: payload.phone_number, token: payload.token };
                const response = await import("@/services/appoinmentRequestService").then(m => m.createAppoinmentRequest(responsePayload));
                if (!response || !response.status || response.responseCode !== "INSERT_SUCCESS") {
                    toast.error("Failed to submit the form. Please try again.");
                    return;
                }
                await fetch(
                    "https://script.google.com/macros/s/AKfycbxQ0OGd2A5Tvs0_MQxcUWtWfwEmyAyHpdY6mcUXZKj87QXG0JP2ilZ9CTQxmhfkP6_r/exec",
                    {
                        method: "POST",
                        mode: "no-cors",
                        headers: { "Content-Type": "application/x-www-form-urlencoded" },
                        body: new URLSearchParams({
                            StudentName: brochureName,
                            StudentPhone: payload.phone_number,
                        }),
                    }
                );
                toast.success("Form submitted successfully!");
                const brochureUrl = "/pdf/brochure.pdf";
                const link = document.createElement("a");
                link.href = brochureUrl;
                link.download = "brochure.pdf";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                onClose();
            } catch (err) {
                console.error(err);
                toast.error("Failed to submit the form. Please try again.");
            }
        },
        captchaAction: "brochure_form",
    });

    useEffect(() => {
        handleChange({
            target: { name: "name", value: form.StudentName } as any
        } as React.ChangeEvent<HTMLInputElement>);
        handleChange({
            target: { name: "mobile", value: form.StudentPhone } as any
        } as React.ChangeEvent<HTMLInputElement>);
        // eslint-disable-next-line
    }, [form.StudentName, form.StudentPhone]);

    const handleMappedChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        handleChange(e);
        const { name, value } = e.target;
        if (name === "name") {
            onChange({
                target: { name: "StudentName", value } as any
            } as React.ChangeEvent<HTMLInputElement>);
        } else if (name === "mobile") {
            onChange({
                target: { name: "StudentPhone", value } as any
            } as React.ChangeEvent<HTMLInputElement>);
        }
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div className="fixed inset-0 z-100 flex items-center justify-center bg-(--grey-custom)/40 p-6"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                    <motion.div className="bg-(--blue) shadow-lg p-6 max-w-lg w-full relative"
                        initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} transition={{ duration: 0.3 }}>
                        <button className="absolute top-2 right-2 cursor-pointer text-2xl" onClick={onClose} aria-label="Close">
                            <IoClose />
                        </button>
                        <div className="mb-8 flex justify-center">
                            <Image src="/logos/navbarlogo.png" alt="Logo" width={376} height={94} className="w-48 md:w-72 image-tag" priority />
                        </div>
                        <form className="flex flex-col gap-y-2" onSubmit={handleSubmit} autoComplete="off">
                            <AutofillSuppressionFields />
                            <div className="grid grid-cols-1 gap-y-4 gap-x-6">
                                <CommonEnquiryFields
                                    formData={formData}
                                    handleChange={handleMappedChange}
                                    requiredMobile={true}
                                    requiredName={true}
                                    fieldsToShow={["name", "mobile"]}
                                    submitText="Download Brochure"
                                    loading={loading}
                                />
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default BrochureModal;
