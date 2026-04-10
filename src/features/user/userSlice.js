import { createSlice } from "@reduxjs/toolkit"

const DEFAULT_USER = {
	id: crypto.randomUUID(),
	name: "Ash Ketchum",
	email: "",
	role: "collector",
	theme: "light",
	onboarded: false,
	market: "tcgplayer",
	currency: "EUR",
	language: "english",
}

const userSlice = createSlice({
	name: "user",
	initialState: DEFAULT_USER,
	reducers: {
		setTheme: (state, action) => {
			state.theme = action.payload
		},

		completeOnboarded: (state, action) => {
			state.onboarded = true
			Object.assign(state, action.payload)
		},

		updateSettings: (state, action) => {
			Object.assign(state, action.payload)
		},
	},
})

export const { setTheme, completeOnboarded, updateSettings } = userSlice.actions

export const selectUser = (state) => state.user
export const selectUserId = (state) => state.user.id

export default userSlice.reducer
