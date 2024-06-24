import React, { useEffect, useRef, useState } from 'react';
import { useAutoRefreshToken } from '../../../hooks/useAutoRefreshToken';
import { Skeleton } from 'antd';
import { useGetUserByIdMutation, useGetUserMutation } from '../../../Redux/features/user/userAPI';
import { useParams } from 'react-router-dom';

const ChatBody = ({ messages }) => {
    const [tokenRefreshed, setTokenRefreshed] = useState(false);
    useAutoRefreshToken('/home/', setTokenRefreshed);

    const [getUser, { data: userData }] = useGetUserMutation();
    const [getUserById, { data: userDataById }] = useGetUserByIdMutation();
    const params = useParams();
    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        if (tokenRefreshed) {
            const fetchData = async () => {
                try {
                    await getUser().unwrap();
                } catch (error) {
                    console.log(error);
                }
            };
            fetchData();
        }
    }, [getUser, tokenRefreshed]);

    useEffect(() => {
        if (tokenRefreshed) {
            // Chỉ chạy khi token đã được làm mới
            const fetchData = async () => {
                try {
                    const userId = params.id; // Get user by id url
                    await getUserById(userId).unwrap();
                } catch (error) {
                    console.log(error);
                }
            };
            fetchData();
        }
    }, [getUserById, params.id, tokenRefreshed]);

    return (
        <div className="overflow-y-scroll flex-1">
            {messages?.length > 0 ? (
                <div ref={chatContainerRef} className="chat-body  w-full p-4  bg-white ">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex ${
                                message?.senderId?._id === userData?._id ? 'justify-end' : 'justify-start'
                            } break-words`}
                        >
                            <div
                                className={`px-3 py-2 rounded-3xl my-1 max-w-xs ${
                                    message?.senderId._id === userData?._id
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-200 text-black'
                                }`}
                            >
                                {message?.content}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-1 h-[80%] items-center flex-col">
                    <Skeleton loading={false}>
                        <div className="flex flex-col items-center">
                            <div className="h-10"></div>
                            <img className="rounded-full mb-3 w-20 h-20" src={userDataById?.avatar} alt="" />
                            <p className="text-lg">{userDataById?.username}</p>
                            <p className="text-sm text-[#65676B]">Sống tại {userDataById?.address?.province}</p>
                        </div>
                        <div></div>
                    </Skeleton>
                </div>
            )}
        </div>
    );
};

export default ChatBody;
