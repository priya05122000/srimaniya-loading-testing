const BASE =
	process.env.NEXT_PUBLIC_API_BASE_URL ||
	"https://api.srimaniyainstitute.in";

export const apiRequest = async ({
	endpoint,
	method = "GET",
	body = null,
	headers = {},
	cache = "force-cache",
	revalidate = 60,
	isFormData = false,
}) => {
	const isGetRequest = method === "GET";

	const response = await fetch(`${BASE}${endpoint}`, {
		method,

		headers: {
			...(isFormData
				? {}
				: { "Content-Type": "application/json" }),
			...headers,
		},

		...(isGetRequest
			? {
					cache,
					next: { revalidate },
			  }
			: {
					cache: "no-store",
			  }),

		...(body && {
			body: isFormData ? body : JSON.stringify(body),
		}),
	});

	const data = await response.json();

	if (!response.ok) {
		throw data || { message: "Something went wrong" };
	}

	return data;
};