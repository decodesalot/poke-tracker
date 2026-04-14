import { createSlice } from "@reduxjs/toolkit"

const aiSlice = createSlice({
	name: "ai",
	initialState: {
		messages: [],
		isOpen: false,
	},
	reducers: {
		toggleChat: (state) => {
			state.isOpen = !state.isOpen
		},
		addMessage: (state, action) => {
			state.messages.push(action.payload)
		},
		clearMessages: (state) => {
			state.messages = []
		},
	},
})

export const { toggleChat, addMessage, clearMessages } = aiSlice.actions

export const selectMessages = (state) => state.ai.messages
export const selectIsOpen = (state) => state.ai.isOpen

export default aiSlice.reducer
