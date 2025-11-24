import axiosInstance from "../lib/axios";

const API_BASE = "/api/international-patient";

export const getAllInternationalPatients = async () => {
    try {
        const response = await axiosInstance.get(`${API_BASE}/all`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch Blogs" };
    }
};

export const getInternationalPatientById = async (id) => {
    try {
        const response = await axiosInstance.get(`${API_BASE}/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch Blog Post" };
    }
};