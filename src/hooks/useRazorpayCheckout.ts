import { useState } from "react";
import { createPaymentOrder, verifyPayment } from "@/services/paymentService";

interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name?: string;
    description?: string;
    order_id: string;
    prefill?: {
        name?: string;
        email?: string;
        contact?: string;
    };
    theme?: {
        color?: string;
    };
    handler: (response: {
        razorpay_payment_id: string;
        razorpay_order_id: string;
        razorpay_signature: string;
    }) => void;
    modal?: {
        ondismiss?: () => void;
    };
}

interface RazorpayInstance {
    open: () => void;
    on: (event: string, handler: (response: any) => void) => void;
}

declare global {
    interface Window {
        Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
    }
}

const RAZORPAY_CHECKOUT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

const loadRazorpayScript = () =>
    new Promise<boolean>((resolve) => {
        if (typeof window === "undefined") {
            resolve(false);
            return;
        }
        if (window.Razorpay) {
            resolve(true);
            return;
        }

        const existingScript = document.querySelector(
            `script[src="${RAZORPAY_CHECKOUT_SRC}"]`,
        );
        if (existingScript) {
            existingScript.addEventListener("load", () => resolve(true));
            existingScript.addEventListener("error", () => resolve(false));
            return;
        }

        const script = document.createElement("script");
        script.src = RAZORPAY_CHECKOUT_SRC;
        script.async = true;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });

export type RazorpayPrefill = {
    name?: string;
    email?: string;
    contact?: string;
};

export function useRazorpayCheckout() {
    const [processing, setProcessing] = useState(false);

    const startPayment = async ({
        amount,
        prefill,
        customerPhone,
        description,
        onSuccess,
        onFailure,
        onCancel,
    }: {
        amount: number;
        prefill?: RazorpayPrefill;
        customerPhone?: string;
        description?: string;
        onSuccess?: (verifyResponse: any) => void;
        onFailure?: (error: any) => void;
        onCancel?: () => void;
    }) => {
        setProcessing(true);
        try {
            const scriptLoaded = await loadRazorpayScript();
            if (!scriptLoaded) {
                throw new Error("Failed to load Razorpay checkout. Please check your connection.");
            }

            const orderPayload: Record<string, unknown> = { amount: amount * 100 };
            if (prefill?.name) orderPayload.customer_name = prefill.name;
            if (prefill?.email) orderPayload.customer_email = prefill.email;
            if (customerPhone) orderPayload.customer_phone = customerPhone;
            if (description) orderPayload.description = description;

            const order = await createPaymentOrder(orderPayload);
            const orderData = order.data;

            let settled = false;

            const razorpay = new window.Razorpay({
                key: orderData.key_id,
                amount: orderData.amount,
                currency: orderData.currency || "INR",
                name: "Sri Maniya Institute",
                description: description || "Registration Fee",
                order_id: orderData.order_id,
                prefill,
                theme: { color: "#0b2f6b" },
                handler: async (response) => {
                    settled = true;
                    try {
                        const verifyResponse = await verifyPayment({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        });
                        onSuccess?.(verifyResponse);
                    } catch (err) {
                        onFailure?.(err);
                    } finally {
                        setProcessing(false);
                    }
                },
                modal: {
                    ondismiss: () => {
                        setProcessing(false);
                        if (!settled) onCancel?.();
                    },
                },
            });

            razorpay.on("payment.failed", (response: any) => {
                settled = true;
                setProcessing(false);
                onFailure?.(response?.error || response);
            });

            razorpay.open();
        } catch (err) {
            setProcessing(false);
            onFailure?.(err);
        }
    };

    return { startPayment, processing };
}
