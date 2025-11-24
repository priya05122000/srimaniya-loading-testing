import axiosInstance from "../lib/axios";

const API_BASE = "/api/job-application";

// Create a new JobApplication
export const createJobApplication = async (body) => {
    try {
        const response = await axiosInstance.post(`${API_BASE}/create`, body, {
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Server error" };
    }
};

// Get all JobApplication
export const getAllJobApplication = async () => {
    try {
        const response = await axiosInstance.get(`${API_BASE}/all`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch JobApplication" };
    }
};

// Get JobApplication by ID
export const getJobApplicationById = async (id) => {
    try {
        const response = await axiosInstance.get(`${API_BASE}/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch JobApplication" };
    }
};