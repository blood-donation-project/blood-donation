import { createSlice } from '@reduxjs/toolkit';
import notifiAPI from './notifiAPI';

const notifiSlice = createSlice({
    name: 'notification',
    initialState: {
        notification: null,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(
                notifiAPI.endpoints.getAllNotifi.matchFulfilled,
                (state, { payload }) => {
                    state.notification = payload;
                    state.error = null;
                }
            )
            .addMatcher(
                notifiAPI.endpoints.getAllNotifi.matchRejected,
                (state, { error }) => {
                    state.error = error.message;
                }
            );
    },
});
export default notifiSlice.reducer;
