import React, { useEffect, useRef } from 'react';
import { useAutoRefreshToken } from '../../../hooks/useAutoRefreshToken';
import { Skeleton } from 'antd';
import { useGetUserMutation } from '../../../Redux/features/user/userAPI';

const ChatBody = ({ messages }) => {
    useAutoRefreshToken('/home/');
    const [getUser, { data: userData }] = useGetUserMutation();
    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop =
                chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

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
    if (!userData) {
        return <Skeleton active />;
    }

    return (
        <div>
            {messages?.length > 0 ? (
                <div
                    ref={chatContainerRef}
                    className="chat-body w-full h-[80vh] p-4 flex-1 overflow-y-scroll bg-white "
                >
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex ${
                                message.senderId._id === userData._id
                                    ? 'justify-end'
                                    : 'justify-start'
                            } break-words`}
                        >
                            <div
                                className={`px-3 py-2 rounded-3xl my-1 max-w-xs ${
                                    message.senderId._id === userData._id
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-200 text-black'
                                }`}
                            >
                                {message.content}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex h-[80vh] items-center flex-col">
                    <Skeleton>
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
