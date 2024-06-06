import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authAPI = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/v1/auth/',
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
        login: builder.mutation({
            query: (credentials) => ({
                url: 'login',
                method: 'POST',
                body: credentials,
            }),
        }),
        register: builder.mutation({
            query: (userData) => ({
                url: 'register',
                method: 'POST',
                body: userData,
            }),
        }),
        forgotPassword: builder.mutation({
            query: (email) => ({
                url: 'forgotpassword',
                method: 'POST',
                body: { email },
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: 'logout',
                method: 'POST',
            }),
        }),
        refreshtoken: builder.mutation({
            query: () => ({
                url: 'refresh-token',
                method: 'POST',
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useForgotPasswordMutation,
    useLogoutMutation,
    useRefreshtokenMutation,
} = authAPI;

export default authAPI;
