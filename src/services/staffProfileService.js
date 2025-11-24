import axiosInstance from "../lib/axios";

// Get All Staff Profiles
export const getAllStaffProfiles = async () => {
    try {
        const response = await axiosInstance.get("/api/staff-profile/all");
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch Staff profiles" };
    }
};

// Get Staff Profile by ID
export const getStaffProfileById = async (id) => {
    try {
        const response = await axiosInstance.get(`/api/staff-profile/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch staff profile" };
    }
};