import { createSlice } from '@reduxjs/toolkit';
import eventAPI from './eventAPI';
import { toast } from 'react-toastify';

const eventSlice = createSlice({
    name: 'event',
    initialState: {
        event: null,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(
                eventAPI.endpoints.createEvent.matchFulfilled,
                (state, { payload }) => {
                    state.event = payload.event;
                    toast.success('Tạo mới sự kiện thành công !');
                }
            )
            .addMatcher(
                eventAPI.endpoints.createEvent.matchRejected,
                (state, action) => {
                    state.error = action.error.message;
                    toast.error('Thất bại!');
                }
            )
            .addMatcher(
                eventAPI.endpoints.getEvent.matchFulfilled,
                (state, { payload }) => {
                    state.event = payload.event;
                }
            )
            .addMatcher(
                eventAPI.endpoints.getEvent.matchRejected,
                (state, action) => {
                    state.error = action.error.message;
                }
            )
            .addMatcher(
                eventAPI.endpoints.getEventById.matchFulfilled,
                (state, { payload }) => {
                    state.event = payload.event;
                }
            )
            .addMatcher(
                eventAPI.endpoints.getEventById.matchRejected,
                (state, action) => {
                    state.error = action.error.message;
                }
            )
            .addMatcher(
                eventAPI.endpoints.getEventByIdEvent.matchFulfilled,
                (state, { payload }) => {
                    state.event = payload.event;
                }
            )
            .addMatcher(
                eventAPI.endpoints.getEventByIdEvent.matchRejected,
                (state, action) => {
                    state.error = action.error.message;
                }
            );
    },
});

export default eventSlice.reducer;
