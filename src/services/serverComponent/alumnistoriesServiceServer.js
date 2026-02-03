// Server-side alumni stories service using fetch API
const BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_BASE = BASE ? `${BASE}/api/alumni` : "https://api.srimaniyainstitute.in/api/alumni";

export async function getAllAlumniStoriesServer() {
	try {
		const res = await fetch(`${API_BASE}/all`, {
			method: "GET",
			cache: "no-store"
		});
		if (!res.ok) {
			throw new Error("Failed to fetch alumni stories");
		}
		return await res.json();
	} catch (error) {
		throw error;
	}
}

export async function getAlumniStoryByIdServer(id) {
	try {
		const res = await fetch(`${API_BASE}/${id}`, {
			method: "GET",
			cache: "no-store"
		});
		if (!res.ok) {
			throw new Error("Failed to fetch alumni story");
		}
		return await res.json();
	} catch (error) {
		throw error;
	}
}
