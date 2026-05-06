import { apiRequest } from "@/lib/apiRequest";

// Get all Countries
export const getAllCountries = async () => {
	return apiRequest({
		endpoint: "/api/country/all",
	});
};

// Get Country by ID
export const getCountryById = async (id) => {
	return apiRequest({
		endpoint: `/api/country/${id}`,
	});
};