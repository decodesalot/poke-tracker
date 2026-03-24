import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { fetchCardById } from "@shared/api/pokemon"

export const fetchCard = createAsyncThunk("card/fetchCard", async (id, { rejectWithValue }) => {
	try {
		return await fetchCardById(id)
	} catch (err) {
		return rejectWithValue(err.message)
	}
})

const cardSlice = createSlice({
	name: "card",
	initialState: {
		current: null,
		status: "idle",
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCard.pending, (state) => {
				state.status = "loading"
				state.current = null
				state.error = null
			})
			.addCase(fetchCard.fulfilled, (state, action) => {
				state.status = "succeeded"
				state.current = action.payload
			})
			.addCase(fetchCard.rejected, (state, action) => {
				state.status = "failed"
				state.error = action.payload
			})
	},
})

export const selectCard = (state) => state.card.current
export const selectCardStatus = (state) => state.card.status
export const selectCardError = (state) => state.card.error

export default cardSlice.reducer
