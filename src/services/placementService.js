import axiosInstance from "../lib/axios";

const API_BASE = "/api/placement";

// Get all Placements
export const getAllPlacements = async () => {
    try {
        const response = await axiosInstance.get(`${API_BASE}/all`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch Placements" };
    }
};

// Get Placement by ID
export const getPlacementById = async (id) => {
    try {
        const response = await axiosInstance.get(`${API_BASE}/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch Placement" };
    }
};