import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    user : null
}

export const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        setUser: (initialState, action) => {
            initialState.user = action.payload
        }
    }
})

export const {setUser} = userSlice.actions

export default userSlice.reducer