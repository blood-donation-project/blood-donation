import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postAPI = createApi({
    reducerPath: 'postAPT',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/api/posts',
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
        createPost: builder.mutation({
            query: (postData) => ({
                url: '/create',
                method: 'POST',
                body: postData,
            }),
        }),
        deletePost: builder.mutation({
            query: ({ postId }) => ({
                url: `/${postId}/delete`,
                method: 'DELETE',
            }),
        }),
        getHomePagePosts: builder.mutation({
            query: ({ limit, page }) => ({
                url: '',
                method: 'GET',
                params: {
                    limit,
                    page,
                },
            }),
        }),
        getPostsByUserId: builder.mutation({
            query: ({ userId, limit, page }) => ({
                url: `/${userId}`,
                method: 'GET',
                params: {
                    limit,
                    page,
                },
            }),
        }),
        getCommentByPostId: builder.mutation({
            query: ({ postId, limit, page }) => ({
                url: `/${postId}/comments`,
                method: 'GET',
                params: {
                    limit,
                    page,
                },
            }),
        }),
        getMoreComments: builder.mutation({
            query: ({ postId, limit, page }) => ({
                url: `/${postId}/comments`,
                method: 'GET',
                params: {
                    limit,
                    page,
                },
            }),
        }),
        createComment: builder.mutation({
            query: (commentData) => ({
                url: `/${commentData.postId}/comments/create`,
                method: 'POST',
                body: {
                    content: commentData.content,
                },
            }),
        }),
        likePost: builder.mutation({
            query: (postId) => ({
                url: `/${postId}/like`,
                method: 'POST',
            }),
        }),
        unlikePost: builder.mutation({
            query: (postId) => ({
                url: `/${postId}/unlike`,
                method: 'POST',
            }),
        }),
        getAllPostsByAdmin: builder.mutation({
            query: (searchTerm) => ({
                url: 'get-all-posts',
                method: 'POST',
                body: { searchTerm },
            }),
        }),
        getAllPostsByMonths: builder.query({
            query: () => ({
                url: '/get-posts-by-months',
                method: 'GET',
            }),
        }),
        getAllUnPublishPosts: builder.query({
            query: () => ({
                url: '/get-unpublish-posts',
                method: 'GET',
            }),
        }),
        publishPost: builder.mutation({
            query: (postId) => ({
                url: '/publish-post',
                method: 'PUT',
                body: { postId },
            }),
        }),
    }),
});

export const {
    useCreateCommentMutation,
    useDeletePostMutation,
    useCreatePostMutation,
    useGetMoreCommentsMutation,
    useGetCommentByPostIdMutation,
    useGetHomePagePostsMutation,
    useLikePostMutation,
    useUnlikePostMutation,
    useGetPostsByUserIdMutation,
    useGetAllPostsByAdminMutation,
    useGetAllPostsByMonthsQuery,
    useGetAllUnPublishPostsQuery,
    usePublishPostMutation,
} = postAPI;

export default postAPI;
