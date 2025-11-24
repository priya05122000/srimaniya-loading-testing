import axiosInstance from "../lib/axios";

const API_BASE = "/api/blog-post";

export const getAllBlogPosts = async () => {
    try {
        const response = await axiosInstance.get(`${API_BASE}/all`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch Blogs" };
    }
};

export const getBlogPostById = async (id) => {
    try {
        const response = await axiosInstance.get(`${API_BASE}/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch Blog Post" };
    }
};
