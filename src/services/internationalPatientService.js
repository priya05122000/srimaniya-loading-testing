import { apiRequest } from "../lib/apiRequest";

export const getAllInternationalPatients = async () => {
	return apiRequest({
		endpoint: "/api/international-patient/all",
	});
};

export const getInternationalPatientById = async (id) => {
	return apiRequest({
		endpoint: `/api/international-patient/${id}`,
	});
};