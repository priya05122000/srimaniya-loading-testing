import axiosInstance from "../lib/axios";

const API_BASE = "/api/alumni";

// Get all alumni stories
export const getAllAlumniStories = async () => {
    try {
        const response = await axiosInstance.get(`${API_BASE}/all`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch alumni stories" };
    }
};

// Get alumni story by ID
export const getAlumniStoryById = async (id) => {
    try {
        const response = await axiosInstance.get(`${API_BASE}/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch alumni story" };
    }
};