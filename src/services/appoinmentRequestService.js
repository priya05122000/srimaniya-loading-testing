import { apiRequest } from "@/lib/apiRequest";

export const createAppoinmentRequest = async (body) => {
	return apiRequest({
		endpoint: "/api/appointment-request/create",
		method: "POST",
		body,
	});
};