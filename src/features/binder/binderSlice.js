import { createSlice } from "@reduxjs/toolkit"
import { CARDS_PER_PAGE } from "@constants/binder"

const binderSlice = createSlice({
	name: "binder",
	initialState: {
		cards: [],
		currentPage: 0,
	},
	reducers: {
		addCard: (state, action) => {
			state.cards.push(action.payload)
		},

		addCards: (state, action) => {
			const newCards = action.payload.filter((card) => !state.cards.some((c) => c.id === card.id))
			state.cards.push(...newCards)
		},

		removeCard: (state, action) => {
			state.cards = state.cards.filter((c) => c.id !== action.payload)
			const totalPages = Math.ceil(state.cards.length / CARDS_PER_PAGE)
			if (state.currentPage >= totalPages) {
				state.currentPage = Math.max(0, totalPages - 1)
			}
		},

		nextPage: (state) => {
			if (state.currentPage < Math.ceil(state.cards.length / CARDS_PER_PAGE) - 1) {
				state.currentPage++
			}
		},

		prevPage: (state) => {
			if (state.currentPage > 0) {
				state.currentPage--
			}
		},
	},
})

export const { addCard, addCards, removeCard, nextPage, prevPage } = binderSlice.actions

export const selectBinder = (state) => state.binder.cards
export const selectCurrentPage = (state) => state.binder.currentPage
export const selectTotalPages = (state) => Math.ceil(state.binder.cards.length / CARDS_PER_PAGE)

export default binderSlice.reducer
