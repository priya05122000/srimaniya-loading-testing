import axiosInstance from "../lib/axios";

// Create or update site info (singleton entry)
export const createSiteInfo = async (body, token) => {
    try {
        const response = await axiosInstance.post("/api/site-info/create", body, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Server error" };
    }
};

// Get all site info (typically one record)
export const getAllSiteInfo = async () => {
    try {
        const response = await axiosInstance.get("/api/site-info/all");
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch site info" };
    }
};

// Get site info by ID
export const getSiteInfoById = async (id) => {
    try {
        const response = await axiosInstance.get(`/api/site-info/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch site info" };
    }
};

// Update site info by ID
export const updateSiteInfoById = async (id, body, token) => {
    try {
        const response = await axiosInstance.put(`/api/site-info/${id}`, body, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to update site info" };
    }
};

// Delete site info by ID
export const deleteSiteInfoById = async (id, token) => {
    try {
        const response = await axiosInstance.delete(`/api/site-info/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to delete site info" };
    }
};