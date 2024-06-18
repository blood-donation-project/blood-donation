import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useParams } from 'react-router-dom';

import { FaPen, FaUserCheck, FaUserTimes } from 'react-icons/fa';
import { FaFacebookMessenger } from 'react-icons/fa6';
import { IoPersonAdd } from 'react-icons/io5';
import { FaHeartCircleMinus, FaHeartCirclePlus, FaHeartCircleCheck } from 'react-icons/fa6';

import Image from '../Image/Image';
import Avatar from '../Image/Avatar';
import ModalWrapper from '../Modal/ModalWrapper';
import ViewPhoto from '../Modal/ModalContent/ViewPhoto';
import UpdateProfile from '../Modal/ModalContent/UpdateProfile';
import { useGetUserByIdMutation } from '../../Redux/features/user/userAPI';

import { resetFriends } from '../../Redux/features/friend/friendSlice';
import { useDispatch, useSelector } from 'react-redux';

import Skeleton from 'react-loading-skeleton';
import axios from 'axios';
import { IoMdPersonAdd } from 'react-icons/io';
import {
    useAcceptFriendRequestMutation,
    useCancelFriendRequestMutation,
    useFollowMutation,
    useRejectFriendRequestMutation,
    useSendFriendRequestMutation,
    useUnfollowMutation,
    useUnfriendMutation,
} from '../../Redux/features/friend/friendAPI';
import { updateOtherUser } from '../../Redux/features/user/userSlice';

const ProfileOverview = () => {
    const location = useLocation();
    const pathName = location.pathname.split('/')[3] || '';
    const dispatch = useDispatch();
    const params = useParams();
    const { user, otherUser } = useSelector((state) => state.user);

    const [getUserById] = useGetUserByIdMutation();
    const [follow] = useFollowMutation();
    const [unfollow] = useUnfollowMutation();
    const [sendFriendRequest] = useSendFriendRequestMutation();
    const [acceptFriendRequest] = useAcceptFriendRequestMutation();
    const [cancelFriendRequest] = useCancelFriendRequestMutation();
    const [rejectFriendRequest] = useRejectFriendRequestMutation();
    const [unfriend] = useUnfriendMutation();

    const [image, setImage] = useState('');
    const [isShowingViewImageAVTModal, setIsShowingViewImageAVTModal] = useState(false);
    const [isShowingUpdateProfileModal, setIsShowingUpdateProfieModal] = useState(false);
    const [friends, setFriends] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingOtherUser, setIsLoadingOtherUser] = useState(true);

    useEffect(() => {
        dispatch(resetFriends());
        const accessToken = localStorage.getItem('accessToken');
        axios
            .get('http://localhost:3001/api/friends', {
                params: {
                    userId: params.id,
                    limit: 9,
                    page: 1,
                },
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((res) => {
                setFriends(res.data);
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        const userId = params.id;
        const fetchUserData = async () => {
            try {
                await getUserById(userId).unwrap();

                setIsLoadingOtherUser(false);
            } catch (error) {
                setIsLoadingOtherUser(false);
                // console.log(error);
            }
        };
        fetchUserData();
    }, [getUserById, params.id]);
    const handleAcceptFriend = () => {
        acceptFriendRequest({ requestId: otherUser.friendRequest._id })
            .unwrap()
            .then((res) => {
                dispatch(updateOtherUser(res));
            });
    };

    const handleUnFriend = () => {
        unfriend({ friendId: otherUser._id })
            .unwrap()
            .then((res) => {
                dispatch(updateOtherUser(res));
            });
    };

    const handleRejectFriend = () => {
        rejectFriendRequest({ requestId: otherUser.friendRequest._id })
            .unwrap()
            .then((res) => {
                dispatch(updateOtherUser(res));
            });
    };

    const handleSendFriend = () => {
        sendFriendRequest({ receiverId: params.id })
            .unwrap()
            .then((res) => {
                dispatch(updateOtherUser(res));
            });
    };

    const handleCancelFriend = () => {
        cancelFriendRequest({ receiverId: params.id })
            .unwrap()
            .then((res) => {
                dispatch(updateOtherUser(res));
            });
    };

    const handleFollow = () => {
        follow({ receiverId: params.id })
            .unwrap()
            .then((res) => {
                dispatch(updateOtherUser(res));
            });
    };

    const handleUnfollow = () => {
        unfollow({ receiverId: params.id })
            .unwrap()
            .then((res) => {
                dispatch(updateOtherUser(res));
            });
    };

    const showViewImageModal = (img) => {
        setImage(img);

        setIsShowingViewImageAVTModal(true);
    };

    const hideViewImageModal = () => {
        setIsShowingViewImageAVTModal(false);
    };

    const showUpdateProfileModal = () => {
        setIsShowingUpdateProfieModal(true);
    };

    const hideUpdateProfileModal = () => {
        setIsShowingUpdateProfieModal(false);
    };

    const navProfileLinks = [
        {
            path: `/user/${otherUser?._id}/`,

            title: 'Bài viết',
            lastPath: '',
        },
        {
            path: `/user/${otherUser?._id}/about`,

            title: 'Giới thiệu',
            lastPath: 'about',
        },
        {
            path: `/user/${otherUser?._id}/friends`,
            title: `${otherUser?.role === 'Cơ sở y tế' ? 'Người theo dõi' : 'Bạn bè'}`,
            lastPath: 'friends',
        },
        {
            path: `/user/${otherUser?._id}/photos`,

            title: 'Ảnh',
            lastPath: 'photos',
        },
    ];

    return (
        !isLoadingOtherUser && (
            <div className="rounded-[14px] overflow-hidden ">
                {/* Background Image */}
                <div
                    className="h-[460px]"
                    onClick={() => {
                        showViewImageModal(otherUser?.backgroundImage);
                    }}
                >
                    <Image
                        src={otherUser?.backgroundImage}
                        className="w-full h-full object-cover cursor-pointer"
                        alt="background"
                    />
                </div>

                <div className=" bg-white flex xs:flex-col md:flex-row justify-between p-[14px]">
                    {/* Avatar */}
                    <div className="xs:flex-col xs:items-center md:flex-row flex">
                        <div>
                            <div
                                className=" w-[144px] h-[144px] rounded-[50%] overflow-hidden border-[3px] dark:border-darkBackground-300 mt-[-50px] cursor-pointer "
                                onClick={() => {
                                    showViewImageModal(otherUser.avatar);
                                }}
                            >
                                <Avatar src={otherUser.avatar} className="w-[144px] h-[144px]" alt="avatar" />
                            </div>
                        </div>
                        <div className="ml-[12px] xs:flex md:block xs:flex-col xs:items-center">
                            <div className="flex-center ">
                                <h3 className="text-[24px] font-semibold leading-[24px] ">{otherUser.username}</h3>
                            </div>
                            {isLoading ? (
                                <div>
                                    <Skeleton width={150} />
                                    <Skeleton width={60} />
                                </div>
                            ) : (
                                <div>
                                    <div className="">
                                        {otherUser.role === 'Cơ sở y tế' ? (
                                            <h3 className="text-[12px] font-semibold text-[#65676B] mt-1 ">
                                                {friends.pagination.totalCounts} Người theo dõi
                                            </h3>
                                        ) : (
                                            <h3 className="text-[12px] font-semibold text-[#65676B] mt-1 ">
                                                {friends.pagination.totalCounts} Bạn bè
                                            </h3>
                                        )}
                                    </div>
                                    <div className="flex tyn-media-multiple mt-1">
                                        {friends.data.map((friend, index) => {
                                            return (
                                                <div
                                                    className="tyn-media-multiple w-[34px] h-[34px] rounded-[50%] overflow-hidden border-[2px] dark:border-darkBackground-300 "
                                                    key={index}
                                                >
                                                    <Avatar src={friend.avatar} className="" alt="avatar" />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    {/*  */}
                    {user.role === 'Cơ sở y tế' ? (
                        <div className="xs:mt-3 xs:justify-center md:justify-start md:mt-0 flex items-center">
                            {/* Handle User */}
                            {otherUser._id === user._id ? (
                                <button
                                    className="bg-[#e4e6eb] hover:bg-[#d8d8d8] mr-2 flex-center rounded-[6px] px-2 py-1"
                                    onClick={showUpdateProfileModal}
                                >
                                    <FaPen className="mr-2" />
                                    Chỉnh sửa trang cá nhân
                                </button>
                            ) : otherUser.role === 'Cơ sở y tế' ? (
                                otherUser.isFollowed ? (
                                    <div className="flex">
                                        <button
                                            className="flex-center  py-1 mr-2 px-2 bg-[#f0f2f5]  rounded-[4px] hover:bg-[#d2d2d2] "
                                            onClick={handleUnfollow}
                                        >
                                            <FaHeartCircleMinus />
                                            <span className="ml-2">Bỏ theo dõi</span>
                                        </button>
                                        <button className="flex-center  py-1 mr-2 px-2 bg-[#f0f2f5] border border-[#ccc] rounded-[4px] hover:bg-[#d2d2d2] ">
                                            <FaHeartCircleCheck />
                                            <span className="ml-2">Đang theo dõi</span>
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        className="flex-center  py-1 mr-2 px-2 bg-[#f0f2f5] rounded-[4px] hover:bg-[#d2d2d2] "
                                        onClick={handleFollow}
                                    >
                                        <FaHeartCirclePlus />
                                        <span className="ml-2">Theo dõi</span>
                                    </button>
                                )
                            ) : (
                                <></>
                            )}
                            <Link
                                className="flex-center px-2 py-1 bg-[#386fd6] rounded-[4px] text-white hover:bg-[#1c5291]"
                                to={`/message/${otherUser?._id}`}
                            >
                                <FaFacebookMessenger />
                                <span className="ml-2">Nhắn tin</span>
                            </Link>
                        </div>
                    ) : (
                        <div className="xs:mt-3 xs:justify-center md:justify-start md:mt-0 flex items-center">
                            {/* Handle User */}
                            {otherUser._id === user._id ? (
                                <button
                                    className="bg-[#e4e6eb] hover:bg-[#d8d8d8] mr-2 flex-center rounded-[6px] px-2 py-1"
                                    onClick={showUpdateProfileModal}
                                >
                                    <FaPen className="mr-2" />
                                    Chỉnh sửa trang cá nhân
                                </button>
                            ) : otherUser.role === 'Cơ sở y tế' ? (
                                otherUser.isFollowed ? (
                                    <div className="flex">
                                        <button
                                            className="flex-center  py-1 mr-2 px-2 bg-[#f0f2f5]  rounded-[4px] hover:bg-[#d2d2d2] "
                                            onClick={handleUnfollow}
                                        >
                                            <FaHeartCircleMinus />
                                            <span className="ml-2">Bỏ theo dõi</span>
                                        </button>
                                        <button className="flex-center  py-1 mr-2 px-2 bg-[#f0f2f5] border border-[#ccc] rounded-[4px] hover:bg-[#d2d2d2] ">
                                            <FaHeartCircleCheck />
                                            <span className="ml-2">Đang theo dõi</span>
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        className="flex-center  py-1 mr-2 px-2 bg-[#f0f2f5] rounded-[4px] hover:bg-[#d2d2d2] "
                                        onClick={handleFollow}
                                    >
                                        <FaHeartCirclePlus />
                                        <span className="ml-2">Theo dõi</span>
                                    </button>
                                )
                            ) : (
                                <div className="flex justify-between ">
                                    {otherUser.isFriend ? (
                                        <div className="flex">
                                            <div
                                                className="flex-center px-2 mr-2 py-1 bg-[#f0f2f5] rounded-[4px] hover:bg-[#d2d2d2] "
                                                onClick={handleUnFriend}
                                            >
                                                <FaUserTimes />
                                                <span className="ml-2">Hủy kết bạn</span>
                                            </div>
                                            <div
                                                className="flex-center px-2 mr-2 py-1 border border-[#ccc] bg-[#f0f2f5] rounded-[4px] hover:bg-[#d2d2d2] "
                                                to={`/user/${otherUser?._id}`}
                                            >
                                                <FaUserCheck />
                                                <span className="ml-2">Bạn bè</span>
                                            </div>
                                        </div>
                                    ) : otherUser.friendRequest && otherUser.friendRequest.status === 'pending' ? (
                                        otherUser.friendRequest.senderId === otherUser._id ? (
                                            <div className="flex justify-between">
                                                <button
                                                    className="flex-center px-2 mr-2 py-1 bg-[#f0f2f5] rounded-[4px] hover:bg-[#d2d2d2] "
                                                    onClick={handleRejectFriend}
                                                >
                                                    <FaUserTimes />
                                                    <span className="ml-2">Từ chối</span>
                                                </button>
                                                <Link
                                                    className="flex-center px-2 mr-2 py-1 bg-[#386fd6] rounded-[4px] text-white hover:bg-[#1c5291] "
                                                    onClick={handleAcceptFriend}
                                                >
                                                    <FaUserCheck />
                                                    <span className="ml-2">Đồng ý</span>
                                                </Link>
                                            </div>
                                        ) : (
                                            <button
                                                className="flex-center px-2 mr-2 py-1 bg-[#f0f2f5] rounded-[4px] hover:bg-[#d2d2d2] "
                                                onClick={handleCancelFriend}
                                            >
                                                <FaUserTimes />
                                                <span className="ml-2">Hủy lời mời</span>
                                            </button>
                                        )
                                    ) : (
                                        <button
                                            className="flex-center px-2 mr-2 py-1 bg-[#f0f2f5] rounded-[4px] hover:bg-[#d2d2d2] "
                                            onClick={handleSendFriend}
                                        >
                                            <IoMdPersonAdd />
                                            <span className="ml-2">Thêm bạn bè</span>
                                        </button>
                                    )}
                                </div>
                            )}
                            <Link
                                className="flex-center px-2 py-1 bg-[#386fd6] rounded-[4px] text-white hover:bg-[#1c5291]"
                                to={`/message/${otherUser?._id}`}
                            >
                                <FaFacebookMessenger />
                                <span className="ml-2">Nhắn tin</span>
                            </Link>
                        </div>
                    )}
                </div>

                <div className="border-t border-[#ccc] px-5">
                    <div className="flex">
                        {navProfileLinks.map((nav, i) => {
                            return (
                                <NavLink
                                    className={
                                        pathName === nav.lastPath
                                            ? ' flex justify-center items-center border-b-[4px] border-b-[#386fd6] py-2.5 px-3 '
                                            : ' flex justify-center items-center  hover:bg-[#d2d2d2] rounded-[8px] py-2.5 px-3'
                                    }
                                    key={i}
                                    to={nav.path}
                                >
                                    <span
                                        className={
                                            pathName === nav.lastPath
                                                ? 'text-[#386fd6] font-semibold'
                                                : 'text-[#65676B] font-semibold'
                                        }
                                    >
                                        {nav.title}
                                    </span>
                                </NavLink>
                            );
                        })}
                    </div>
                </div>
                <ModalWrapper
                    hideModal={hideViewImageModal}
                    isShowing={isShowingViewImageAVTModal}
                    bgrColor="bg-[rgba(255,255,255,0.9)]"
                >
                    <ViewPhoto hideModal={hideViewImageModal} srcImage={image} />
                </ModalWrapper>

                <ModalWrapper
                    hideModal={hideUpdateProfileModal}
                    isShowing={isShowingUpdateProfileModal}
                    bgrColor="bg-[rgba(255,255,255,0.9)]"
                >
                    <UpdateProfile hideModal={hideUpdateProfileModal} />
                </ModalWrapper>
            </div>
        )
    );
};

export default ProfileOverview;
