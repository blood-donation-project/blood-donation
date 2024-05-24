import React, { useEffect } from 'react';
import MainContent from '../components/Message/MainContent';
import { getAccessToken } from '../services/localStorageService';
import { useNavigate } from 'react-router-dom';
const Message = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!getAccessToken()) {
            
            navigate('/login');
        }
    }, [navigate]);
    return (
        <div className="h-screen w-full flex antialiased overflow-hidden">
            <div className="flex-1 flex flex-col">
                {/* Header */}

                {/* Main Content */}
                <MainContent  />
            </div>
        </div>
    );
};

export default Message;
