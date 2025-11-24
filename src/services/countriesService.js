import axiosInstance from "../lib/axios";

const API_BASE = "/api/country";

// Get all Countries
export const getAllCountries = async () => {
    try {
        const response = await axiosInstance.get(`${API_BASE}/all`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch Countries" };
    }
};

// Get Country by ID
export const getCountryById = async (id) => {
    try {
        const response = await axiosInstance.get(`${API_BASE}/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch Country" };
    }
};
