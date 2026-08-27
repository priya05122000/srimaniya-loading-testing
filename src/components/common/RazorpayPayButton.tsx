"use client";

import React from "react";
import { toast } from "react-toastify";
import { useRazorpayCheckout, RazorpayPrefill } from "@/hooks/useRazorpayCheckout";

interface RazorpayPayButtonProps {
  amount: number;
  prefill?: RazorpayPrefill;
  customerPhone?: string;
  description?: string;
  className?: string;
  onSuccess?: (verifyResponse: any) => void;
  onFailure?: (error: any) => void;
  onCancel?: () => void;
}

const RazorpayPayButton: React.FC<RazorpayPayButtonProps> = ({
  amount,
  prefill,
  customerPhone,
  description,
  className,
  onSuccess,
  onFailure,
  onCancel,
}) => {
  const { startPayment, processing } = useRazorpayCheckout();

  const handlePay = () => {
    startPayment({
      amount,
      prefill,
      customerPhone,
      description,
      onSuccess: (verifyResponse) => {
        toast.success("Admission registered successfully");
        onSuccess?.(verifyResponse);
      },
      onFailure: (err) => {
        console.error(err);
        toast.error("Payment failed. Please try again.");
        onFailure?.(err);
      },
      onCancel,
    });
  };

  return (
    <button
      className={
        className ??
        "relative flex justify-center items-center gap-1 rounded-full bg-(--blue) overflow-hidden cursor-pointer border border-(--yellow) group transition-all duration-300 px-3 py-1"
      }
      onClick={handlePay}
      type="button"
      disabled={processing}
      style={processing ? { pointerEvents: "none", opacity: 0.7 } : {}}
    >
      <span className="relative gap-x-1 z-20 flex items-center justify-center text-center no-underline w-full text-(--yellow) transition-all duration-300 group-hover:text-(--blue)">
        {processing ? "Processing..." : "Pay Admission Fee"}
      </span>
      <span className="absolute left-0 top-0 w-full h-0 bg-(--yellow) transition-all duration-300 ease-in-out group-hover:h-full group-hover:top-auto group-hover:bottom-0 z-10" />
    </button>
  );
};

export default RazorpayPayButton;
