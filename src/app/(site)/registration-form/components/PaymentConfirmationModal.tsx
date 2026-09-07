"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { Close } from "@/components/icons/Icons";
import Heading from "@/components/common/Heading";
import Paragraph from "@/components/common/Paragraph";

interface PaymentConfirmationModalProps {
  show: boolean;
  onClose: () => void;
  verifyResponse?: any;
}

type PaymentInfoRow = { label: string; value: string };

const isFilled = (value: unknown): value is string | number =>
  value !== null && value !== undefined && String(value).trim() !== "";

const formatAmount = (amount: unknown, currency?: unknown) => {
  const numeric = Number(amount);
  if (!Number.isFinite(numeric)) return String(amount);
  // Razorpay amounts are in the smallest currency unit (paise).
  const major = numeric >= 1000 && numeric % 100 === 0 ? numeric / 100 : numeric;
  const code = isFilled(currency) ? String(currency).toUpperCase() : "INR";
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: code,
      maximumFractionDigits: 2,
    }).format(major);
  } catch {
    return `${code} ${major}`;
  }
};

const extractPaymentInfo = (verifyResponse: any): PaymentInfoRow[] => {
  if (!verifyResponse || typeof verifyResponse !== "object") return [];

  const source =
    (verifyResponse.data && typeof verifyResponse.data === "object"
      ? verifyResponse.data
      : verifyResponse) ?? {};
  const payment =
    source.payment && typeof source.payment === "object"
      ? source.payment
      : source;

  const rows: PaymentInfoRow[] = [];
  const pushRow = (label: string, value: unknown) => {
    if (isFilled(value)) rows.push({ label, value: String(value) });
  };

  const paymentId =
    payment.razorpay_payment_id ??
    payment.payment_id ??
    payment.paymentId ??
    payment.id;
  const orderId =
    payment.razorpay_order_id ??
    payment.order_id ??
    payment.orderId;

  pushRow("Payment ID", paymentId);
  pushRow("Order ID", orderId);

  if (isFilled(payment.amount)) {
    rows.push({
      label: "Amount Paid",
      value: formatAmount(payment.amount, payment.currency),
    });
  }

  pushRow(
    "Status",
    isFilled(payment.status)
      ? String(payment.status).charAt(0).toUpperCase() +
          String(payment.status).slice(1)
      : undefined,
  );
  pushRow("Payment Method", payment.method ?? payment.payment_method);
  pushRow(
    "Reference No.",
    payment.reference_number ?? payment.receipt ?? payment.reference,
  );

  return rows;
};

const PaymentConfirmationModal: React.FC<PaymentConfirmationModalProps> = ({
  show,
  onClose,
  verifyResponse,
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

  const paymentInfo = extractPaymentInfo(verifyResponse);

  return createPortal(
    <div className="fixed inset-0 z-100 h-dvh w-screen flex items-center justify-center bg-(--black)/30 backdrop-blur-xs p-6 animate-modal-overlay">
      <div className="bg-(--white) shadow-2xl p-4 md:p-6 w-full max-w-125 max-h-[90vh] relative overflow-y-auto animate-modal-content">
        <button
          className="absolute top-4 md:top-6 right-4 md:right-6 cursor-pointer text-xl text-(--blue)"
          onClick={onClose}
          aria-label="Close"
        >
          <Close aria-label="Close" />
        </button>

        <div className="flex justify-center mt-2 mb-4">
          <span className="flex items-center justify-center w-14 h-14 rounded-full border-3 border-(--blue) text-(--blue) text-3xl font-bold leading-none">
            &#10003;
          </span>
        </div>

        <Heading
          level={5}
          className="font-bold mb-4 leading-tight text-center text-(--blue) uppercase"
        >
          Payment Successful
        </Heading>

        <Paragraph size="base" className="text-(--dark) mb-6 text-center font-medium">
          {paymentInfo.length > 0
            ? "Your admission fee payment has been received. Please keep the details below for your reference."
            : "Your admission fee payment has been received and your application is now registered."}
        </Paragraph>

        {paymentInfo.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-2 mx-4 sm:mx-10">
            {paymentInfo.map((row) => (
              <div key={row.label} className="flex flex-col pb-2">
                <span className="text-[12px] font-bold tracking-wide text-(--blue)">
                  {row.label}
                </span>
                <span className="text-sm font-medium text-(--dark) wrap-break-word">
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={onClose}
          className="mx-auto mt-6 relative flex justify-center items-center gap-1 rounded-full bg-(--white) overflow-hidden cursor-pointer border border-(--blue) group transition-all duration-300 px-6 py-1 w-fit"
        >
          <span className="relative z-20 flex items-center justify-center text-center no-underline w-full text-(--blue) transition-all duration-300 group-hover:text-(--white)">
            Done
          </span>
          <span className="absolute left-0 top-0 w-full h-0 bg-(--blue) transition-all duration-300 ease-in-out group-hover:h-full group-hover:top-auto group-hover:bottom-0 z-10" />
        </button>
      </div>
    </div>,
    document.body,
  );
};

export default PaymentConfirmationModal;
