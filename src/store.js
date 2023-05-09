import { configureStore } from '@reduxjs/toolkit';

import loginReducers from './features/login.js';
import userReducers from './features/user.js';
import sidebarReducers from './features/sidebar.js';

const store = configureStore({
    reducer: {
        login: loginReducers,
        user: userReducers,
        sidebar: sidebarReducers,
    }
});

export default store;