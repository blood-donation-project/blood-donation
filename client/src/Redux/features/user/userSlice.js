import { createSlice } from '@reduxjs/toolkit';
import userAPI from './userAPI';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(
                userAPI.endpoints.getUser.matchFulfilled,
                (state, { payload }) => {
                    state.user = payload;
                    state.error = null;
                }
            )
            .addMatcher(
                userAPI.endpoints.getUser.matchRejected,
                (state, { error }) => {
                    state.error = error.message;
                }
            );
    },
});

export default userSlice.reducer;
