import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { FaLocationDot, FaFacebookMessenger, FaHeartCircleCheck, FaHeartCirclePlus } from 'react-icons/fa6';
import { FaUser, FaUserCheck, FaUserTimes } from 'react-icons/fa';

import { IoMdPersonAdd } from 'react-icons/io';
import { MdBloodtype } from 'react-icons/md';
import { LuUserPlus } from 'react-icons/lu';

import Avatar from '../Image/Avatar';

import {
    useCancelFriendRequestMutation,
    useFollowMutation,
    useSendFriendRequestMutation,
} from '../../Redux/features/friend/friendAPI';
import { updateAuthorPosts } from '../../Redux/features/post/postSlice';
import { updateOtherUser } from '../../Redux/features/user/userSlice';

const UserPreview = ({ userData }) => {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [cancelFriendRequest] = useCancelFriendRequestMutation();
    const [sendFriendRequest] = useSendFriendRequestMutation();
    const [follow] = useFollowMutation();

    const handleSendFriendRequest = () => {
        sendFriendRequest({ receiverId: userData._id })
            .unwrap()
            .then((res) => {
                dispatch(updateAuthorPosts(res));
            });
    };
    const handleCancelFriendRequest = () => {
        cancelFriendRequest({ receiverId: userData._id })
            .unwrap()
            .then((res) => {
                dispatch(updateAuthorPosts(res));
            });
    };

    const handleFollow = () => {
        follow({ receiverId: userData._id })
            .unwrap()
            .then((res) => {
                dispatch(updateOtherUser(res));
                dispatch(updateAuthorPosts(res));
            });
    };

    return (
        <div className="p-4">
            <div className="flex">
                <Link to={`/user/${userData._id}`}>
                    <Avatar
                        className=" w-20  h-20 rounded-[50%] border border-[#ccc]"
                        src={userData.avatar}
                        alt="avatar"
                    />
                </Link>
                <div className="ml-2">
                    <Link className="text-[18px] font-bold " to={`/user/${userData._id}`}>
                        {userData.username}
                    </Link>
                    <div className="flex items-center text-[#65676B] text-[15px]">
                        <div className="w-[20px]">
                            <MdBloodtype />
                        </div>
                        <span className="ml-1">{userData.groupType ? 'userData.groupType' : 'Chưa xác định'}</span>
                    </div>
                    <div className="flex items-center text-[#65676B] text-[15px]">
                        <div className="w-[20px]">
                            <LuUserPlus />
                        </div>
                        <span className="ml-1">{userData.role}</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-[20px]">
                            <FaLocationDot className="text-[#65676B] text-[15px]" />
                        </div>
                        <span className="text-[#65676B] ml-2">Đến từ {userData.address.province}</span>
                    </div>
                </div>
            </div>
            {/*  */}
            {user.role === 'Cơ sở y tế' ? (
                <div>
                    {userData.role === 'Cơ sở y tế' ? (
                        <div className="flex justify-between mt-2">
                            {userData.isFollowed ? (
                                <div className="flex">
                                    <Link
                                        className="flex-center   py-1 mr-2 px-2 bg-[#f0f2f5] border border-[#ccc] rounded-[4px] hover:bg-[#d2d2d2] "
                                        to={`/user/${userData._id}`}
                                    >
                                        <FaHeartCircleCheck />
                                        <span className="ml-2">Đang theo dõi</span>
                                    </Link>
                                </div>
                            ) : (
                                <button
                                    className="flex-center w-[49%] py-1 mr-2 px-2 bg-[#f0f2f5] rounded-[4px] hover:bg-[#d2d2d2] "
                                    onClick={handleFollow}
                                >
                                    <FaHeartCirclePlus />
                                    <span className="ml-2">Theo dõi</span>
                                </button>
                            )}

                            <button className="flex-center w-[49%] py-1 bg-[#386fd6] rounded-[4px] text-white hover:bg-[#1c5291]">
                                <FaFacebookMessenger />
                                <span className="ml-2">Nhắn tin</span>
                            </button>
                        </div>
                    ) : (
                        <div className="flex justify-between mt-2">
                            <Link
                                className="flex-center w-[49%] py-1 bg-[#f0f2f5] border border-[#ccc] rounded-[4px]  hover:bg-[#d2d2d2]"
                                to={`/user/${userData._id}`}
                            >
                                <FaUser />
                                <span className="ml-2">Trang cá nhân</span>
                            </Link>

                            <button className="flex-center w-[49%] py-1 bg-[#386fd6] rounded-[4px] text-white hover:bg-[#1c5291]">
                                <FaFacebookMessenger />
                                <span className="ml-2">Nhắn tin</span>
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    {userData.role === 'Cơ sở y tế' ? (
                        <div className="flex justify-between mt-2">
                            {userData.isFollowed ? (
                                <div className="flex">
                                    <Link
                                        className="flex-center   py-1 mr-2 px-2 bg-[#f0f2f5] border border-[#ccc] rounded-[4px] hover:bg-[#d2d2d2] "
                                        to={`/user/${userData._id}`}
                                    >
                                        <FaHeartCircleCheck />
                                        <span className="ml-2">Đang theo dõi</span>
                                    </Link>
                                </div>
                            ) : (
                                <button
                                    className="flex-center w-[49%] py-1 mr-2 px-2 bg-[#f0f2f5] rounded-[4px] hover:bg-[#d2d2d2] "
                                    onClick={handleFollow}
                                >
                                    <FaHeartCirclePlus />
                                    <span className="ml-2">Theo dõi</span>
                                </button>
                            )}

                            <button className="flex-center w-[49%] py-1 bg-[#386fd6] rounded-[4px] text-white hover:bg-[#1c5291]">
                                <FaFacebookMessenger />
                                <span className="ml-2">Nhắn tin</span>
                            </button>
                        </div>
                    ) : (
                        <div className="flex justify-between mt-2">
                            {userData.isFriend ? (
                                <Link
                                    className="flex-center w-[49%] py-1 bg-[#f0f2f5] rounded-[4px] hover:bg-[#d2d2d2] "
                                    to={`/user/${userData._id}`}
                                >
                                    <FaUserCheck />
                                    <span className="ml-2">Bạn bè</span>
                                </Link>
                            ) : userData?.friendRequest?.status === 'pending' ? (
                                userData.friendRequest.senderId === userData._id ? (
                                    <Link
                                        className="flex-center w-[49%] py-1 bg-[#f0f2f5] rounded-[4px] hover:bg-[#d2d2d2] "
                                        to={`/user/${userData._id}`}
                                    >
                                        <FaUserCheck />
                                        <span className="ml-2">Phản hồi</span>
                                    </Link>
                                ) : (
                                    <button
                                        className="flex-center w-[49%] py-1 bg-[#f0f2f5] rounded-[4px] hover:bg-[#d2d2d2] "
                                        onClick={handleCancelFriendRequest}
                                    >
                                        <FaUserTimes />
                                        <span className="ml-2">Hủy lời mời</span>
                                    </button>
                                )
                            ) : (
                                <button
                                    className="flex-center w-[49%] py-1 bg-[#f0f2f5] rounded-[4px] hover:bg-[#d2d2d2] "
                                    onClick={handleSendFriendRequest}
                                >
                                    <IoMdPersonAdd />
                                    <span className="ml-2">Thêm bạn bè</span>
                                </button>
                            )}

                            <button className="flex-center w-[49%] py-1 bg-[#386fd6] rounded-[4px] text-white hover:bg-[#1c5291]">
                                <FaFacebookMessenger />
                                <span className="ml-2">Nhắn tin</span>
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserPreview;
