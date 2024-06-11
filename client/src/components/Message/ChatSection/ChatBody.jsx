import React, { useEffect, useRef, useState } from 'react';
import { useGetMessageMutation } from '../../../Redux/features/message/messageAPI';
import { useParams } from 'react-router-dom';
import { useAutoRefreshToken } from '../../../hooks/useAutoRefreshToken';
import { Skeleton } from 'antd';
import { useGetUserMutation } from '../../../Redux/features/user/userAPI';
// Chat Body component
const ChatBody = () => {
    const [isLoading, setIsLoading] = useState(false);
    useAutoRefreshToken('/home/');
    const [getMessage, { data: messageData }] = useGetMessageMutation();
    const [getUser, { data: userData }] = useGetUserMutation();
    const params = useParams();
    const chatContainerRef = useRef(null);
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const receiverId = params.id;
                await getMessage(receiverId).unwrap();
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        };
        fetchData();
    }, [getMessage, params.id]);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop =
                chatContainerRef.current.scrollHeight;
        }
    }, [messageData]);

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
        <div>
            {messageData ? (
                <div
                    ref={chatContainerRef}
                    className="chat-body w-full h-[80vh] p-4 flex-1 overflow-y-scroll bg-white flex flex-col"
                >
                    <Skeleton
                        loading={isLoading}
                        active
                        className=""
                    >
                        {messageData?.map((message) => (
                            <div
                                key={message._id}
                                className={` flex ${
                                    message?.senderId?._id === userData?._id
                                        ? 'justify-end'
                                        : 'justify-start'
                                } break-words `}
                            >
                                <div
                                    className={`px-3 py-2 rounded-3xl my-1 max-w-xs ${
                                        message.senderId._id === userData?._id
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-200 text-black'
                                    }`}
                                >
                                    {message.content}
                                </div>
                            </div>
                        ))}
                    </Skeleton>
                </div>
            ) : (
                <div className="flex h-[80vh] items-center flex-col">
                    <Skeleton
                        loading={isLoading}
                        active
                    >
                        <div className="flex flex-col items-center">
                            <div className="h-10"></div>
                            <img
                                className="rounded-full mb-3"
                                src="https://randomuser.me/api/portraits/med/men/75.jpg"
                                alt=""
                            />
                            <p className="text-lg">Không biết</p>
                            <p className="text-sm text-[#65676B]">
                                Sống tại Hà Nội
                            </p>
                        </div>
                        <div></div>
                    </Skeleton>
                </div>
            )}
        </div>
    );
};

export default ChatBody;
