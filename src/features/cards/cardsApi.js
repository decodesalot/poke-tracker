import { baseApi } from "@shared/api/baseApi"

export const cardsApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getSets: builder.query({
			query: () => "/sets",
			providesTags: ["Sets"],
		}),
		getSetById: builder.query({
			query: (setId) => `/sets/${setId}`,
			//transformResponse: (response) => response.data,
			providesTags: (result, error, id) => [{ type: "Sets", id }],
		}),
		getCardById: builder.query({
			query: (id) => `/cards/${id}`,
			//transformResponse: (response) => response.data,
			providesTags: (result, error, id) => [{ type: "Cards", id }],
		}),
	}),
	overrideExisting: false,
})

export const { useGetSetsQuery, useGetSetByIdQuery, useGetCardByIdQuery } = cardsApi
