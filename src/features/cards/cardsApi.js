import { baseApi } from "@shared/api/baseApi"

export const cardsApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getSets: builder.query({
			query: () => ({ api: "pokemon", url: "/sets" }),
			providesTags: ["Sets"],
		}),
		getSetById: builder.query({
			query: (setId) => ({ api: "pokemon", url: `/sets/${setId}` }),
			providesTags: (result, error, id) => [{ type: "Sets", id }],
		}),
		getCardById: builder.query({
			query: (id) => ({ api: "pokemon", url: `/cards/${id}` }),
			providesTags: (result, error, id) => [{ type: "Cards", id }],
		}),
	}),
	overrideExisting: false,
})

export const { useGetSetsQuery, useGetSetByIdQuery, useGetCardByIdQuery } = cardsApi
