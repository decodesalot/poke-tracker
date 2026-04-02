import { configureStore } from "@reduxjs/toolkit"
import userReducer from "@features/user/userSlice"
import binderReducer from "@features/binder/binderSlice"
import searchReducer from "@features/search/searchSlice"
import friendsReducer from "@features/friends/friendsSlice"
import { baseApi } from "@shared/api/baseApi"
import { loadState, saveState } from "./persistence"

export const store = configureStore({
	reducer: {
		user: userReducer,
		binder: binderReducer,
		search: searchReducer,
		friends: friendsReducer,
		[baseApi.reducerPath]: baseApi.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
	preloadedState: loadState(),
})

store.subscribe(() => saveState(store.getState()))
