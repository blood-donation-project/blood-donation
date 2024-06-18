import { createSlice } from '@reduxjs/toolkit';
import { messageAPI } from './messageAPI';

const messageSlice = createSlice({
    name: 'message',
    initialState: {
        messages: [],
        conversations: [],
        error: null,
    },
    reducers: {
        messageReceived: (state, { payload }) => {
            state.messages.push(payload);
        },
        setMessages: (state, { payload }) => {
            state.messages = payload;
        },
    },

    extraReducers: (builder) => {
        builder
            .addMatcher(
                messageAPI.endpoints.sendMessage.matchFulfilled,
                (state, { payload }) => {
                    state.messages = payload.messages;
                }
            )
            .addMatcher(
                messageAPI.endpoints.sendMessage.matchRejected,
                (state, action) => {
                    state.error = action.error.messages;
                }
            )
            .addMatcher(
                messageAPI.endpoints.getMessage.matchFulfilled,
                (state, { payload }) => {
                    state.messages = payload.messages;
                }
            )
            .addMatcher(
                messageAPI.endpoints.getMessage.matchRejected,
                (state, action) => {
                    state.error = action.error.messages;
                }
            )
            .addMatcher(
                messageAPI.endpoints.getReceiver.matchFulfilled,
                (state, { payload }) => {
                    state.messages = payload.messages;
                }
            )
            .addMatcher(
                messageAPI.endpoints.getReceiver.matchRejected,
                (state, action) => {
                    state.error = action.error.messages;
                }
            );
    },
});

export const { messageReceived, setMessages } = messageSlice.actions;
export default messageSlice.reducer;
