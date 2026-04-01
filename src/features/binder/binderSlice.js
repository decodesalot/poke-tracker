import { createSlice, createSelector } from "@reduxjs/toolkit"
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

const selectCards = (state) => state.binder.cards

export const selectBinder = selectCards
export const selectCurrentPage = (state) => state.binder.currentPage
export const selectTotalPages = createSelector(selectCards, (cards) =>
	Math.ceil(cards.length / CARDS_PER_PAGE)
)
export const selectTotalCards = createSelector(selectCards, (cards) => cards.length)
export const selectUniqueSets = createSelector(
	selectCards,
	(cards) => new Set(cards.map((c) => c.set?.id)).size
)
export const selectTotalValue = createSelector(selectCards, (cards) =>
	cards.reduce((sum, c) => sum + (c.pricing?.cardmarket?.avg ?? 0), 0)
)
export const selectRecentCards = createSelector(selectCards, (cards) => cards.slice(-4).reverse())

export default binderSlice.reducer
