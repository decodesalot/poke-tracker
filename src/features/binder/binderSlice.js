import { createSlice } from "@reduxjs/toolkit";

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
            const newCards = action.payload.filter(
                (card) => !state.cards.some((c) => c.id === card.id)
            )
            state.cards.push(...newCards)
        },


        removeCard: (state, action) => {
            state.cards.splice(action.payload, 1)
        },

        nextPage: (state) => {
            if (state.currentPage < state.cards.length - 1) {
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

export default binderSlice.reducer