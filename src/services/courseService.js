import { apiRequest } from "@/lib/apiRequest";

// Get all courses
export const getAllCourses = async () => {
	return apiRequest({
		endpoint: "/api/course/all",
	});
};

// Get course by ID
export const getCourseById = async (id) => {
	return apiRequest({
		endpoint: `/api/course/${id}`,
	});
};