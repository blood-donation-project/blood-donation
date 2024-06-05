import { configureStore } from '@reduxjs/toolkit';
import { authAPI } from './features/auth/authAPI';
import authReducer from '../Redux/features/auth/authSlice';
import userReducer from '../Redux/features/user/userSlice';
import eventReducer from '../Redux/features/events/eventSlice';
import userAPI from './features/user/userAPI';
import eventAPI from './features/events/eventAPI';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        event: eventReducer,
        [authAPI.reducerPath]: authAPI.reducer,
        [userAPI.reducerPath]: userAPI.reducer,
        [eventAPI.reducerPath]: eventAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authAPI.middleware)
            .concat(userAPI.middleware)
            .concat(eventAPI.middleware), // Trả về mảng middleware
});
