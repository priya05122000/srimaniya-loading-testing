// Server-side countries service using fetch API
const BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_BASE = BASE ? `${BASE}/api/country` : "https://api.srimaniyainstitute.in/api/country";

export async function getAllCountriesServer() {
	try {
		const res = await fetch(`${API_BASE}/all`, {
			method: "GET",
			cache: "no-store"
		});
		if (!res.ok) {
			throw new Error("Failed to fetch countries");
		}
		return await res.json();
	} catch (error) {
		throw error;
	}
}

export async function getCountryByIdServer(id) {
	try {
		const res = await fetch(`${API_BASE}/${id}`, {
			method: "GET",
			cache: "no-store"
		});
		if (!res.ok) {
			throw new Error("Failed to fetch country");
		}
		return await res.json();
	} catch (error) {
		throw error;
	}
}
