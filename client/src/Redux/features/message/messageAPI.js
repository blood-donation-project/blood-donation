import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const messageAPI = createApi({
    reducerPath: 'messageApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/message/',
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
        sendMessage: builder.mutation({
            query: ({ receiverId, content }) => ({
                url: `send-message/${receiverId}`,
                method: 'POST',
                body: { content },
            }),
            invalidatesTags: (result, error, { receiverId }) => [
                { type: 'Message', id: receiverId },
            ],
        }),
        getMessage: builder.mutation({
            query: (receiverId) => ({
                url: `get-message/${receiverId}`,
                method: 'GET',
            }),
        }),
        getReceiver: builder.mutation({
            query: () => ({
                url: 'get-receiver',
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useSendMessageMutation,
    useGetMessageMutation,
    useGetReceiverMutation,
} = messageAPI;
