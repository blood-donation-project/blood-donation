import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const eventAPI = createApi({
    reducerPath: 'eventApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/events/',
        credentials: 'include',
        prepareHeaders: (headers, { getState }) => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        createEvent: builder.mutation({
            query: (eventData) => ({
                url: 'create-event',
                method: 'POST',
                body: eventData,
            }),
        }),
        getEvent: builder.mutation({
            query: (eventData) => ({
                url: '',
                method: 'POST',
                body: eventData,
            }),
        }),
        getEventById: builder.mutation({
            //Id User
            query: (eventData) => ({
                url: 'manage-events',
                method: 'POST',
                body: eventData,
            }),
        }),
        getEventByIdEvent: builder.query({
            query: (eventId) => ({
                url: `detail-event/${eventId}`,
                method: 'GET',
            }),
        }),
        joinEvent: builder.mutation({
            //Id User
            query: (eventId) => ({
                url: `join-event/${eventId}`,
                method: 'POST',
                body: eventId,
            }),
        }),
        cancelJoin: builder.mutation({
            //Id User
            query: (eventId) => ({
                url: `cancel-join/${eventId}`,
                method: 'POST',
                body: eventId,
            }),
        }),
        checkRegisEvent: builder.mutation({
            query: (eventId) => ({
                url: `check-register/${eventId}`,
                method: 'POST',
                body: eventId,
            }),
        }),
        deleteEvent: builder.mutation({
            query: (eventId) => ({
                url: `delete-event/${eventId}`,
                method: 'POST',
                body: eventId,
            }),
        }),
        getUserRegister: builder.mutation({
            query: (eventId) => ({
                url: `get-user-register-event/${eventId}`,
                method: 'POST',
                body: eventId,
            }),
        }),
    }),
});

export const {
    useCreateEventMutation,
    useGetEventMutation,
    useGetEventByIdMutation,
    useGetEventByIdEventQuery,
    useJoinEventMutation,
    useCancelJoinMutation,
    useCheckRegisEventMutation,
    useDeleteEventMutation,
    useGetUserRegisterMutation,
} = eventAPI;

export default eventAPI;
