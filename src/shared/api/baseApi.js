import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const API_BASE = import.meta.env.VITE_POKEMON_API_BASE

if (!API_BASE || !URL.canParse(API_BASE)) {
	throw new Error(`Invalid or missing VITE_POKEMON_API_BASE: "${API_BASE}"`)
}

const rawBaseQuery = fetchBaseQuery({
	baseUrl: API_BASE,
	prepareHeaders: (headers) => {
		headers.set("Content-Type", "application/json")
		return headers
	},
})

const baseQueryWithHandling = async (args, api, extraOptions) => {
	const result = await rawBaseQuery(args, api, extraOptions)

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
	baseQuery: baseQueryWithHandling,
	tagTypes: ["Cards", "Sets"], // expand as needed
	endpoints: () => ({}),
})
