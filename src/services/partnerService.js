import axiosInstance from "../lib/axios";

const API_BASE = "/api/partner";

export const createPartner = async (body, token) => {
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

export const updatePartnerById = async (id, body, token) => {
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

export const getAllPartners = async () => {
	try {
		const response = await axiosInstance.get(`${API_BASE}/all`);
		return response.data;
	} catch (error) {
		throw error.response?.data || { message: "Failed to fetch Partners" };
	}
};

export const getPartnerById = async (id) => {
	try {
		const response = await axiosInstance.get(`${API_BASE}/${id}`);
		return response.data;
	} catch (error) {
		throw error.response?.data || { message: "Failed to fetch Partner" };
	}
};

export const deletePartnerById = async (id, deletedBy, token) => {
	try {
		const response = await axiosInstance.delete(
			`${API_BASE}/${id}?deleted_by=${deletedBy}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		throw error.response?.data || { message: "Failed to delete Partner" };
	}
};
