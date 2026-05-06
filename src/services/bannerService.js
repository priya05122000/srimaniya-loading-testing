import { apiRequest } from "@/lib/apiRequest";

export const getAllBanners = async () => {
	return apiRequest({
		endpoint: "/api/banner/all",
	});
};