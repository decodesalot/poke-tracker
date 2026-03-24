import { configureStore } from "@reduxjs/toolkit"
import userReducer from "@features/user/userSlice"
import binderReducer from "@features/binder/binderSlice"
import searchReducer from "@features/search/searchSlice"
import cardReducer from "@features/cards/cardSlice"

export const store = configureStore({
	reducer: {
		user: userReducer,
		binder: binderReducer,
		search: searchReducer,
		card: cardReducer,
	},
})
