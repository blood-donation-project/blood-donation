import React from 'react';
import Menu from './Menu';

const NotificationAdmin = () => {
    return (
        <div className="flex h-screen">
            <Menu activeComponent={'notification'} />
            <div className="flex-1 bg-gradient-to-b from-blue-200 via-white to-pink-200 h-full overflow-y-scroll">
                <div className="lg:py-6 py-[18px] pl-4 border-b bg-white w-full">
                    <h1 className="lg:text-3xl text-xl">Thông báo</h1>
                </div>
                <div className="p-4 max-w-4xl mx-auto">
                    <div className="bg-white rounded-xl w-full p-4 shadow-sm h-[500px] overflow-y-scroll">
                        {/* Map here */}
                        <div className="flex items-center hover:bg-gray-300 p-2 px-3 rounded-md">
                            <div>
                                <img
                                    src=""
                                    alt=""
                                />
                            </div>
                            <div className="flex flex-col">
                                <p>
                                    Đã có hơn 10 bài viết mới từ lần gần đây
                                    nhất bạn truy cập
                                </p>
                                <p className="text-sm text-gray-500">
                                    2 tuần trước
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationAdmin;
