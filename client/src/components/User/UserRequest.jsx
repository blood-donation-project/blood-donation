import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Avatar from '../Image/Avatar';
import {
    useAcceptFriendRequestMutation,
    useCancelFriendRequestMutation,
    useRejectFriendRequestMutation,
    useSendFriendRequestMutation,
    useUnfriendMutation,
} from '../../Redux/features/friend/friendAPI';

const UserRequest = ({ className, userData }) => {
    const { user } = useSelector((state) => state.user);
    const [sendFriendRequest] = useSendFriendRequestMutation();
    const [acceptFriendRequest] = useAcceptFriendRequestMutation();
    const [rejectFriendRequest] = useRejectFriendRequestMutation();
    const [unfriend] = useUnfriendMutation();

    const handleSendFriendRequest = () => {
        sendFriendRequest({ receiverId: userData._id }).unwrap();
    };
    const handleRejectFriendRequest = () => {
        rejectFriendRequest({ requestId: userData.friendRequest._id }).unwrap();
    };
    const handleAcceptFriendRequest = () => {
        if (userData.friendRequest) acceptFriendRequest({ requestId: userData.friendRequest._id }).unwrap();
    };

    return (
        <div className={className}>
            <div className="bg-white rounded-[8px] overflow-hidden shadow-md">
                <Link to={`/user/${userData._id}`}>
                    <Avatar className="object-cover w-full h-full aspect-square " src={userData.avatar} />
                </Link>
                <div className="p-2 shadow-sm">
                    <Link className="text-[14px] font-semibold" to={`/user/${userData._id}`}>
                        {userData.username}
                    </Link>
                    {userData.friendRequest.status === 'pending' ? (
                        <div className="flex flex-col">
                            <button
                                type="button"
                                className="rounded py-1 text-[14px] hover:bg-[#1c5291] text-white font-medium bg-[#386fd6]"
                                onClick={handleAcceptFriendRequest}
                            >
                                Xác nhận
                            </button>
                            <button
                                type="button"
                                className="rounded py-1 text-[14px] mt-2 bg-[#ebedf0;] hover:bg-[#d2d2d2] "
                                onClick={handleRejectFriendRequest}
                            >
                                Từ chối
                            </button>
                        </div>
                    ) : userData.friendRequest.status === 'rejected' ? (
                        <div className="flex flex-col">
                            <span className="text-[14px] text-[#65676B]">Đã gỡ lời mời </span>
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            <Link
                                to={`/user/${userData._id}`}
                                type="button"
                                className="rounded py-1 text-[14px] mt-2 bg-[#ebedf0] flex-center border border-[#ccc] font-medium hover:bg-[#d2d2d2] "
                            >
                                Trang cá nhân
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserRequest;
