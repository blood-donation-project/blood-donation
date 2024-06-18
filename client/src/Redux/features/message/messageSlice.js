import { createSlice } from '@reduxjs/toolkit';
import { messageAPI } from './messageAPI';

const messageSlice = createSlice({
    name: 'message',
    initialState: {
        conversations: {},
        error: null,
    },
    reducers: {
        messageReceived: (state, { payload }) => {
            const { receiverId, message } = payload;
            if (!state.conversations[receiverId]) {
                state.conversations[receiverId] = [];
            }
            state.conversations[receiverId].push(message);
        },
        setMessages: (state, { payload }) => {
            const { receiverId, messages } = payload;
            state.conversations[receiverId] = messages;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(messageAPI.endpoints.sendMessage.matchFulfilled, (state, { payload }) => {
                const { receiverId, messages } = payload;
                state.conversations[receiverId] = messages;
            })
            .addMatcher(messageAPI.endpoints.sendMessage.matchRejected, (state, action) => {
                state.error = action.error.message;
            })
            .addMatcher(messageAPI.endpoints.getMessage.matchFulfilled, (state, { payload }) => {
                const { receiverId, messages } = payload;
                state.conversations[receiverId] = messages;
            })
            .addMatcher(messageAPI.endpoints.getMessage.matchRejected, (state, action) => {
                state.error = action.error.message;
            })
            .addMatcher(messageAPI.endpoints.getReceiver.matchFulfilled, (state, { payload }) => {
                const { receiverId, messages } = payload;
                state.conversations[receiverId] = messages;
            })
            .addMatcher(messageAPI.endpoints.getReceiver.matchRejected, (state, action) => {
                state.error = action.error.message;
            });
    },
});

export const { messageReceived, setMessages } = messageSlice.actions;
export default messageSlice.reducer;
