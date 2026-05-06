import { apiRequest } from "@/lib/apiRequest";

// Get all Awards
export const getAllAwards = async () => {
	return apiRequest({
		endpoint: "/api/awards/all",
	});
};

// Get Award by ID
export const getAwardById = async (id) => {
	return apiRequest({
		endpoint: `/api/awards/${id}`,
	});
};