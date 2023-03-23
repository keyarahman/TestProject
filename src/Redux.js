import { createSlice, configureStore } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo: {
            userName: "",
            email: "",
            password: null,
            skil: null,
            userImage: null,
            language: "",

        }




    },
    reducers: {
        aduserInfo: (state, action) => {
            console.log("action", action)
            state.userInfo = action.payload

        }
    }
})
// Action creators are generated for each case reducer function
export const { aduserInfo } = userSlice.actions

export const userReducer = userSlice.reducer;

