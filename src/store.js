import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './Redux'

export   const store = configureStore({
    reducer: {
        user: userReducer
    },
})