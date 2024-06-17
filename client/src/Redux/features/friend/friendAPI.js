import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const friendAPI = createApi({
    reducerPath: 'friendAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/api/friends',
        credentials: 'include',
        prepareHeaders: (headers, { getState }) => {
            const token = localStorage.getItem('accessToken'); // Lấy token từ Redux store
            if (token) {
                headers.set('Authorization', `Bearer ${token}`); // Thêm token vào header
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getSuggestedUsers: builder.mutation({
            query: ({ limit, page }) => ({
                url: '/suggests',
                method: 'GET',
                params: {
                    limit,
                    page,
                },
            }),
        }),
        getAllFriends: builder.mutation({
            query: ({ userId, limit, page }) => ({
                url: '',
                method: 'GET',
                params: {
                    userId,
                    limit,
                    page,
                },
            }),
        }),
        getAllFollowedFacilities: builder.mutation({
            query: ({ limit, page }) => ({
                url: '/followed-facilities',
                method: 'GET',
                params: {
                    limit,
                    page,
                },
            }),
        }),
        getFriendRequests: builder.mutation({
            query: ({ limit, page }) => ({
                url: `/requests`,
                method: 'GET',
                params: {
                    limit,
                    page,
                },
            }),
        }),
        sendFriendRequest: builder.mutation({
            query: ({ receiverId }) => ({
                url: `/requests/send`,
                method: 'POST',
                body: { receiverId },
            }),
        }),
        cancelFriendRequest: builder.mutation({
            query: ({ receiverId }) => ({
                url: `/requests/cancel`,
                method: 'POST',
                body: { receiverId },
            }),
        }),
        acceptFriendRequest: builder.mutation({
            query: ({ requestId }) => ({
                url: `/requests/accept`,
                method: 'POST',
                body: {
                    requestId: requestId,
                },
            }),
        }),
        rejectFriendRequest: builder.mutation({
            query: ({ requestId }) => ({
                url: `/requests/reject`,
                method: 'POST',
                body: {
                    requestId: requestId,
                },
            }),
        }),
        unfriend: builder.mutation({
            query: ({ friendId }) => ({
                url: `/unfriend`,
                method: 'POST',

                body: {
                    friendId: friendId,
                },
            }),
        }),
        follow: builder.mutation({
            query: ({ receiverId }) => ({
                url: `/follow`,
                method: 'POST',
                body: { receiverId },
            }),
        }),
        unfollow: builder.mutation({
            query: ({ receiverId }) => ({
                url: `/unfollow`,
                method: 'POST',
                body: { receiverId },
            }),
        }),
    }),
});

export const {
    useAcceptFriendRequestMutation,
    useGetAllFriendsMutation,
    useGetFriendRequestsMutation,
    useGetSuggestedUsersMutation,
    useRejectFriendRequestMutation,
    useSendFriendRequestMutation,
    useCancelFriendRequestMutation,
    useUnfriendMutation,
    useFollowMutation,
    useUnfollowMutation,
    useGetAllFollowedFacilitiesMutation,
} = friendAPI;

export default friendAPI;
