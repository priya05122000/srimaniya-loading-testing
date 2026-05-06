import { apiRequest } from "../lib/apiRequest";

export const getAllPartners = async () => {
	return apiRequest({
		endpoint: "/api/partner/all",
	});
};

export const getPartnerById = async (id) => {
	return apiRequest({
		endpoint: `/api/partner/${id}`,
	});
}