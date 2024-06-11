import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userAPI = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/api/user/',
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
        getUser: builder.mutation({
            query: () => ({
                url: 'get-user',
                method: 'GET',
            }),
        }),
        updateUser: builder.mutation({
            query: (eventData) => ({
                url: 'update-user',
                method: 'POST',
                body: eventData,
            }),
        }),
        getUserById: builder.mutation({
            query: (userId) => ({
                url: `get-user-by-id/${userId}`,
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useGetUserMutation,
    useUpdateUserMutation,
    useGetUserByIdMutation,
} = userAPI;

export default userAPI;
