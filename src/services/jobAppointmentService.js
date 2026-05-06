import { apiRequest } from "../lib/apiRequest";

// Create a new Job Application
export const createJobApplication = async (body) => {
	return apiRequest({
		endpoint: "/api/job-application/create",
		method: "POST",
		body,
	});
};