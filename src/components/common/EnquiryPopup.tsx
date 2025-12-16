import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import Heading from "@/components/common/Heading";
import CommonEnquiryFields, { AutofillSuppressionFields } from "@/components/enquiry-validation/CommonEnquiryFields";
import { useEnquiryForm } from "@/components/enquiry-validation/useEnquiryForm";
import { validateEnquiryFormWithToast } from "@/components/enquiry-validation/enquiryFormValidation";
import { toast } from "react-toastify";

interface EnquiryPopupProps {
    show: boolean;
    onClose: () => void;
    // Optionally accept initial values if needed
}

const EnquiryPopup: React.FC<EnquiryPopupProps> = ({ show, onClose }) => {
    const { formData, handleChange, handleSubmit, loading, setFormData } = useEnquiryForm({
        validateForm: (formData) => validateEnquiryFormWithToast(formData, false, false),
        onSubmit: async (payload) => {
            const popupName = "(Enquiry popup)";
            try {
                // Send to Google Script (send name as popupName and StudentPhone with +91)
                await fetch(
                    "https://script.google.com/macros/s/AKfycbxQ0OGd2A5Tvs0_MQxcUWtWfwEmyAyHpdY6mcUXZKj87QXG0JP2ilZ9CTQxmhfkP6_r/exec",
                    {
                        method: "POST",
                        mode: "no-cors",
                        headers: { "Content-Type": "application/x-www-form-urlencoded" },
                        body: new URLSearchParams({
                            StudentName: popupName,
                            StudentPhone: payload.phone_number || "",
                        }),
                    }
                );
                // Send to backend
                const response = await import("@/services/appoinmentRequestService").then(m => m.createAppoinmentRequest({
                    name: popupName,
                    phone_number: payload.phone_number,
                    token: payload.token,
                }));
                if (!response || !response.status || response.responseCode !== "INSERT_SUCCESS") {
                    toast.error("Failed to submit the form. Please try again.");
                    return;
                }
                toast.success("Form submitted successfully!");
                setFormData({
                    name: "",
                    email: "",
                    mobile: "",
                    message: "",
                    agree: false,
                });
                onClose();
            } catch (err) {
                console.error(err);
                toast.error("Failed to submit the form. Please try again.");
            }
        },
        captchaAction: "popup_form",
        requiredName: false,
    });

    // Reset form when popup opens
    useEffect(() => {
        if (show) {
            setFormData({
                name: "",
                email: "",
                mobile: "",
                message: "",
                agree: false,
            });
        }
    }, [show, setFormData]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="fixed inset-0 z-100 flex items-center justify-center bg-(--black)/60 p-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div
                        className="bg-(--blue-overlay-custom) shadow-2xl p-6  w-[400px] relative backdrop-blur-md"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <button
                            className="absolute top-2 right-2 cursor-pointer text-xl text-(--bg-grey)"
                            onClick={onClose}
                            aria-label="Close"
                        >
                            <IoClose />
                        </button>
                        <Heading
                            level={6}
                            className="font-bold my-6 leading-tight text-center text-(--white) uppercase"
                        >
                            Enquire Now
                        </Heading>
                        <form onSubmit={handleSubmit} className="space-y-2 w-full mx-auto">
                            <AutofillSuppressionFields />
                            <CommonEnquiryFields
                                formData={formData}
                                handleChange={handleChange}
                                requiredMobile={true}
                                requiredName={false}
                                fieldsToShow={["mobile"]}
                                loading={loading}
                                submitText="Submit"
                            />
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default EnquiryPopup;
