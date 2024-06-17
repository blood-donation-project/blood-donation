import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import friendAPI from './friendAPI';

const friendSlice = createSlice({
    name: 'friend',
    initialState: {
        friends: [],
        suggestedFriends: [],
        friendRequests: [],
        followers: [],
    },
    reducers: {
        resetFriends: (state, _) => {
            return {
                ...state,
                friends: [],
            };
        },
        resetFollowers: (state, _) => {
            return {
                ...state,
                followers: [],
            };
        },
        resetSuggestedFriends: (state, _) => {
            return {
                ...state,
                suggestedFriends: [],
            };
        },
        resetFriendRequests: (state, _) => {
            return {
                ...state,
                friendRequests: [],
            };
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(friendAPI.endpoints.getAllFriends.matchFulfilled, (state, action) => {
            state.friends = [...state.friends, ...action.payload.data];
        });
        builder.addMatcher(friendAPI.endpoints.getAllFollowedFacilities.matchFulfilled, (state, action) => {
            state.followers = [...state.followers, ...action.payload.data];
        });
        builder.addMatcher(friendAPI.endpoints.getSuggestedUsers.matchFulfilled, (state, action) => {
            state.suggestedFriends = [...state.suggestedFriends, ...action.payload.data];
        });
        builder.addMatcher(friendAPI.endpoints.getFriendRequests.matchFulfilled, (state, action) => {
            state.friendRequests = [...state.friendRequests, ...action.payload.data];
        });
        builder.addMatcher(friendAPI.endpoints.sendFriendRequest.matchFulfilled, (state, action) => {
            const friendRequest = action.payload;
            const findIndex = state.suggestedFriends.findIndex((suggest) => suggest._id === friendRequest._id);
            state.suggestedFriends[findIndex] = friendRequest;
        });
        builder.addMatcher(friendAPI.endpoints.sendFriendRequest.matchRejected, (state, action) => {
            if (action.payload.status === 400) {
                toast.error('Bạn đã gửi lời mời trước đó hoặc cả hai hiện đang là bạn bè');
            } else {
                toast.error('Đã xảy ra lỗi vui lòng thử lại');
            }
        });
        builder.addMatcher(friendAPI.endpoints.cancelFriendRequest.matchFulfilled, (state, action) => {
            const friendRequest = action.payload;
            const findIndex = state.suggestedFriends.findIndex((suggest) => suggest._id === friendRequest._id);
            state.suggestedFriends[findIndex] = friendRequest;
        });
        builder.addMatcher(friendAPI.endpoints.acceptFriendRequest.matchFulfilled, (state, action) => {
            const friendRequest = action.payload;
            const findIndex = state.friendRequests.findIndex(
                (request) => request.friendRequest._id === friendRequest.friendRequest._id,
            );
            state.friendRequests[findIndex] = friendRequest;
        });
        builder.addMatcher(friendAPI.endpoints.acceptFriendRequest.matchRejected, (state, action) => {
            if (action.payload.status === 404) {
                toast.error('Lời mời không còn khả dụng');
            } else {
                toast.error('Đã xảy ra lỗi vui lòng thử lại');
            }
        });
        builder.addMatcher(friendAPI.endpoints.rejectFriendRequest.matchFulfilled, (state, action) => {
            const friendRequest = action.payload;
            const findIndex = state.friendRequests.findIndex(
                (request) => request.friendRequest._id === friendRequest.friendRequest._id,
            );
            state.friendRequests[findIndex] = friendRequest;
        });
        builder.addMatcher(friendAPI.endpoints.unfriend.matchFulfilled, (state, action) => {
            const user = action.payload;
            const indexFriendRequest = state.friendRequests.findIndex((request) => request._id === user._id);
            const indexFriend = state.friendRequests.findIndex((friend) => user._id === friend._id);
            state.friendRequests[indexFriendRequest] = user;
            state.friends[indexFriend] = user;
        });
        builder.addMatcher(friendAPI.endpoints.follow.matchFulfilled, (state, action) => {
            state.followers = [...state.followers, action.payload];
        });
        builder.addMatcher(friendAPI.endpoints.unfollow.matchFulfilled, (state, action) => {
            const currentFollowers = state.followers;
            const user = action.payload;
            const indexFollower = state.followers.findIndex((follower) => user._id === follower._id);
            currentFollowers.splice(indexFollower, 1);
            state.followers = currentFollowers;
        });
    },
});

export const { resetFriends, resetSuggestedFriends, resetFollowers, resetFriendRequests } = friendSlice.actions;
export default friendSlice.reducer;
