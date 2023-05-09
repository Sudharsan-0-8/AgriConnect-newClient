import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    username: '',
    token: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState: { value: initialState } ,
    reducers: {
        setUser(state, action) {
            state.value = action.payload
            localStorage.setItem('token', state.value.token)
            console.log(state)
        },
        unSetUser(state, action) {
            localStorage.removeItem('token');
            state.value = initialState;
        }
    }
})


export const { setUser, unSetUser } = userSlice.actions;

export default userSlice.reducer;