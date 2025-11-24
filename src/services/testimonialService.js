import axiosInstance from "../lib/axios";

// Get all testimonials
export const getAllTestimonials = async () => {
    try {
        const response = await axiosInstance.get("/api/testimonial/all");
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch testimonials" };
    }
};

// Get testimonial by ID
export const getTestimonialById = async (id) => {
    try {
        const response = await axiosInstance.get(`/api/testimonial/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch testimonial" };
    }
};