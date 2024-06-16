import { configureStore } from '@reduxjs/toolkit';
import { authAPI } from './features/auth/authAPI';
import authReducer from '../Redux/features/auth/authSlice';
import userReducer from '../Redux/features/user/userSlice';
import eventReducer from '../Redux/features/events/eventSlice';
import messageReducer from './features/message/messageSlice';
import notifiReducer from './features/notification/notifiSlice';
import notifiAPI from './features/notification/notifiAPI';
import userAPI from './features/user/userAPI';
import eventAPI from './features/events/eventAPI';
import { messageAPI } from './features/message/messageAPI';
export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        event: eventReducer,
        message: messageReducer,
        notification: notifiReducer,
        [authAPI.reducerPath]: authAPI.reducer,
        [userAPI.reducerPath]: userAPI.reducer,
        [eventAPI.reducerPath]: eventAPI.reducer,
        [messageAPI.reducerPath]: messageAPI.reducer,
        [notifiAPI.reducerPath]: notifiAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authAPI.middleware)
            .concat(userAPI.middleware)
            .concat(eventAPI.middleware)
            .concat(messageAPI.middleware)
            .concat(notifiAPI.middleware), // Trả về mảng middleware
});
