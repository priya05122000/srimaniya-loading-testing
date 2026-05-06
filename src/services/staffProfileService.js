import { apiRequest } from "../lib/apiRequest";

// Get All Staff Profiles
export const getAllStaffProfiles = async () => {
	return apiRequest({
		endpoint: "/api/staff-profile/all",
	});
};

// Get Staff Profile by ID
export const getStaffProfileById = async (id) => {
	return apiRequest({
		endpoint: `/api/staff-profile/${id}`,
	});
};