import { configureStore } from '@reduxjs/toolkit';
import { authAPI } from './features/auth/authAPI';
import authReducer from '../Redux/features/auth/authSlice';
import userReducer from '../Redux/features/user/userSlice';
import eventReducer from '../Redux/features/events/eventSlice';
import postReducer from '../Redux/features/post/postSlice';
import searchReducer from '../Redux/features/search/searchSlice';
import friendReducer from '../Redux/features/friend/friendSlice';
import userAPI from './features/user/userAPI';
import eventAPI from './features/events/eventAPI';
import postAPI from './features/post/postAPI';
import friendAPI from './features/friend/friendAPI';
import searchAPI from './features/search/searchAPI';

import messageReducer from './features/message/messageSlice';
import notifiReducer from './features/notification/notifiSlice';
import notifiAPI from './features/notification/notifiAPI';

import { messageAPI } from './features/message/messageAPI';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        event: eventReducer,
        posts: postReducer,
        friend: friendReducer,
        search: searchReducer,
        [authAPI.reducerPath]: authAPI.reducer,
        [userAPI.reducerPath]: userAPI.reducer,
        [eventAPI.reducerPath]: eventAPI.reducer,
        [postAPI.reducerPath]: postAPI.reducer,
        [friendAPI.reducerPath]: friendAPI.reducer,
        [searchAPI.reducerPath]: searchAPI.reducer,

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

            .concat(postAPI.middleware)
            .concat(friendAPI.middleware)
            .concat(searchAPI.middleware)
            .concat(messageAPI.middleware)
            .concat(notifiAPI.middleware), // Trả về mảng middleware
});
