import React from 'react';
import logo from '../../../assets/img/logo-web.jpg';
import { useNavigate } from 'react-router-dom';

const SidebarHeader = () => {
    const navigate = useNavigate();
    return (
        <div className="header p-4 flex flex-row justify-start gap-10 items-center flex-none">
            <div
                className="w-16 h-16 relative flex flex-shrink-0 cursor-pointer"
                onClick={() => navigate('/')}
            >
                <img
                    className="rounded-full w-full h-full object-cover"
                    alt=""
                    src={logo}
                />
            </div>
            <p className="text-3xl font-medium hidden md:block group-hover:block">
                Tin Nhắn
            </p>
        </div>
    );
};

export default SidebarHeader;
