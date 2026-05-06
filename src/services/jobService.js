import { apiRequest } from "../lib/apiRequest";

// Get all Jobs
export const getAllJobs = async () => {
	return apiRequest({
		endpoint: "/api/job/all",
	});
};

// Get Job by ID
export const getJobById = async (id) => {
	return apiRequest({
		endpoint: `/api/job/${id}`,
	});
};