import { apiRequest } from "../lib/apiRequest";

// Upload image file
export const uploadImageFile = async (fileData, token) => {
	return apiRequest({
		endpoint: "/api/fileUpload",
		method: "POST",
		body: fileData,
		isFormData: true,
	});
};

// Upload resume file
export const uploadResumeFile = async (fileData) => {
	return apiRequest({
		endpoint: "/api/fileUpload/resume",
		method: "POST",
		body: fileData,
		isFormData: true,
	});
};