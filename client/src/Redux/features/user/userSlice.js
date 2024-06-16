import { createSlice } from '@reduxjs/toolkit';
import userAPI from './userAPI';
import { toast } from 'react-toastify';

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
            )
            .addMatcher(
                userAPI.endpoints.updateUser.matchFulfilled,
                (state, { payload }) => {
                    state.user = payload;
                    state.error = null;
                }
            )
            .addMatcher(
                userAPI.endpoints.updateUser.matchRejected,
                (state, action) => {
                    state.error = action.error.message;
                    console.log(action.payload.status);
                    if (action.payload.status === 409) {
                        toast.error(
                            'Thông tin cập nhật không hợp lệ. Vui lòng kiểm tra lại thông tin của bạn!'
                        );
                    }
                }
            )
            .addMatcher(
                userAPI.endpoints.getUserById.matchFulfilled,
                (state, { payload }) => {
                    state.user = payload;
                    state.error = null;
                }
            )
            .addMatcher(
                userAPI.endpoints.getUserById.matchRejected,
                (state, action) => {
                    state.error = action.error.message;
                }
            )
            .addMatcher(
                userAPI.endpoints.getAllUser.matchFulfilled,
                (state, { payload }) => {
                    state.user = payload;
                    state.error = null;
                }
            )
            .addMatcher(
                userAPI.endpoints.getAllUser.matchRejected,
                (state, action) => {
                    state.error = action.error.message;
                    console.log(action);
                }
            )
            .addMatcher(
                userAPI.endpoints.getUserByMonths.matchFulfilled,
                (state, { payload }) => {
                    state.user = payload;
                    state.error = null;
                }
            )
            .addMatcher(
                userAPI.endpoints.getUserByMonths.matchRejected,
                (state, action) => {
                    state.error = action.error.message;
                    console.log(action);
                    if (action.payload?.data?.message === 'You are not Admin') {
                        toast.error('Bạn không có quyền truy cập trang này');
                    }
                }
            )
            .addMatcher(
                userAPI.endpoints.lockorUnlockUser.matchFulfilled,
                (state, { payload }) => {
                    state.user = payload;
                    state.error = null;
                }
            )
            .addMatcher(
                userAPI.endpoints.lockorUnlockUser.matchRejected,
                (state, action) => {
                    state.error = action.error.message;
                }
            );
    },
});

export default userSlice.reducer;
