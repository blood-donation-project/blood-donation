import React, { useEffect, useRef, useState } from 'react';
import { IoSend } from 'react-icons/io5';
import Picker from 'emoji-picker-react';
import { BsEmojiSmileFill } from 'react-icons/bs';

const ChatFooter = ({ input, setInput, handleSendMessage }) => {
    const emojiRef = useRef(null);
    const emojiButtonRef = useRef(null);
    const [isPickerVisible, setPickerVisible] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                emojiRef.current &&
                !emojiRef.current.contains(event.target) &&
                !emojiButtonRef.current.contains(event.target)
            ) {
                setPickerVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [emojiRef]);

    const onEmojiClick = (emojiObject) => {
        setInput((prevInput) => prevInput + emojiObject.emoji);
    };

    const togglePicker = () => {
        setPickerVisible(!isPickerVisible);
    };

    return (
        <div className="chat-footer px-4 py-3 flex-1 border">
            <form onSubmit={handleSendMessage} className="flex items-center">
                <div className="relative flex flex-1 items-center rounded-s-3xl">
                    {isPickerVisible && (
                        <div ref={emojiRef} className="absolute z-10 bottom-full right-2 mb-2">
                            <Picker emojiStyle="native" onEmojiClick={onEmojiClick} />
                        </div>
                    )}
                    <button
                        ref={emojiButtonRef}
                        onClick={togglePicker}
                        className="absolute right-9  outline-none"
                        type="button"
                    >
                        <BsEmojiSmileFill className="w-7 h-7 text-blue-600 hover:text-blue-500" />
                    </button>
                    <input
                        className=" flex-1 p-4 bg-gray-200 text-lg rounded-3xl mr-2 outline-none transition-all duration-300 focus:border border-blue-500"
                        type="text"
                        placeholder="Aa"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
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
