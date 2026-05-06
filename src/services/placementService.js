import { apiRequest } from "../lib/apiRequest";

// Get all Placements
export const getAllPlacements = async () => {
	return apiRequest({
		endpoint: "/api/placement/all",
	});
};

// Get Placement by ID
export const getPlacementById = async (id) => {
	return apiRequest({
		endpoint: `/api/placement/${id}`,
	});
};