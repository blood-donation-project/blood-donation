import { createSlice } from '@reduxjs/toolkit';
import userAPI from './userAPI';
import { toast } from 'react-toastify';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        otherUser: null,
        error: null,
        photos: [],
    },
    reducers: {
        resetPhotos: (state, action) => {
            return {
                ...state,
                photos: [],
            };
        },
        updateOtherUser: (state, action) => {
            console.log(action.payload);
            return {
                ...state,
                otherUser: action.payload,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(userAPI.endpoints.getUser.matchFulfilled, (state, { payload }) => {
                state.user = payload;
                state.error = null;
            })
            .addMatcher(userAPI.endpoints.getUser.matchRejected, (state, { error }) => {
                state.error = error.message;
            })
            .addMatcher(userAPI.endpoints.updateUser.matchFulfilled, (state, { payload }) => {
                state.user = payload;
                state.error = null;
            })
            .addMatcher(userAPI.endpoints.updateUser.matchRejected, (state, action) => {
                state.error = action.error.message;
                if (action.payload.status === 409) {
                    toast.error('Thông tin cập nhật không hợp lệ. Vui lòng kiểm tra lại thông tin của bạn!');
                }
            })
            .addMatcher(userAPI.endpoints.getUserById.matchFulfilled, (state, { payload }) => {
                state.otherUser = payload;
                state.error = null;
            })
            .addMatcher(userAPI.endpoints.getUserById.matchRejected, (state, action) => {
                state.error = action.error.message;
            })
            .addMatcher(userAPI.endpoints.getPhotos.matchFulfilled, (state, action) => {
                state.photos = [...state.photos, ...action.payload.data];
            });
    },
});

export const { resetPhotos, updateOtherUser } = userSlice.actions;
export default userSlice.reducer;
