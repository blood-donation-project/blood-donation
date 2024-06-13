import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetUserByIdMutation } from '../../../Redux/features/user/userAPI';
import { FaCircle } from 'react-icons/fa';
import {
    offOfflineDuration,
    offUpdateUserStatus,
    onOfflineDuration,
    onUpdateUserStatus,
    register,
} from '../../../services/socket';
import moment from 'moment';

// Chat Header component
const ChatHeader = () => {
    const [getUserById, { data: userProfile }] = useGetUserByIdMutation();
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [offlineDurations, setOfflineDurations] = useState({});
    const params = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = params.id;
                await getUserById(userId).unwrap();
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [getUserById, params.id]);

    const handleUpdateUserStatus = useCallback((onlineUsers) => {
        setOnlineUsers(onlineUsers);
    }, []);

    const handleOfflineDuration = useCallback(({ userId, offlineDuration }) => {
        console.log(`User ${userId} offline for ${offlineDuration} ms`); // Log để kiểm tra userId và offlineDuration
        setOfflineDurations((prev) => ({
            ...prev,
            [userId]: offlineDuration,
        }));
    }, []);

    useEffect(() => {
        onUpdateUserStatus(handleUpdateUserStatus);
        onOfflineDuration(handleOfflineDuration);

        return () => {
            offUpdateUserStatus(handleUpdateUserStatus);
            offOfflineDuration(handleOfflineDuration);
        };
    }, [handleUpdateUserStatus, handleOfflineDuration, params.id]);

    return (
        <div className="chat-header px-6 py-2 flex flex-row flex-none justify-between items-center border-b shadow-lg">
            <Link
                to={`/user/${userProfile?.user?._id}`}
                className="flex hover:bg-gray-200 p-2 rounded-lg cursor-pointer"
            >
                <div className="w-12 h-12 mr-4 relative flex flex-shrink-0">
                    <img
                        className="shadow-md rounded-full w-full h-full object-cover"
                        src={userProfile?.user?.avatar}
                        alt=""
                    />
                </div>
                <div className="text-sm flex flex-col justify-start">
                    <p className="font-bold text-lg">
                        {userProfile?.user?.username}
                    </p>
                    <p className="text-sm text-[#6b6b67] flex items-center">
                        {onlineUsers.includes(params.id) ? (
                            <span className="text-green-500 flex items-center">
                                <FaCircle className="mr-1" /> Đang hoạt động
                            </span>
                        ) : (
                            <span className="text-red-400 flex items-center">
                                <FaCircle className="mr-1" /> Offline
                            </span>
                        )}
                    </p>
                </div>
            </Link>

            <div className="flex">
                {/* Additional icons or actions can be added here */}
            </div>
        </div>
    );
};

export default ChatHeader;
