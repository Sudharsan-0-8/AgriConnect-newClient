import { createSlice } from '@reduxjs/toolkit';

const initialState = { isSidebarVisible: false };

export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: initialState,
    reducers: {
        show(state) {
            state.isSidebarVisible = true;
            console.log(state)
        },
        hide(state) {
            state.isSidebarVisible = false
        }
    }
});

export const { hide, show } = sidebarSlice.actions;

export default sidebarSlice.reducer;