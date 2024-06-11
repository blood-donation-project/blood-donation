import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetReceiverMutation } from '../../../Redux/features/message/messageAPI';
import { useGetUserMutation } from '../../../Redux/features/user/userAPI';
import { Skeleton } from 'antd';
import moment from 'moment';
import 'moment/locale/vi';
const Contacts = () => {
    const [getReceiver, { data: receiverMessage }] = useGetReceiverMutation();
    const [getUser, { data: userData }] = useGetUserMutation();
    const params = useParams();
    moment.locale('vi');
    useEffect(() => {
        const fetchData = async () => {
            try {
                await getReceiver().unwrap();
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [getReceiver]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                await getUser().unwrap();
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [getUser]);

    return (
        <div className="contacts p-2 flex-1 transition-all duration-300  overflow-y-scroll h-[70vh] cursor-default">
            {/* Replace with contacts data mapping */}
            <Skeleton
                loading={false}
                active
            >
                {receiverMessage?.map((item) => (
                    <Link
                        key={userData?.id}
                        to={`/message/${
                            item?.latestMessage?.receiverId === userData?._id
                                ? item?.latestMessage?.senderId
                                : item?.latestMessage?.receiverId
                        }`}
                        className={`flex justify-between items-center p-3 hover:bg-gray-200 rounded-lg relative
                        ${
                            (item?.latestMessage?.receiverId === userData?._id
                                ? item?.latestMessage?.senderId
                                : item?.latestMessage?.receiverId) === params.id
                                ? 'bg-blue-50 hover:bg-blue-50'
                                : ''
                        }
                        `}
                    >
                        <div className="w-16 h-16 relative flex flex-shrink-0">
                            <img
                                className="shadow-md rounded-full w-full h-full object-cover"
                                src={item?.user?.avatar}
                                alt=""
                            />
                        </div>
                        <div className="flex-auto text-lg min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
                            <p>{item?.user?.username}</p>
                            <div className="flex items-center text-sm text-gray-600">
                                <div className="min-w-0 w-full flex gap-1 items-center">
                                    <p className="truncate text-sm">
                                        {userData?._id ===
                                            item?.latestMessage?.senderId ||
                                        userData?._id ===
                                            item?.latestMessage?.senderId
                                            ? 'Bạn: '
                                            : ''}

                                        {item?.latestMessage?.content}
                                    </p>
                                    <span className=""> · </span>
                                    <p className="text-xs text-gray-500 flex items-center justify-center">
                                        {moment(
                                            item?.latestMessage?.createAt
                                        ).fromNow()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </Skeleton>
        </div>
    );
};

export default Contacts;
