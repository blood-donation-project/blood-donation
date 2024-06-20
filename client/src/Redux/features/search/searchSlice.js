import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import searchAPI from './searchAPI';

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        postsData: [],
        usersData: [],
        surroundingUsersData: [],
    },
    reducers: {
        setUsersSearch: (state, action) => {
            return {
                ...state,
                usersData: action.payload.data,
            };
        },
        updateOneSearchPostData: (state, action) => {
            const postData = action.payload;
            const findIndex = state.postsData.findIndex((post) => post._id === postData._id);
            state.postsData[findIndex] = postData;
        },
        updateOneSearchUserData: (state, action) => {
            const postData = action.payload;
            const findIndex = state.postsData.findIndex((post) => post._id === postData._id);
            state.postsData[findIndex] = postData;
        },
        resetSearchPostsData: (state, _) => {
            return {
                ...state,
                postsData: [],
            };
        },
        resetSearchUsersData: (state, _) => {
            return {
                ...state,
                usersData: [],
            };
        },
        resetSurroundingUsersData: (state, _) => {
            return {
                ...state,
                surroundingUsersData: [],
            };
        },
    },
    extraReducers: (builder) => {
        // User
        builder.addMatcher(searchAPI.endpoints.searchUsers.matchFulfilled, (state, action) => {
            state.usersData = action.payload.data;
        });
        // Post
        builder.addMatcher(searchAPI.endpoints.searchPosts.matchFulfilled, (state, action) => {
            state.postsData = [...state.postsData, ...action.payload.data];
        });
        // Surrounding users
        builder.addMatcher(searchAPI.endpoints.searchSurroundingUsers.matchFulfilled, (state, action) => {
            state.surroundingUsersData = action.payload.data;
        });
    },
});

export const {
    setUsersSearch,
    updateOneSearchPostData,
    resetSearchPostsData,
    resetSearchUsersData,
    resetSurroundingUsersData,
} = searchSlice.actions;
export default searchSlice.reducer;
