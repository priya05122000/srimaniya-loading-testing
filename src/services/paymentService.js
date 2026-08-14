import { apiRequest } from "@/lib/apiRequest";

export const createPaymentOrder = async (body) => {
	return apiRequest({
		endpoint: "/api/payment/create-order",
		method: "POST",
		body,
	});
};

export const verifyPayment = async (body) => {
	return apiRequest({
		endpoint: "/api/payment/verify",
		method: "POST",
		body,
	});
};
