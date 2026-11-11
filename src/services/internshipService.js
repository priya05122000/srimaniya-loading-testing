import { apiRequest } from "../lib/apiRequest";

// Get all Internships (only verified documents are included).
// Called from the browser, where "force-cache" would keep serving the first
// stored response forever (the API sends no Cache-Control header), so newly
// added internships would never appear. Always fetch fresh.
export const getAllInternships = async () => {
	return apiRequest({
		endpoint: "/api/internship/all",
		cache: "no-store",
		revalidate: 0,
	});
};

// Get Internship by ID
export const getInternshipById = async (id) => {
	return apiRequest({
		endpoint: `/api/internship/${id}`,
	});
};
