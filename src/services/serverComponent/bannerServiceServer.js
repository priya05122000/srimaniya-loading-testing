// Server-side banner service using fetch API
const BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_BASE = BASE ? `${BASE}/api/banner` : "https://api.srimaniyainstitute.in/api/banner";

export async function getAllBannersServer() {
	try {
		const res = await fetch(`${API_BASE}/all`, {
			method: "GET",
			cache: "no-store"
		});
		if (!res.ok) {
			throw new Error("Failed to fetch banners");
		}
		return await res.json();
	} catch (error) {
		throw error;
	}
}

export async function updateBannerByIdServer(id, body, token) {
	try {
		const res = await fetch(`${API_BASE}/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`,
			},
			body: JSON.stringify(body),
			cache: "no-store"
		});
		if (!res.ok) {
			const errorData = await res.json();
			throw errorData;
		}
		return await res.json();
	} catch (error) {
		throw error;
	}
}
