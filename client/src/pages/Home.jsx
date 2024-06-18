import React, { useEffect, useState } from 'react';
import NavMenu from '../components/NavMenu';
import { Link } from 'react-router-dom';

import { GoPlusCircle } from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux';
import { PiUsersThree } from 'react-icons/pi';
import InfiniteScroll from 'react-infinite-scroll-component';
import { MdEvent } from 'react-icons/md';

import {
    useGetSuggestedUsersMutation,
    useGetAllFriendsMutation,
    useGetAllFollowedFacilitiesMutation,
} from '../Redux/features/friend/friendAPI';
import { useGetHomePagePostsMutation } from '../Redux/features/post/postAPI';

import PostLoading from '../components/LoadingSkeleton/Post/PostLoading';
import Post from '../components/Post/Post';
import ModalWrapper from '../components/Modal/ModalWrapper';
import CreatePost from '../components/Modal/ModalContent/CreatePost';
import Avatar from '../components/Image/Avatar';
import UserFriendLoading from '../components/LoadingSkeleton/User/UserFriendLoading';
import UserSuggestLoading from '../components/LoadingSkeleton/User/UserSuggestLoading';
import getLastName from '../utils/getLastName';
import { resetHomePagePosts } from '../Redux/features/post/postSlice';
import { resetFollowers, resetFriends, resetSuggestedFriends } from '../Redux/features/friend/friendSlice';
import { HiMiniUsers } from 'react-icons/hi2';
import { BsMessenger } from 'react-icons/bs';
import { useAutoRefreshToken } from '../hooks/useAutoRefreshToken';

const HomePage = () => {
    const dispatch = useDispatch();

    const [isShowingModal, setIsShowingModal] = useState(false);
    const [pagination, setPagination] = useState();
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);

    const [getHomePagePosts] = useGetHomePagePostsMutation();
    const [getSuggestedUsers, { isLoading: isLoadingSuggestedUsers }] = useGetSuggestedUsersMutation();
    const [getAllFriends, { isLoading: isLoadingAllFriends }] = useGetAllFriendsMutation();
    const [getAllFollowedFacilities, { isLoading: isLoadingAllFollowers }] = useGetAllFollowedFacilitiesMutation();

    const { user } = useSelector((state) => state.user);
    const { homePagePosts } = useSelector((state) => state.posts);

    const { suggestedFriends, friends, followers } = useSelector((state) => state.friend);

    useAutoRefreshToken('/home/');

    const sencondaryNav = [
        {
            title: 'Bạn bè',
            icon: <HiMiniUsers />,
            path: '/friends',
        },
        {
            title: 'Tin nhắn',
            icon: <BsMessenger />,
            path: '/message',
        },
        {
            title: 'Người dùng gần đây',
            icon: <PiUsersThree />,
            path: '/surrounding-users',
        },
        {
            title: 'Sự kiện',
            icon: <MdEvent />,
            path: '/events',
        },
    ];
    // Get homepage posts

    useEffect(() => {
        getHomePagePosts({ limit: 5, page: page })
            .unwrap()
            .then((res) => {
                setPagination(res.pagination);
            });
    }, [page]);

    // Get suggested adnd friends
    useEffect(() => {
        dispatch(resetFriends());
        dispatch(resetSuggestedFriends());
        dispatch(resetFollowers());
        const fetchUsersAndFriends = async () => {
            try {
                await getSuggestedUsers({ limit: 10, page: 1 }).unwrap();
                await getAllFriends({ userId: user._id, limit: 10, page: 1 }).unwrap();
                await getAllFollowedFacilities({ limit: 8, page: 1 }).unwrap();
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchUsersAndFriends();
    }, [getSuggestedUsers, getAllFriends]);

    useEffect(() => {
        dispatch(resetHomePagePosts());
    }, [dispatch]);

    useEffect(() => {
        if (pagination?.links.next) {
            setHasMore(true);
        } else {
            setHasMore(false);
        }
    }, [pagination]);

    const showModal = () => {
        setIsShowingModal(true);
    };
    const hideModal = () => {
        setIsShowingModal(false);
    };

    return (
        user && (
            <>
                {/* Header */}
                <NavMenu />
                {/* Body */}
                <div className="flex sm:justify-between xs:mt-[96px] md:mt-[50px] bg-[#f0f2f5] ">
                    {/* Sidebar left */}
                    <div className=" lg:block xs:hidden w-[360px] ">
                        <div className="lg:block xs:hidden w-[360px] h-screen py-3 fixed left-0 top-[56px] bg-[#f0f2f5]">
                            <div className="pl-2 grid">
                                <Link
                                    className="flex items-center hover:bg-[#ebedf0] pl-2 py-1.5 rounded-l-md"
                                    to={`/user/${user._id}`}
                                >
                                    <div>
                                        <Avatar
                                            className="w-9 h-9 rounded-[50%] border border-[#ccc]"
                                            src={user.avatar}
                                            alt="avatar"
                                        />
                                    </div>
                                    <div className="ml-2">
                                        <p className="text-[14px] font-semibold leading-[14px]">{user.username}</p>
                                    </div>
                                </Link>
                                {sencondaryNav.map((nav, index) => {
                                    return (
                                        <Link
                                            key={index}
                                            className="flex items-center hover:bg-[#ebedf0] pl-2 py-1.5 rounded-l-md"
                                            to={nav.path}
                                        >
                                            <div className="w-9 h-9 rounded-[50%] flex-center text-[20px]">
                                                {nav.icon}
                                            </div>
                                            <div className="ml-2">
                                                <p className="text-[14px] font-semibold leading-[14px]">{nav.title}</p>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                            {isLoadingAllFollowers ? (
                                <UserFriendLoading />
                            ) : (
                                followers.length > 0 && (
                                    <div className="py-2 border-t border-t-[#ccc] pl-2 grid">
                                        <div className="pl-4">
                                            <Link className="font-semibold text-[15px] text-[#65676B]" to={'/friends'}>
                                                Cơ sở y tế đang theo dõi
                                            </Link>
                                        </div>

                                        <div className=" py-2 pl-2 grid">
                                            {followers.map((follower, index) => {
                                                return (
                                                    <Link
                                                        key={index}
                                                        className="flex items-center hover:bg-[#ebedf0] pl-2 py-1.5 rounded-md"
                                                        to={`/user/${follower._id}`}
                                                    >
                                                        <div>
                                                            <Avatar
                                                                className="w-9 h-9 rounded-[50%] border border-[#ccc]"
                                                                src={follower.avatar}
                                                                alt="avatar"
                                                            />
                                                        </div>
                                                        <div className="ml-2">
                                                            <p className="text-[14px] font-semibold leading-[14px]">
                                                                {follower.username}
                                                            </p>
                                                        </div>
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="w-full md:max-w-[calc(100vw_-_240px)] lg:max-w-[calc(100vw-_720px)] flex min-h-screen flex-col items-center py-3 sm:px-4  ">
                        {/* Div create post */}
                        <div className="py-2 px-3 bg-white rounded-[8px] shadow h-fit  w-full ">
                            <div className="flex border-b-[1px] border-b-[#ccc] pb-2">
                                <div>
                                    <Avatar className="w-9 h-9 rounded-[50%]" src={user.avatar} alt="avatar" />
                                </div>
                                <div
                                    className="flex-grow ml-3 flex items-center bg-[#f0f2f5] rounded-[16px] px-3 py-1 cursor-pointer"
                                    onClick={showModal}
                                >
                                    <span className="text-[#65676B]">
                                        {getLastName(user.username) + ' ơi, bạn đang nghĩ gì thế?'}
                                    </span>
                                </div>
                            </div>
                            <div className="flex py-1">
                                <div
                                    className="flex-center w-[100%] cursor-pointer rounded-lg hover:bg-[#f0f2f5] py-1.5"
                                    onClick={showModal}
                                >
                                    <GoPlusCircle />
                                    <span className="ml-1 font-semibold text-[15px] text-[#65676B]">
                                        Tạo bài viết mới
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* List posts */}
                        <div className="h-fit xs:w-full lg::max-w-[590px] w-full mt-3">
                            {homePagePosts ? (
                                <InfiniteScroll
                                    dataLength={homePagePosts.length}
                                    next={() => {
                                        setPage((prev) => prev + 1);
                                    }}
                                    endMessage={
                                        <div className="text-center text-[#65676B] py-4">
                                            <b>🎉 Bạn đã xem hết tất cả các bài viết ngày hôm nay</b>
                                        </div>
                                    }
                                    hasMore={hasMore}
                                    loader={<PostLoading />}
                                    scrollThreshold="5px"
                                >
                                    {homePagePosts.map((post, index) => {
                                        return <Post key={index} postData={post} />;
                                    })}
                                </InfiniteScroll>
                            ) : (
                                <PostLoading />
                            )}
                        </div>
                    </div>

                    {/* Sidebar right */}
                    <div className="xs:hidden h-screen  md:block sm:w-[240px] lg:w-[360px]">
                        <div className="xs:hidden sm:block sm:w-[240px] lg:w-[360px] hide-scrollbar  show-scrollbar-on-hover overflow-y-scroll h-screen  py-3 fixed top-[56px] right-0  bg-[#f0f2f5]">
                            {/* List người dùng gợi ý */}
                            <div className="pb-1 pt-2 ">
                                <div className="pl-4">
                                    <Link className="font-semibold text-[15px] text-[#65676B]" to={'/friends/suggests'}>
                                        Gợi ý cho bạn
                                    </Link>
                                </div>
                                <div className=" py-2 pl-2 grid">
                                    {isLoadingSuggestedUsers ? (
                                        <UserSuggestLoading />
                                    ) : (
                                        suggestedFriends.map((suggestedFriend, index) => {
                                            return (
                                                <Link
                                                    className="flex items-center hover:bg-[#ebedf0] pl-2 py-1.5 rounded-md"
                                                    key={index}
                                                    to={`/user/${suggestedFriend._id}`}
                                                >
                                                    <div>
                                                        <Avatar
                                                            className="w-9 h-9 rounded-[50%] border border-[#ccc]"
                                                            src={suggestedFriend.avatar}
                                                            alt="avatar"
                                                        />
                                                    </div>
                                                    <div className="ml-2">
                                                        <p className="text-[14px] font-semibold leading-[12px]">
                                                            {suggestedFriend.username}
                                                        </p>
                                                        <span className="text-[11px] text-[#65676B]">
                                                            Gợi ý cho bạn
                                                        </span>
                                                    </div>
                                                </Link>
                                            );
                                        })
                                    )}
                                </div>
                            </div>
                            {/* List bạn bè  */}

                            {isLoadingAllFriends ? (
                                <UserFriendLoading />
                            ) : (
                                friends.length > 0 && (
                                    <div className="py-2 border-t border-t-[#ccc]">
                                        <div className="pl-4">
                                            <Link className="font-semibold text-[15px] text-[#65676B]" to={'/friends'}>
                                                Bạn bè
                                            </Link>
                                        </div>

                                        <div className=" py-2 pl-2 grid">
                                            {friends.map((friend, index) => {
                                                return (
                                                    <Link
                                                        className="flex items-center hover:bg-[#ebedf0] pl-2 py-1.5 rounded-md"
                                                        to={`/user/${friend._id}`}
                                                        key={index}
                                                    >
                                                        <div>
                                                            <Avatar
                                                                className="w-9 h-9 rounded-[50%] border border-[#ccc]"
                                                                src={friend.avatar}
                                                                alt="avatar"
                                                            />
                                                        </div>
                                                        <div className="ml-2">
                                                            <p className="text-[14px] font-semibold leading-[14px]">
                                                                {friend.username}
                                                            </p>
                                                        </div>
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
                <ModalWrapper isShowing={isShowingModal}>
                    <CreatePost hideModal={hideModal} />
                </ModalWrapper>
            </>
        )
    );
};

export default HomePage;
