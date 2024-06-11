import { createSlice } from '@reduxjs/toolkit';
import { messageAPI } from './messageAPI';

const messageSlice = createSlice({
    name: 'message',
    initialState: {
        message: null,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(
                messageAPI.endpoints.sendMessage.matchFulfilled,
                (state, { payload }) => {
                    state.message = payload.message;
                }
            )
            .addMatcher(
                messageAPI.endpoints.sendMessage.matchRejected,
                (state, action) => {
                    state.error = action.error.message;
                }
            )
            .addMatcher(
                messageAPI.endpoints.getMessage.matchFulfilled,
                (state, { payload }) => {
                    state.message = payload.message;
                }
            )
            .addMatcher(
                messageAPI.endpoints.getMessage.matchRejected,
                (state, action) => {
                    state.error = action.error.message;
                }
            )
            .addMatcher(
                messageAPI.endpoints.getReceiver.matchFulfilled,
                (state, { payload }) => {
                    state.message = payload.message;
                }
            )
            .addMatcher(
                messageAPI.endpoints.getReceiver.matchRejected,
                (state, action) => {
                    state.error = action.error.message;
                }
            );
    },
});
export default messageSlice.reducer;
