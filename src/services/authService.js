import axiosInstance from "../lib/axios";

const API_BASE = "/api/auth";

// Login user
export const loginUser = async (email, password) => {
    try {
        const response = await axiosInstance.post(`${API_BASE}/login`, { email, password });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Login failed" };
    }
};

// Create a new admin
export const createAdmin = async (body, token) => {
    try {
        const response = await axiosInstance.post(`${API_BASE}/create`, body, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Server error" };
    }
};

// Get all admins
export const getAllAdmins = async () => {
    try {
        const response = await axiosInstance.get(`${API_BASE}/all`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch admins" };
    }
};

// Get admin by ID
export const getAdminById = async (id) => {
    try {
        const response = await axiosInstance.get(`${API_BASE}/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch admins" };
    }
};

// Update admin by ID
export const updateAdminById = async (id, body, token) => {
    try {
        const response = await axiosInstance.put(`${API_BASE}/${id}`, body, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to update admin" };
    }
};

// Delete admin by ID
export const deleteAdminById = async (id, deletedBy, token) => {
    try {
        const response = await axiosInstance.delete(`${API_BASE}/${id}?deleted_by=${deletedBy}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to delete admin" };
    }
};

// Forgot password
export const forgotPassword = async (email) => {
    try {
        const response = await axiosInstance.post(`${API_BASE}/forgot-password`, { email });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to send reset link" };
    }
};