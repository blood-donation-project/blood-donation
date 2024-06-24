import { useState, useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import UserProfileFriend from '../../components/User/UserFriendProfile';
import { MdInsertEmoticon } from 'react-icons/md';
import { IoMdImages } from 'react-icons/io';

import NavMenu from '../../components/NavMenu';
import ProfileOverview from '../../components/Profile/ProfileOverview';
import ModalWrapper from '../../components/Modal/ModalWrapper';
import Avatar from '../../components/Image/Avatar';
import CreatePost from '../../components/Modal/ModalContent/CreatePost';
import Post from '../../components/Post/Post';
import ViewPhoto from '../../components/Modal/ModalContent/ViewPhoto';
import PostLoading from '../../components/LoadingSkeleton/Post/PostLoading';

import { resetProfilePosts, resetProfilePostsPendingApproval } from '../../Redux/features/post/postSlice';
import {
    useGetPostsByUserIdMutation,
    useGetPostsPendingApprovalByUserIdMutation,
} from '../../Redux/features/post/postAPI';
import { useGetAllFriendsMutation } from '../../Redux/features/friend/friendAPI';
import { useGetPhotosMutation } from '../../Redux/features/user/userAPI';
import { resetPhotos } from '../../Redux/features/user/userSlice';
import { resetFriends } from '../../Redux/features/friend/friendSlice';
import Skeleton from 'react-loading-skeleton';
import UserFriendProfile from '../../components/User/UserFriendProfile';
import getLastName from '../../utils/getLastName';
import InfiniteScroll from 'react-infinite-scroll-component';
import { GoPlusCircle } from 'react-icons/go';
import PostPendingApproval from '../../components/Post/PostPendingApproval';
import { useAutoRefreshToken } from '../../hooks/useAutoRefreshToken';

const ProfilePage = () => {
    const divRef = useRef(null);
    const dispatch = useDispatch();
    const { id } = useParams();
    const { user, otherUser, photos } = useSelector((state) => state.user);

    const [isShowingCreatePostModal, setIsShowingCreatePostModal] = useState(false);
    const [isShowingViewImageModal, setIsShowingViewImageModal] = useState(false);

    const [divHeight, setDivHeight] = useState(0);
    const [activeId, setActiveId] = useState('1');
    const [pagination, setPagination] = useState();
    const [hasMore, setHasMore] = useState(false);
    const [image, setImage] = useState('');
    const [tokenRefreshed, setTokenRefreshed] = useState(false);
    useAutoRefreshToken('/home/', setTokenRefreshed);

    const { profilePosts, profilePostsPendingApproval } = useSelector((state) => state.posts);
    const { friends } = useSelector((state) => state.friend);

    const [getPostsByUserId, { isLoading: isLoadingPosts }] = useGetPostsByUserIdMutation();
    const [getPostsPendingApprovalByUserId, { isLoading: isLoadingPostsPendingApproval }] =
        useGetPostsPendingApprovalByUserIdMutation();
    const [getAllFriends, { isLoading: isLoadingFriends }] = useGetAllFriendsMutation();
    const [getPhotos, { isLoading: isLoadingPhotos }] = useGetPhotosMutation();

    // Posts approved
    const fetchProfilePosts = async (page) => {
        await getPostsByUserId({
            userId: id,
            limit: 5,
            page: page || 1,
        })
            .unwrap()
            .then((res) => {
                setPagination(res.pagination);
            });
    };

    // Posts pending approval
    const fetchProfilePostsApproval = async (page) => {
        await getPostsPendingApprovalByUserId({
            userId: id,
            limit: 5,
            page: page || 1,
        })
            .unwrap()
            .then((res) => {
                setPagination(res.pagination);
            });
    };

    useEffect(() => {
        if (tokenRefreshed) {
            if (activeId === '1') {
                dispatch(resetProfilePosts());
                fetchProfilePosts();
            } else {
                dispatch(resetProfilePostsPendingApproval());
                fetchProfilePostsApproval();
            }
        }
    }, [activeId, id, tokenRefreshed]);

    // Friends and photos
    useEffect(() => {
        dispatch(resetPhotos());
        dispatch(resetFriends());

        if (tokenRefreshed) {
            getAllFriends({ userId: id, limit: 9, page: 1 }).unwrap();
            getPhotos({ userId: id, limit: 9, page: 1 }).unwrap();
        }
    }, [id, tokenRefreshed]);

    useEffect(() => {
        if (divRef.current) {
            setDivHeight(divRef.current.offsetHeight);
        }
    }, [id]);

    useEffect(() => {
        if (pagination?.links.next) {
            setHasMore(true);
        } else {
            setHasMore(false);
        }
    }, [pagination]);

    const handleDivClick = (e) => {
        const dataId = e.currentTarget.getAttribute('data-id');
        setActiveId(dataId);
    };

    const showCreatePostModal = () => {
        setIsShowingCreatePostModal(true);
    };

    const hideCreatePostModal = () => {
        setIsShowingCreatePostModal(false);
    };

    const showViewImageModal = (img) => {
        setImage(img);

        setIsShowingViewImageModal(true);
    };

    const hideViewImageModal = () => {
        setIsShowingViewImageModal(false);
    };

    let height;
    if (divHeight / window.innerHeight > 1) {
        height = Math.round((divHeight / window.innerHeight - 1) * window.innerHeight + 44) * -1;
    } else {
        if (divHeight + 100 < window.innerHeight) {
            height = 56;
        } else {
            height = window.innerHeight + 44 - divHeight;
        }
    }

    return (
        <div className="w-full">
            {/*  */}
            {otherUser && (
                <div className="bg-gray-200 pt-4 pb-10 ">
                    <div className="max-w-[1150px] mx-auto md:px-4">
                        <div className="flex xs:flex-col md:flex-row justify-between ">
                            {/* Content left */}
                            <div
                                className={` xs:w-[100%] md:w-[39%] md:px-3  h-fit  md:sticky `}
                                style={{ top: `${height}px` }}
                                ref={divRef}
                            >
                                {/* List Photos */}
                                <div className="bg-white  px-4 py-2 md:rounded-lg mb-3">
                                    <div className="flex justify-between py-1.5">
                                        <h3 className="font-bold">Ảnh</h3>
                                        <Link
                                            className="text-[#386fd6] hover:bg-[#ebedf0] px-1 rounded-[4px]"
                                            to={`/user/${otherUser._id}/photos`}
                                        >
                                            Xem tất cả ảnh
                                        </Link>
                                    </div>
                                    {/* Map photo data here */}
                                    <div className="rounded-[8px] overflow-hidden grid grid-cols-3  gap-1">
                                        {isLoadingPhotos ? (
                                            <div className=" aspect-square cursor-pointer" onClick={showViewImageModal}>
                                                <Skeleton className="w-full h-full" />
                                            </div>
                                        ) : (
                                            photos.map((photo, index) => {
                                                return (
                                                    <div
                                                        className=" aspect-square cursor-pointer"
                                                        onClick={() => {
                                                            showViewImageModal(photo);
                                                        }}
                                                        key={index}
                                                    >
                                                        <Avatar
                                                            className=" object-cover w-full h-full"
                                                            src={photo}
                                                            alt=""
                                                        />
                                                    </div>
                                                );
                                            })
                                        )}
                                    </div>
                                </div>

                                {/* List Friends */}
                                <div className="bg-white  px-4 py-2 md:rounded-lg mb-3">
                                    <div className="flex justify-between py-1.5">
                                        {otherUser.role === 'Cơ sở y tế' ? (
                                            <h3 className="font-bold">Người theo dõi</h3>
                                        ) : (
                                            <h3 className="font-bold">Bạn bè</h3>
                                        )}
                                        <Link
                                            className="text-[#386fd6] hover:bg-[#ebedf0] px-1 rounded-[4px]"
                                            to={`/user/${otherUser._id}/friends`}
                                        >
                                            Xem tất cả {otherUser.role === 'Cơ sở y tế' ? ' người theo dõi' : ' bạn bè'}
                                        </Link>
                                    </div>
                                    {/* Map  friends data here */}
                                    <div className="rounded-[8px] grid grid-cols-3 gap-1 ">
                                        {isLoadingFriends ? (
                                            <div className=" aspect-square cursor-pointer">
                                                <Skeleton className="w-full h-full" />
                                            </div>
                                        ) : (
                                            friends.map((friend, index) => {
                                                return (
                                                    <div className=" aspect-square cursor-pointer" key={index}>
                                                        <UserFriendProfile friendData={friend} />
                                                    </div>
                                                );
                                            })
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Content right */}
                            <div className="xs:w-[100%] md:w-[60%]  md:px-4 ">
                                {otherUser._id === user._id && (
                                    <div className="w-full">
                                        {/*  */}
                                        <div className="py-2 px-3  md:rounded-[8px] shadow h-fit  w-full bg-white  ">
                                            <div className="flex border-b-[1px] border-b-[#ccc] pb-2">
                                                <Avatar
                                                    className="w-9 h-9 rounded-[50%]"
                                                    src={user.avatar}
                                                    alt="avatar"
                                                />
                                                <div
                                                    className="w-full ml-3 flex items-center bg-[#f0f2f5] rounded-[16px] px-3 py-1 cursor-pointer"
                                                    onClick={showCreatePostModal}
                                                >
                                                    <span className="text-[#65676B]">
                                                        {getLastName(user.username)} ơi, bạn đang nghĩ gì thế?
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex py-1">
                                                <div
                                                    className="flex-center w-[100%] cursor-pointer rounded-lg hover:bg-[#f0f2f5] py-1.5"
                                                    onClick={showCreatePostModal}
                                                >
                                                    <GoPlusCircle />
                                                    <span className="ml-1 font-semibold text-[15px] text-[#65676B]">
                                                        Tạo bài viết mới
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        {/*  */}
                                        <div className="pt-2 px-3 mt-3 md:rounded-[8px] shadow h-fit  w-full bg-white  ">
                                            <div className="flex border-b-[1px] border-b-[#ccc] pb-2">
                                                <h3 className="text-[22px] font-semibold">Bài viết</h3>
                                            </div>
                                            <div className="flex ">
                                                <div
                                                    className={`border-b-[3px] py-2 w-[50%] flex-center cursor-pointer font-semibold ${activeId === '1' ? 'font-semibold text-[#386fd6] border-b-[#386fd6]' : 'border-b-transparent text-[#65676B]'}`}
                                                    onClick={handleDivClick}
                                                    data-id="1"
                                                >
                                                    <span>Tất cả bài viết</span>
                                                </div>
                                                <div
                                                    className={`border-b-[3px] py-2 w-[50%] flex-center cursor-pointer font-semibold ${activeId === '2' ? 'font-semibold text-[#386fd6] border-b-[#386fd6]' : 'border-b-transparent text-[#65676B]'}`}
                                                    onClick={handleDivClick}
                                                    data-id="2"
                                                >
                                                    <span>Đang chờ duyệt</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {activeId === '1' ? (
                                    <div className="h-fit  w-full mt-3">
                                        {isLoadingPosts ? (
                                            <PostLoading />
                                        ) : (
                                            <InfiniteScroll
                                                dataLength={profilePosts.length}
                                                next={() => {
                                                    fetchProfilePosts(pagination.currentPage + 1);
                                                }}
                                                hasMore={hasMore}
                                                loader={<PostLoading />}
                                                scrollThreshold="5px"
                                            >
                                                {profilePosts.map((post, index) => {
                                                    return <Post key={index} postData={post} />;
                                                })}
                                            </InfiniteScroll>
                                        )}
                                        {!isLoadingPosts && profilePosts.length === 0 && (
                                            <div className="flex-center">
                                                <span className="py-2 text-[#65676B]">
                                                    Hiện người dùng chưa đăng tải bài viết nào
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="h-fit  w-full mt-3">
                                        {isLoadingPostsPendingApproval ? (
                                            <PostLoading />
                                        ) : (
                                            <InfiniteScroll
                                                dataLength={profilePosts.length}
                                                next={() => {
                                                    fetchProfilePostsApproval(pagination.currentPage + 1);
                                                }}
                                                hasMore={hasMore}
                                                loader={<PostLoading />}
                                                scrollThreshold="5px"
                                            >
                                                {profilePostsPendingApproval.map((post, index) => {
                                                    return <PostPendingApproval key={index} postData={post} />;
                                                })}
                                            </InfiniteScroll>
                                        )}
                                        {!isLoadingPostsPendingApproval && profilePostsPendingApproval.length === 0 && (
                                            <div className="flex-center">
                                                <span className="py-2 text-[#65676B]">
                                                    Hiện không có bài nào chờ duyệt
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <ModalWrapper hideModal={hideCreatePostModal} isShowing={isShowingCreatePostModal}>
                <CreatePost hideModal={hideCreatePostModal} />
            </ModalWrapper>
            <ModalWrapper
                hideModal={hideViewImageModal}
                isShowing={isShowingViewImageModal}
                bgrColor="bg-[rgba(255,255,255,0.9)]"
            >
                <ViewPhoto hideModal={hideViewImageModal} srcImage={image} />
            </ModalWrapper>
        </div>
    );
};

export default ProfilePage;
