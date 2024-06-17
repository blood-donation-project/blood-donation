import React from 'react';
import Menu from './Menu';

const ManagePost = () => {
    return (
        <div className="flex h-screen">
            <Menu activeComponent={'post'} />
            <div className="flex-1 bg-gradient-to-b from-blue-200 via-white to-pink-200 h-full overflow-y-scroll"></div>
        </div>
    );
};

export default ManagePost;
