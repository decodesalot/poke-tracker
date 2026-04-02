import { createSlice } from "@reduxjs/toolkit"

const searchSlice = createSlice({
	name: "search",
	initialState: {
		selectedSet: null,
	},
	reducers: {
		setSelectedSet: (state, action) => {
			state.selectedSet = action.payload
		},
	},
})

export const { setSelectedSet } = searchSlice.actions

export const selectSelectedSet = (state) => state.search.selectedSet

export default searchSlice.reducer
