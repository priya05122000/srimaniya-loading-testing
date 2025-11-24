import axiosInstance from "../lib/axios";

const API_BASE = "/api/category";

// Get all categories
export const getAllCategories = async () => {
    try {
        const response = await axiosInstance.get(`${API_BASE}/all`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch categories" };
    }
};

// Get category by ID
export const getCategoryById = async (id) => {
    try {
        const response = await axiosInstance.get(`${API_BASE}/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch category" };
    }
};
