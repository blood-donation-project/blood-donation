import { createSlice } from '@reduxjs/toolkit';
import eventAPI from './eventAPI';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

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
            )
            .addMatcher(
                eventAPI.endpoints.joinEvent.matchFulfilled,
                (state, { payload }) => {
                    state.event = payload.event;
                    console.log(payload);
                }
            )
            .addMatcher(
                eventAPI.endpoints.joinEvent.matchRejected,
                (state, action) => {
                    state.error = action.error.message;
                    if (action.payload?.status === 409) {
                        toast.error('Bạn đã tham gia sự kiện này rồi!');
                    }
                }
            )
            .addMatcher(
                eventAPI.endpoints.cancelJoin.matchFulfilled,
                (state, { payload }) => {
                    state.event = payload.event;
                    console.log(payload);
                }
            )
            .addMatcher(
                eventAPI.endpoints.cancelJoin.matchRejected,
                (state, action) => {
                    state.error = action.error.message;
                    if (action.payload?.status === 404) {
                        toast.error('Hủy tham gia sự kiện không thành công!');
                    }
                }
            )
            .addMatcher(
                eventAPI.endpoints.checkRegisEvent.matchFulfilled,
                (state, action) => {
                    state.event = action.payload.event;
                }
            )
            .addMatcher(
                eventAPI.endpoints.checkRegisEvent.matchRejected,
                (state, action) => {
                    state.error = action.error.message;
                }
            )
            .addMatcher(
                eventAPI.endpoints.deleteEvent.matchFulfilled,
                (state, action) => {
                    state.event = action.payload?.event;
                    console.log(action);
                    if (action.payload?.code === 200) {
                        toast.success('Hủy sự kiện thành công!');
                    }
                }
            )
            .addMatcher(
                eventAPI.endpoints.deleteEvent.matchRejected,
                (state, action) => {
                    state.error = action.error.message;
                }
            );
    },
});

export default eventSlice.reducer;
