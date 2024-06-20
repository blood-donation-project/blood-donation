import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Avatar from '../Image/Avatar';
import {
    useAcceptFriendRequestMutation,
    useCancelFriendRequestMutation,
    useFollowMutation,
    useSendFriendRequestMutation,
} from '../../Redux/features/friend/friendAPI';
import { LuUserPlus } from 'react-icons/lu';

const UserSuggest = ({ className, userData }) => {
    const { user } = useSelector((state) => state.user);
    const [sendFriendRequest] = useSendFriendRequestMutation();
    const [cancelFriendRequest] = useCancelFriendRequestMutation();
    const [acceptFriendRequest] = useAcceptFriendRequestMutation();
    const [follow] = useFollowMutation();

    const handleSendFriendRequest = () => {
        sendFriendRequest({ receiverId: userData._id }).unwrap();
    };
    const handleCancelFriendRequest = () => {
        cancelFriendRequest({ receiverId: userData._id }).unwrap();
    };
    const handleAcceptFriendRequest = () => {
        if (userData.friendRequest) acceptFriendRequest({ requestId: userData.friendRequest._id }).unwrap();
    };
    const handleFollow = () => {
        follow({ receiverId: userData._id }).unwrap();
    };

    return (
        <Link className={className}>
            <div className="bg-white rounded-[8px] overflow-hidden shadow-md">
                <Avatar className="object-cover w-full h-full aspect-square " src={userData.avatar} alt="avatar" />
                <div className="p-2 shadow-sm">
                    <span className="text-[16px] line-clamp-1 font-medium">{userData.username}</span>
                    <div className="flex items-center text-[#65676B] text-[13px] py-0.5">
                        <div className="w-[14px]">
                            <LuUserPlus />
                        </div>
                        <span className="">{userData.role}</span>
                    </div>
                    <div className="flex flex-col">
                        {userData.role === 'Cơ sở y tế' ? (
                            userData.isFollowed ? (
                                <Link
                                    className="flex-center text-[16px] font-medium   py-1 bg-[#f0f2f5] border border-[#ccc] rounded-[4px] hover:bg-[#d2d2d2] "
                                    to={`/user/${userData._id}`}
                                >
                                    <span className="">Đang theo dõi</span>
                                </Link>
                            ) : (
                                <button
                                    className="flex-center text-white  text-[16px] font-medium  py-1 bg-[#386fd6] rounded-[4px] hover:bg-[#1c5291] "
                                    onClick={handleFollow}
                                >
                                    <span className="">Theo dõi</span>
                                </button>
                            )
                        ) : userData.friendRequest?.status === 'pending' ? (
                            userData.friendRequest.senderId === user._id ? (
                                <button
                                    type="button"
                                    className="rounded py-1 text-[16px] hover:bg-[#d2d2d2] text-black border border-[#ccc]  font-medium bg-[#ebedf0]"
                                    onClick={handleCancelFriendRequest}
                                >
                                    Hủy yêu cầu
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleAcceptFriendRequest}
                                    className="rounded py-1 text-[16px] hover:bg-[#1c5291] text-white  font-medium bg-[#386fd6]"
                                >
                                    Xác nhận
                                </button>
                            )
                        ) : (
                            <button
                                type="button"
                                className="rounded py-1 text-[16px] hover:bg-[#1c5291] text-white  font-medium bg-[#386fd6]"
                                onClick={handleSendFriendRequest}
                            >
                                Thêm bạn bè
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default UserSuggest;
