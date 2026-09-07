import { apiRequest } from "@/lib/apiRequest";

export const createAdmission = async (body) => {
	return apiRequest({
		endpoint: "/api/admission/create",
		method: "POST",
		body,
	});
};
