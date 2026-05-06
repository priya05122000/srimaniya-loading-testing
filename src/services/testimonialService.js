import { apiRequest } from "../lib/apiRequest";

// Get all testimonials
export const getAllTestimonials = async () => {
	return apiRequest({
		endpoint: "/api/testimonial/all",
	});
};

// Get testimonial by ID
export const getTestimonialById = async (id) => {
	return apiRequest({
		endpoint: `/api/testimonial/${id}`,
	});
};