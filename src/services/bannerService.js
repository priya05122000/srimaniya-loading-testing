import axiosInstance from "../lib/axios";

const API_BASE = "/api/banner";

export const updateBannerById = async (id, body, token) => {
    try {
        const response = await axiosInstance.put(`${API_BASE}/${id}`, body, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Server error" };
    }
};

export const getAllBanners = async () => {
    try {
        const response = await axiosInstance.get(`${API_BASE}/all`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch Blogs" };
    }
};