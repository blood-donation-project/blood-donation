import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const searchAPI = createApi({
    reducerPath: 'searchAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/api/search',
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
        searchUsers: builder.mutation({
            query: ({ q, limit, page }) => ({
                url: '/users',
                method: 'GET',
                params: { q, limit, page },
            }),
        }),
        searchPosts: builder.mutation({
            query: ({ q, limit, page }) => ({
                url: `/posts`,
                method: 'GET',
                params: { q, limit, page },
            }),
        }),
        searchSurroundingUsers: builder.mutation({
            query: ({ province, bloodGroup, limit, page }) => ({
                url: '/surrounding-users',
                method: 'GET',
                params: { province, bloodGroup, limit, page },
            }),
        }),
    }),
});

export const { useSearchPostsMutation, useSearchSurroundingUsersMutation, useSearchUsersMutation } = searchAPI;

export default searchAPI;
