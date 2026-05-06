import { apiRequest } from "../lib/apiRequest";

// Get all site info
export const getAllSiteInfo = async () => {
	return apiRequest({
		endpoint: "/api/site-info/all",
	});
};