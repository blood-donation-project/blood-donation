import React, { useEffect, useRef, useState } from 'react';
import { IoSend } from 'react-icons/io5';
import Picker from 'emoji-picker-react';
import { BsEmojiSmileFill } from "react-icons/bs";
// Chat Footer component
const ChatFooter = ({ onSendMessage }) => {
    const emojiRef = useRef(null);
    const emojiButtonRef = useRef(null);
    const [message, setMessage] = useState('');
    const [isPickerVisible, setPickerVisible] = useState(false);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!message.trim()) return;
        onSendMessage(message);
        setMessage('');
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (emojiRef.current && !emojiRef.current.contains(event.target) && !emojiButtonRef.current.contains(event.target) ) {
                    setPickerVisible(false)
                
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [emojiRef]);

    const onEmojiClick = (emojiObject) => {
        setMessage((prevInput) => prevInput + emojiObject.emoji);
    };

    const togglePicker = () => {
        setPickerVisible(!isPickerVisible);
    };

    return (
        <div className="chat-footer px-4 py-3 flex-none">
            <form
                className="flex items-center"
                onSubmit={handleSendMessage}
            >
                <div className="relative flex flex-1 items-center rounded-s-3xl">
                    {isPickerVisible && (
                        <div
                            ref={emojiRef}
                            
                            className="absolute z-10 bottom-full right-2 mb-2"
                        >
                            <Picker
                                emojiStyle="native"
                                onEmojiClick={onEmojiClick}
                            />
                        </div>
                    )}
                    <button 
                        ref={emojiButtonRef}
                        onClick={togglePicker}
                        className="absolute right-9  outline-none"
                        type="button"
                    >
                        <BsEmojiSmileFill 
                        className='w-7 h-7 text-blue-600 hover:text-blue-500'
                        />
                    </button>
                    <input
                        className=" flex-1 p-4 bg-gray-200 text-lg rounded-3xl mr-2 outline-none"
                        type="text"
                        placeholder="Aa"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>
                <button
                    className="bg-blue-500 flex items-center justify-center hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-xl"
                    type="submit"
                >
                    <IoSend className="w-6 h-6" />
                </button>
            </form>
        </div>
    );
};

export default ChatFooter;
