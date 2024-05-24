import React from 'react';

// Chat Header component
const ChatHeader = () => {
    // Placeholder data - in a real app, this might come from props or state
    const userProfile = {
      name: "Scarlett Johansson",
      avatar: "https://randomuser.me/api/portraits/women/33.jpg",
      lastActive: "Active 1h ago"
    };
  
    return (
      <div className="chat-header px-6 py-4 flex flex-row flex-none justify-between items-center shadow-md">
        <div className="flex">
          <div className="w-12 h-12 mr-4 relative flex flex-shrink-0">
            <img className="shadow-md rounded-full w-full h-full object-cover" src={userProfile.avatar} alt=""/>
          </div>
          <div className="text-sm">
            <p className="font-bold text-xl">{userProfile.name}</p>
            <p>{userProfile.lastActive}</p>
          </div>
        </div>
  
        <div className="flex">
          
          {/* Additional icons or actions can be added here */}
        </div>
      </div>
    );
  };

export default ChatHeader;
