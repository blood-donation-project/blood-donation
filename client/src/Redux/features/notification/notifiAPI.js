import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const notifiAPI = createApi({
    reducerPath: 'notifiApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/notifi/',
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
        getAllNotifi: builder.mutation({
            query: (userId) => ({
                url: 'get-all-notifications',
                method: 'POST',
                body: { userId },
            }),
        }),
        getInviteEventNotifi: builder.mutation({
            query: (type) => ({
                url: 'get-notifications-invite-event',
                method: 'POST',
                body: type,
            }),
        }),
        notifiRequestHelp: builder.mutation({
            query: (helper) => ({
                url: 'request-help',
                method: 'POST',
                body: helper,
            }),
        }),
    }),
});

export const { useGetAllNotifiMutation, useGetInviteEventNotifiMutation, useNotifiRequestHelpMutation } = notifiAPI;
export default notifiAPI;
