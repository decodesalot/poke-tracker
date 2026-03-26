import { configureStore } from "@reduxjs/toolkit"
import userReducer from "@features/user/userSlice"
import binderReducer from "@features/binder/binderSlice"
import searchReducer from "@features/search/searchSlice"
import cardReducer from "@features/cards/cardSlice"
import friendsReducer from "@features/friends/friendsSlice"
import { loadState, saveState } from "./persistence"

export const store = configureStore({
	reducer: {
		user: userReducer,
		binder: binderReducer,
		search: searchReducer,
		card: cardReducer,
		friends: friendsReducer,
	},
	preloadedState: loadState(),
})

store.subscribe(() => saveState(store.getState()))
