import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search",
    initialState: {
        query: "",
        filters: {},
        results: [],
    },
    reducers: {
        setSearchQuery: (state, action) => {
            state.query = action.payload
        },

        setSearchResults: (state, action) => {
            state.results = action.payload
        },

        addFilter: (state, action) => {
            const { category, value } = action.payload
            state.filters[category] = value
        },

        removeFilter: (state, action) => {
            delete state.filters[action.payload]
        }
    }
})

export const { setSearchQuery, setSearchResults, addFilter, removeFilter } = searchSlice.actions

export default searchSlice.reducer