import axiosInstance from "../lib/axios";

// Upload image file
export const uploadImageFile = async (fileData, token) => {
    try {
        const response = await axiosInstance.post("/api/fileUpload", fileData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to upload file" };
    }
};

export const uploadResumeFile = async (fileData) => {
    try {
        const response = await axiosInstance.post("/api/fileUpload/resume", fileData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to upload file" };
    }
};