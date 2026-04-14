import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const BASE_URLS = {
	pokemon: import.meta.env.VITE_POKEMON_API_BASE,
	ai: import.meta.env.VITE_AI_API_BASE,
}

const createQuery = (baseUrl) =>
	fetchBaseQuery({
		baseUrl,
		prepareHeaders: (headers) => {
			headers.set("Content-Type", "application/json")
			return headers
		},
	})

const queries = Object.fromEntries(
	Object.entries(BASE_URLS).map(([key, url]) => [key, createQuery(url)])
)

const routingBaseQuery = async ({ api: apiName, ...args }, api, extraOptions) => {
	const query = queries[apiName]

	if (!query) {
		return { error: { status: "CUSTOM_ERROR", error: `Unknown API: "${apiName}"` } }
	}

	const result = await query(args, api, extraOptions)

	if (result.error) {
		return {
			error: {
				status: result.error.status,
				data: {
					message: result.error?.data?.message || result.error?.error || "Something went wrong",
				},
			},
		}
	}

	return result
}

export const baseApi = createApi({
	reducerPath: "api",
	baseQuery: routingBaseQuery,
	tagTypes: ["Cards", "Sets"],
	endpoints: () => ({}),
})
