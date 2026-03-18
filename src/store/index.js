import { configureStore } from "@reduxjs/toolkit"
import userReducer from "@features/user/userSlice"
import binderReducer from "@features/binder/binderSlice"

export const store = configureStore({
	reducer: {
		user: userReducer,
        binder: binderReducer,
	},
})
