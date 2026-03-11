import { createSlice } from '@reduxjs/toolkit'

const DEFAULT_USER = {
    name: 'Ash Ketchum',
    role: 'collector',
    theme: 'light',
    onboarded: false,
    market: 'tcgplayer',
    currency: 'USD'
};


const userSlice = createSlice({
    name: 'user',
    initialState: DEFAULT_USER,
    reducers: {
        setRole: (state, action) => {
            state.role = action.payload
        },

        toggleTheme: (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light'
        },

        setOnboarded: (state, action) => {
            state.onboarded = true
            Object.assign(state, action.payload)
        },

        setUser: (state, action) => {
            Object.assign(state, action.payload)
        },

        setLanguage: (state, action) => {
            state.language = action.payload
        }
    }
})

export const { setRole, toggleTheme, setOnboarded, setUser, setLanguage } = userSlice.actions

export const selectUser = state => state.user

export default userSlice.reducer