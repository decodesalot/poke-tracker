import { baseApi } from "@shared/api/baseApi"

export const aiApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		sendMessage: builder.mutation({
			query: (body) => ({ api: "ai", url: "/chat", method: "POST", body }),
		}),
	}),
	overrideExisting: false,
})

export const { useSendMessageMutation } = aiApi
