import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetAllFriendsMutation } from '../../Redux/features/friend/friendAPI';
import { useInviteFriendsMutation } from '../../Redux/features/events/eventAPI';
import { useGetInviteEventNotifiMutation } from '../../Redux/features/notification/notifiAPI';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';

const InviteFriends = ({ isOpen, onClose, currentUser, friends }) => {
    const params = useParams();
    const [inviteFriend] = useInviteFriendsMutation();
    const [getNotification] = useGetInviteEventNotifiMutation();
    const [localNotificationData, setLocalNotificationData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const notifications = await getNotification({
                    type: `InviteEvent_${params.id}_${currentUser?._id}`,
                }).unwrap();
                setLocalNotificationData(notifications);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [getNotification, currentUser?._id, params.id]);

    const handleInviteFriend = async (friendId) => {
        try {
            const eventId = params.id;
            await inviteFriend({ friendId, eventId }).unwrap();
            setLocalNotificationData((prevData) => [
                ...prevData,
                {
                    userId: friendId,
                    type: `InviteEvent_${eventId}_${currentUser._id}`,
                },
            ]);
        } catch (error) {
            console.log(error);
        }
    };

    const isFriendInvited = (friendId) => {
        return localNotificationData.some((notification) => {
            const [prefix, notifEventId, notifUserId] = notification.type.split('_');
            return (
                prefix === 'InviteEvent' &&
                notifEventId === params.id &&
                notifUserId === currentUser._id &&
                notification.userId === friendId
            );
        });
    };

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
            <div className="bg-white rounded-lg max-w-2xl w-full p-8 mx-auto">
                <div className="flex justify-between items-center border-b pb-4">
                    <h2 className="text-xl font-bold">Mời bạn bè</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                <div className="mt-6">
                    <div className="pb-2 border-b-2 border-blue-500 text-blue-500">{/*  */}</div>
                    <div className="mt-6">
                        <div className="">
                            <div className="flex items-center space-x-6 mb-6">
                                <div className="bg-gray-300 text-white rounded-full h-12 w-12 flex items-center justify-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M17 20h5v-2a4 4 0 00-3-3.87M9 20h6m-6 0a4 4 0 01-4-4V5a2 2 0 012-2h10a2 2 0 012 2v11a4 4 0 01-4 4m-6 0v2m6-2v2M7 10h.01M11 10h.01M15 10h.01"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <div className="font-semibold">{/*  */}</div>
                                    <div className="text-gray-500">Bạn bè của bạn sẽ được hiển thị ở đây</div>
                                </div>
                            </div>

                            {friends?.data?.map((item, index) => (
                                <div key={index} className="overflow-y-auto max-h-80">
                                    <div className="flex items-center space-x-6 p-1 mb-2 rounded-xl">
                                        <img className="w-12 h-12 rounded-full" src={item?.avatar} alt="" />
                                        <div className=" flex items-center justify-between w-full transition-all duration-500">
                                            <Link className="hover:underline" to={`/user/${item?._id}`}>
                                                {item?.username}
                                            </Link>
                                            {isFriendInvited(item._id) ? (
                                                <div className="p-2 flex items-center gap-1 text-blue-500 bg-blue-100 rounded-lg cursor-default border border-blue-400">
                                                    <IoMdCheckmarkCircleOutline className="w-5 h-5" />
                                                    Đã mời
                                                </div>
                                            ) : (
                                                <button
                                                    className="hover:bg-gray-300 p-2 px-4 rounded-lg"
                                                    onClick={() => handleInviteFriend(item._id)}
                                                >
                                                    Mời
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InviteFriends;
