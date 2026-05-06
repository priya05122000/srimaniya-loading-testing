import { apiRequest } from "@/lib/apiRequest";

// Get all categories
export const getAllCategories = async () => {
	return apiRequest({
		endpoint: "/api/category/all",
	});
};

// Get category by ID
export const getCategoryById = async (id) => {
	return apiRequest({
		endpoint: `/api/category/${id}`,
	});
};