import { apiRequest } from "@/lib/apiRequest";

export const getAllAlumniStories = async () => {
	return apiRequest({
		endpoint: "/api/alumni/all",
	});
};

export const getAlumniStoryById = async (id) => {
	return apiRequest({
		endpoint: `/api/alumni/${id}`,
	});
};