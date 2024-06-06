import React from 'react';
import ChatHeader from './ChatSection/ChatHeader';
import ChatBody from './ChatSection/ChatBody';
import ChatFooter from './ChatSection/ChatFooter';

const ChatSection = () => {
    return (
        <section className="flex flex-col flex-auto border-l border-gray-200">
            <ChatHeader />
            <ChatBody />
            <ChatFooter />
        </section>
    );
};

export default ChatSection;
