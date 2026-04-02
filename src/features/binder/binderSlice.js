import { createSlice, createSelector } from "@reduxjs/toolkit"

const binderSlice = createSlice({
	name: "binder",
	initialState: {
		cards: [],
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
		},
	},
})

export const { addCard, addCards, removeCard } = binderSlice.actions

const selectCards = (state) => state.binder.cards

export const selectBinder = selectCards
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
