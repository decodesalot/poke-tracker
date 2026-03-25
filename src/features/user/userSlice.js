import { createSlice } from "@reduxjs/toolkit"

const DEFAULT_USER = {
    id: crypto.randomUUID(),
	name: "Ash Ketchum",
    email: "demo@email.com",
	role: "collector",
	theme: "light",
	onboarded: false,
	market: "tcgplayer",
	currency: "USD",
	language: "english",
}

const userSlice = createSlice({
	name: "user",
	initialState: DEFAULT_USER,
	reducers: {
		setRole: (state, action) => {
			state.role = action.payload
		},

		setTheme: (state, action) => {
			state.theme = action.payload
		},

		completeOnboarded: (state, action) => {
			state.onboarded = true
			Object.assign(state, action.payload)
		},

		setUser: (state, action) => {
			Object.assign(state, action.payload)
		},

		setLanguage: (state, action) => {
			state.language = action.payload
		},
	},
})

export const { setRole, setTheme, completeOnboarded, setUser, setLanguage } = userSlice.actions

export const selectUser = (state) => state.user
export const selectUserId = (state) => state.user.id

export default userSlice.reducer