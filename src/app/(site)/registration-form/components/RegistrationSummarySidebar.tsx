"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Close } from "@/components/icons/Icons";
import Heading from "@/components/common/Heading";
import Paragraph from "@/components/common/Paragraph";
import RazorpayPayButton from "@/components/common/RazorpayPayButton";
import PaymentConfirmationModal from "./PaymentConfirmationModal";
import type { RegistrationFormData } from "../subcomponents/useRegistrationForm";

const REGISTRATION_FEE_AMOUNT = Number(process.env.NEXT_PUBLIC_REGISTRATION_FEE_AMOUNT) || 100;

const FIELD_LABELS: Record<keyof RegistrationFormData, string> = {
  StudentName: "Student Name",
  ParentName: "Parent Name",
  StudentPhone: "Student Phone",
  ParentPhone: "Parent Phone",
  StudentEmail: "Student Email",
  Address: "Address",
  City: "City",
  State: "State",
  District: "District",
  PinCode: "Pin Code",
};

interface RegistrationSummarySidebarProps {
  show: boolean;
  onClose: () => void;
  formData: RegistrationFormData;
  admissionId?: string | number | null;
  onPaymentSuccess?: (verifyResponse: any) => void;
  onPaymentFailure?: (error: any) => void;
  onPaymentCancel?: () => void;
}

const RegistrationSummarySidebar: React.FC<RegistrationSummarySidebarProps> = ({
  show,
  onClose,
  formData,
  admissionId,
  onPaymentSuccess,
  onPaymentFailure,
  onPaymentCancel,
}) => {
  const [confirmation, setConfirmation] = useState<{
    open: boolean;
    verifyResponse?: any;
  }>({ open: false });

  const showConfirmation = confirmation.open;
  const showSummary = show && !showConfirmation;

  useEffect(() => {
    if (!showSummary && !showConfirmation) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = overflow;
    };
  }, [showSummary, showConfirmation]);

  if (showConfirmation) {
    return (
      <PaymentConfirmationModal
        show={showConfirmation}
        verifyResponse={confirmation.verifyResponse}
        onClose={() => setConfirmation({ open: false })}
      />
    );
  }

  if (!showSummary) return null;

  return createPortal(
    <div className="fixed inset-0 z-100 h-dvh w-screen flex items-center justify-center bg-(--black)/30 backdrop-blur-xs p-6 animate-modal-overlay">
      <div className="bg-(--white) shadow-2xl p-8 w-full max-w-125 max-h-[90vh] relative overflow-y-auto animate-modal-content">
        <button
          className="absolute top-6 right-6 cursor-pointer text-xl text-(--blue)"
          onClick={() => {
            onPaymentCancel?.();
            onClose();
          }}
          aria-label="Close"
        >
          <Close aria-label="Close" />
        </button>

        <Heading
          level={6}
          className="font-bold mt-2 mb-10 leading-tight text-center text-(--blue) uppercase"
        >
          Admission Details
        </Heading>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-6 mx-10">
          {(Object.keys(FIELD_LABELS) as (keyof RegistrationFormData)[]).map(
            (field) =>
              formData[field] ? (
                <div key={field} className="flex flex-col pb-2">
                  <span className="text-[12px] font-bold tracking-wide text-(--blue)">
                    {FIELD_LABELS[field]}
                  </span>
                  <span className="text-sm font-medium text-(--dark) wrap-break-word">
                    {formData[field]}
                  </span>
                </div>
              ) : null,
          )}
        </div>

        <Paragraph size="base" className="text-(--dark) mb-6 text-center font-medium">
          Your application will be registered once you pay the admission fee.
        </Paragraph>

        <RazorpayPayButton
          amount={REGISTRATION_FEE_AMOUNT}
          admissionId={admissionId}
          prefill={{
            name: formData.StudentName,
            email: formData.StudentEmail,
            contact: formData.ParentPhone ? `+91${formData.ParentPhone}` : undefined,
          }}
          customerPhone={formData.ParentPhone || undefined}
          description="Registration Fee"
          onSuccess={(verifyResponse) => {
            onPaymentSuccess?.(verifyResponse);
            setConfirmation({ open: true, verifyResponse });
            onClose();
          }}
          onFailure={(error) => {
            onPaymentFailure?.(error);
            onClose();
          }}
          onCancel={() => {
            onPaymentCancel?.();
            onClose();
          }}
          className="mx-auto relative flex justify-center items-center gap-1 rounded-full bg-(--white) overflow-hidden cursor-pointer border border-(--blue) group transition-all duration-300 px-6 py-1 w-fit"
          labelClassName="relative z-20 flex items-center justify-center text-center no-underline w-full text-(--blue) transition-all duration-300 group-hover:text-(--white)"
          fillClassName="absolute left-0 top-0 w-full h-0 bg-(--blue) transition-all duration-300 ease-in-out group-hover:h-full group-hover:top-auto group-hover:bottom-0 z-10"
        />
      </div>
    </div>,
    document.body,
  );
};

export default RegistrationSummarySidebar;
