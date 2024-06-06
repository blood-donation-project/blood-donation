import React from 'react';

// Chat Body component
const ChatBody = () => {
  // Placeholder messages data - in a real app, this might come from props, state, or an API
  const messages = [
    { id: 1, text: "Hey! How are you?", sender: "contact" },
    { id: 2, text: "I'm good, thanks! And you?", sender: "user" },
    { id: 3, text: "Doing well, just getting ready for the weekend. 😊", sender: "contact" },
    { id: 4, text: "Shall we go for Hiking this weekend?", sender: "user" },
    { id: 5, text: "Absolutely! Let's do it.", sender: "contact" }
  ];

  return (
    <div className="chat-body p-4 flex-1 overflow-y-scroll">
      {messages.map((message) => (
        <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div className={`rounded-lg text-lg p-3 max-w-xs lg:max-w-md my-1 ${message.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>
            {message.text}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatBody;