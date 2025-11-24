import axiosInstance from "../lib/axios";

const API_BASE = "/api/awards";

// Get all Awards
export const getAllAwards = async () => {
    try {
        const response = await axiosInstance.get(`${API_BASE}/all`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch Awardss" };
    }
};

// Get Awards by ID
export const getAwardById = async (id) => {
    try {
        const response = await axiosInstance.get(`${API_BASE}/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch Award" };
    }
};