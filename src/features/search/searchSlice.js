import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { fetchCardsBySet, fetchSets } from "@shared/api/pokemon"

export const fetchSetsThunk = createAsyncThunk(
	"search/fetchSets",
	async (_, { rejectWithValue }) => {
		try {
			return await fetchSets()
		} catch (err) {
			return rejectWithValue(err.message)
		}
	}
)

export const fetchCards = createAsyncThunk(
	"search/fetchCards",
	async (setId, { rejectWithValue }) => {
		try {
			return await fetchCardsBySet(setId)
		} catch (err) {
			return rejectWithValue(err.message)
		}
	}
)

const searchSlice = createSlice({
	name: "search",
	initialState: {
		query: "",
		filters: {},
		sets: [],
		setsStatus: "idle",
		selectedSet: null,
		results: [],
		status: "idle",
		error: null,
	},
	reducers: {
		setSearchQuery: (state, action) => {
			state.query = action.payload
		},
        setSelectedSet: (state, action) => {
			state.selectedSet = action.payload
		},
		addFilter: (state, action) => {
			const { category, value } = action.payload
			state.filters[category] = value
		},
		removeFilter: (state, action) => {
			delete state.filters[action.payload]
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchSetsThunk.pending, (state) => {
				state.setsStatus = "loading"
			})
			.addCase(fetchSetsThunk.fulfilled, (state, action) => {
				state.setsStatus = "succeeded"
				state.sets = action.payload
                if (!state.selectedSet) {
				    state.selectedSet = action.payload[0] ?? null
                }
			})
			.addCase(fetchSetsThunk.rejected, (state, action) => {
				state.setsStatus = "failed"
				state.error = action.payload
			})
			.addCase(fetchCards.pending, (state) => {
				state.status = "loading"
				state.error = null
			})
			.addCase(fetchCards.fulfilled, (state, action) => {
				state.status = "succeeded"
				state.results = action.payload
			})
			.addCase(fetchCards.rejected, (state, action) => {
				state.status = "failed"
				state.error = action.payload
			})
	},
})

export const { setSearchQuery, setSelectedSet, addFilter, removeFilter } = searchSlice.actions

export const selectSets = (state) => state.search.sets
export const selectSetsStatus = (state) => state.search.setsStatus
export const selectSelectedSet = (state) => state.search.selectedSet
export const selectSearchResults = (state) => state.search.results
export const selectSearchStatus = (state) => state.search.status
export const selectSearchError = (state) => state.search.error

export default searchSlice.reducer
