"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { Close } from "@/components/icons/Icons";
import Heading from "@/components/common/Heading";
import Paragraph from "@/components/common/Paragraph";
import RazorpayPayButton from "@/components/common/RazorpayPayButton";
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
  onPaymentSuccess?: (verifyResponse: any) => void;
  onPaymentFailure?: (error: any) => void;
  onPaymentCancel?: () => void;
}

const RegistrationSummarySidebar: React.FC<RegistrationSummarySidebarProps> = ({
  show,
  onClose,
  formData,
  onPaymentSuccess,
  onPaymentFailure,
  onPaymentCancel,
}) => {
  useEffect(() => {
    if (!show) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = overflow;
    };
  }, [show]);

  if (!show) return null;

  return createPortal(
    <div className="fixed inset-0 z-100 h-dvh w-screen flex items-center justify-center bg-(--white)/10 backdrop-blur-xs  p-6 animate-modal-overlay">
      <div className="bg-(--blue) shadow-2xl p-8 w-full max-w-125 max-h-[90vh] relative overflow-y-auto animate-modal-content">
        <button
          className="absolute top-6 right-6 cursor-pointer text-xl text-(--bg-grey)"
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
          className="font-bold mt-2 mb-10 leading-tight text-center text-(--white) uppercase"
        >
          Admission Details
        </Heading>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-6 mx-10">
          {(Object.keys(FIELD_LABELS) as (keyof RegistrationFormData)[]).map(
            (field) =>
              formData[field] ? (
                <div key={field} className="flex flex-col pb-2">
                  <span className="text-[10px] tracking-wide text-(--yellow)">
                    {FIELD_LABELS[field]}
                  </span>
                  <span className="text-base text-(--white)">{formData[field]}</span>
                </div>
              ) : null,
          )}
        </div>

        <Paragraph size="base" className="text-(--white) mb-6 text-center">
          Your application will be registered once you pay the admission fee.
        </Paragraph>

        <RazorpayPayButton
          amount={REGISTRATION_FEE_AMOUNT}
          prefill={{
            name: formData.StudentName,
            email: formData.StudentEmail,
            contact: formData.ParentPhone ? `+91${formData.ParentPhone}` : undefined,
          }}
          customerPhone={formData.ParentPhone || undefined}
          description="Registration Fee"
          onSuccess={(verifyResponse) => {
            onPaymentSuccess?.(verifyResponse);
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
          className="mx-auto relative flex justify-center items-center gap-1 rounded-full bg-(--blue) overflow-hidden cursor-pointer border border-(--yellow) group transition-all duration-300 px-3 py-1 w-fit"
        />
      </div>
    </div>,
    document.body,
  );
};

export default RegistrationSummarySidebar;
