import React, { useEffect, useState, useCallback } from 'react';
import ChatHeader from './ChatSection/ChatHeader';
import ChatBody from './ChatSection/ChatBody';
import ChatFooter from './ChatSection/ChatFooter';
import { useGetUserMutation } from '../../Redux/features/user/userAPI';
import { useParams } from 'react-router-dom';
import {
    joinConversationRoom,
    offMessageReceived,
    onMessageReceived,
    register,
    sendMessage,
} from '../../services/socket';
import { useGetMessageMutation } from '../../Redux/features/message/messageAPI';

const ChatSection = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [getMessage, { data: messagesData }] = useGetMessageMutation();
    const [getUser, { data: userData }] = useGetUserMutation();
    const params = useParams();
    const userId = userData?._id;
    const receiverId = params?.id;

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

    useEffect(() => {
        if (userId) {
            register(userId);

            if (receiverId) {
                joinConversationRoom(receiverId);
            }

            const handleMessageReceived = (msg) => {
                console.log('Message received:', msg);
                setMessages((prevMessages) => [...prevMessages, msg]);
            };

            onMessageReceived(handleMessageReceived);

            const fetchMessages = async () => {
                try {
                    const result = await getMessage(receiverId).unwrap();
                    console.log(result);
                    setMessages(result);
                } catch (error) {
                    console.log('Error fetching messages: ', error);
                }
            };
            fetchMessages();

            return () => {
                offMessageReceived(handleMessageReceived);
            };
        }
    }, [getMessage, receiverId, userId]);

    const handleSendMessage = useCallback(
        (e) => {
            e.preventDefault();
            if (input.trim() !== '') {
                sendMessage(receiverId, input);
                console.log('Message sent:', {
                    senderId: userId,
                    content: input,
                });
                setInput('');
            }
        },
        [input, receiverId, userId]
    );

    return (
        <section className="flex h-screen flex-col flex-auto border-l border-gray-200">
            <ChatHeader />
            <ChatBody messages={messages} />
            <ChatFooter
                input={input}
                setInput={setInput}
                handleSendMessage={handleSendMessage}
            />
        </section>
    );
};

export default ChatSection;
