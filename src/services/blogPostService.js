import { apiRequest } from "../lib/apiRequest";

export const getAllBlogPosts = async () => {
	return apiRequest({
		endpoint: "/api/blog-post/all",
	});
};

export const getHomeBlogPosts = async () => {
	return apiRequest({
		endpoint: "/api/blog-post/all?fields=id,sub_title,slug,image_url,active,created_at",
	});
};

export const getBlogPostById = async (id) => {
	return apiRequest({
		endpoint: `/api/blog-post/${id}`,
	});
};

export const getBlogPostBySlug = async (slug) => {
	return apiRequest({
		endpoint: `/api/blog-post/slug/${slug}`,
	});
};