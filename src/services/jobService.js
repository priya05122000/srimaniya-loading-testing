import axiosInstance from "../lib/axios";

const API_BASE = "/api/job";

// Get all Jobs
export const getAllJobs = async () => {
    try {
        const response = await axiosInstance.get(`${API_BASE}/all`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch Jobs" };
    }
};

// Get Job by ID
export const getJobById = async (id) => {
    try {
        const response = await axiosInstance.get(`${API_BASE}/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch Job" };
    }
};