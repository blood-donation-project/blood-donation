import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import postAPI from './postAPI';

const postSlice = createSlice({
    name: 'post',
    initialState: {
        homePagePosts: [],
        profilePosts: [],
        comments: [],
    },
    reducers: {
        updateAuthorPosts: (state, action) => {
            const tempHomePaePost = state.homePagePosts;
            const author = action.payload;
            const newHomePagePost = tempHomePaePost.map((post) => {
                if (post.author._id === author._id) {
                    return { ...post, author: author };
                }
                return post;
            });
            return {
                ...state,
                homePagePosts: newHomePagePost,
            };
        },
        updateCommentPost: (state, action) => {
            //
        },
        resetHomePagePosts: (state, _) => {
            return {
                ...state,
                homePagePosts: [],
            };
        },
        resetProfilePosts: (state, _) => {
            return {
                ...state,
                profilePosts: [],
            };
        },
    },
    extraReducers: (builder) => {
        // POst
        builder.addMatcher(postAPI.endpoints.getHomePagePosts.matchFulfilled, (state, action) => {
            state.homePagePosts = [...state.homePagePosts, ...action.payload.data];
        });
        builder.addMatcher(postAPI.endpoints.getPostsByUserId.matchFulfilled, (state, action) => {
            state.profilePosts = [...state.profilePosts, ...action.payload.data];
        });
        builder.addMatcher(postAPI.endpoints.createPost.matchFulfilled, (state, action) => {
            state.homePagePosts = [action.payload, ...state.homePagePosts];
            state.profilePosts = [action.payload, ...state.profilePosts];
            toast.success('Đăng bài thành công');
        });
        builder.addMatcher(postAPI.endpoints.deletePost.matchFulfilled, (state, action) => {
            const currentHomePagePosts = state.homePagePosts;
            const currentMyPosts = state.profilePosts;
            const indexHompagePost = state.homePagePosts.findIndex((post) => post._id === action.payload.postId);
            const indexMyPost = state.profilePosts.findIndex((post) => post._id === action.payload.postId);

            currentHomePagePosts.splice(indexHompagePost, 1);
            currentMyPosts.splice(indexMyPost, 1);

            state.homePagePosts = currentHomePagePosts;
            state.profilePosts = currentMyPosts;
            toast.success('Xóa bài thành công');
        });

        // Comment
        builder.addMatcher(postAPI.endpoints.getCommentByPostId.matchFulfilled, (state, action) => {
            state.comments = action.payload.data;
        });
        builder.addMatcher(postAPI.endpoints.getMoreComments.matchFulfilled, (state, action) => {
            state.comments = [...state.comments, ...action.payload.data];
        });
        builder.addMatcher(postAPI.endpoints.createComment.matchFulfilled, (state, action) => {
            const commentData = action.payload;
            const indexHomePagePost = state.homePagePosts.findIndex((post) => post._id === commentData.post._id);
            const indexProfilePost = state.profilePosts.findIndex((post) => post._id === commentData.post._id);
            const newPostData = {
                ...commentData.post,
                author: state.homePagePosts[indexHomePagePost].author,
            };

            state.homePagePosts[indexHomePagePost] = newPostData;
            state.profilePosts[indexProfilePost] = newPostData;

            delete commentData.post;
            state.comments = [{ ...commentData }, ...state.comments];
        });
        // Like
        builder.addMatcher(postAPI.endpoints.likePost.matchFulfilled, (state, action) => {
            const postData = action.payload;
            const indexHompagePost = state.homePagePosts.findIndex((post) => post._id === action.payload._id);
            const indexMyPost = state.profilePosts.findIndex((post) => post._id === action.payload._id);

            state.homePagePosts[indexHompagePost] = postData;
            state.profilePosts[indexMyPost] = postData;
        });
        builder.addMatcher(postAPI.endpoints.unlikePost.matchFulfilled, (state, action) => {
            const postData = action.payload;
            const indexHompagePost = state.homePagePosts.findIndex((post) => post._id === action.payload._id);
            const indexMyPost = state.profilePosts.findIndex((post) => post._id === action.payload._id);
            state.homePagePosts[indexHompagePost] = postData;
            state.profilePosts[indexMyPost] = postData;
        });
    },
});

export const { resetHomePagePosts, updateAuthorPosts, resetProfilePosts } = postSlice.actions;
export default postSlice.reducer;
