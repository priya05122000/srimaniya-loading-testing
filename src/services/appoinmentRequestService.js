import { apiRequest } from "@/lib/apiRequest";

export const createAppoinmentRequest = async (body) => {
	return apiRequest({
		endpoint: "/api/appointment-request/create",
		method: "POST",
		body,
	});
};

export const updateAppoinmentStatus = async (id, status) => {
	return apiRequest({
		endpoint: `/api/appointment-request/${id}/status`,
		method: "PATCH",
		body: { status },
	});
};