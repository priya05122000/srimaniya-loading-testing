import axiosInstance from "../lib/axios";

const API_BASE = "/api/course";

// Get all categories
export const getAllCourses = async () => {
    try {
        const response = await axiosInstance.get(`${API_BASE}/all`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch courses" };
    }
};

// Get category by ID
export const getCourseById = async (id) => {
    try {
        const response = await axiosInstance.get(`${API_BASE}/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch course" };
    }
};