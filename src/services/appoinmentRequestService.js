import axiosInstance from "../lib/axios";

const API_BASE = "/api/appointment-request";

export const createAppoinmentRequest = async (body) => {
    try {
        const response = await axiosInstance.post(`${API_BASE}/create`, body, {
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Server error" };
    }
};


export const getAllAppoinmentRequests = async () => {
    try {
        const response = await axiosInstance.get(`${API_BASE}/all`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch appointment requests" };
    }
};

export const getAppoinmentRequestById = async (id) => {
    try {
        const response = await axiosInstance.get(`${API_BASE}/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch appointment request" };
    }
};