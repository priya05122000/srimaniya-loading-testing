import { apiRequest } from "@/lib/apiRequest";

// Get admin by ID
export const getAdminById = async (id) => {
	return apiRequest({
		endpoint: `/api/auth/${id}`,
	});
};