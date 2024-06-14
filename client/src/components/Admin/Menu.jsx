import React from 'react';
import { Link } from 'react-router-dom';
import { MdManageAccounts } from 'react-icons/md';
import { TbCalendarEvent } from 'react-icons/tb';
import { BsFilePost } from 'react-icons/bs';
import { IoNotifications } from 'react-icons/io5';
const Menu = () => {
    return (
        <div class="flex flex-col items-center lg:justify-between z-30 shadow-md border-r lg:w-48 w-16 h-full overflow-hidden text-gray-700 bg-gray-100 rounded">
            <div>
                <Link
                    class="lg:flex lg:items-center w-full lg:px-3 lg:mt-3"
                    href="#"
                >
                    <img
                        className="lg:w-14 lg:h-14 w-36"
                        src={
                            'https://res.cloudinary.com/dkjwdmndq/image/upload/v1718331321/news_images/rgn6rzvyaeg33j8u6sil.svg'
                        }
                        alt=""
                    />
                    <span class="ml-2 lg:block hidden gradient-text text-sm font-bold">
                        Blood Donation
                    </span>
                </Link>
                <div class="w-full px-2">
                    <div class="flex flex-col items-center w-full lg:mt-3 border-t border-gray-300">
                        <Link
                            class="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300"
                            href="#"
                        >
                            <svg
                                class="w-6 h-6 stroke-current"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                />
                            </svg>
                            <span class="ml-2 hidden lg:block text-sm font-medium">
                                Trang Chủ
                            </span>
                        </Link>
                        <Link
                            class="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300"
                            href="#"
                        >
                            <MdManageAccounts className="w-6 h-6" />
                            <span class="ml-2 hidden lg:block text-sm font-medium">
                                Người dùng
                            </span>
                        </Link>
                        <Link
                            class="flex items-center  w-full h-12 px-3 mt-2 rounded hover:bg-gray-300"
                            href="#"
                        >
                            <BsFilePost className="w-6 h-6" />
                            <span class="ml-2 hidden lg:block text-sm font-medium">
                                Bài Đăng
                            </span>
                        </Link>
                        <Link
                            class="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300"
                            href="#"
                        >
                            <TbCalendarEvent className="w-6 h-6" />
                            <span class="ml-2 hidden lg:block text-sm font-medium">
                                Sự Kiện
                            </span>
                        </Link>
                        <Link
                            class="flex items-center w-full h-12 px-3 mt-2 bg-gray-300 rounded"
                            href="#"
                        >
                            <svg
                                class="w-6 h-6 stroke-current"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                            <span class="ml-2 hidden lg:block text-sm font-medium">
                                Thống kê
                            </span>
                        </Link>
                    </div>
                    <div class="flex flex-col items-center w-full mt-2 border-t border-gray-300">
                        <Link
                            class="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300"
                            href="#"
                        >
                            <IoNotifications className="w-6 h-6" />
                            <span class="ml-2 hidden lg:block text-sm font-medium">
                                Thông báo
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="w-full">
                <Link
                    class="flex items-center justify-center w-full h-12 lg:h-16  bg-gray-200 hover:bg-gray-300"
                    href="#"
                >
                    <svg
                        class="w-6 h-6 stroke-current"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <span class="ml-2 hidden lg:block text-sm font-medium">
                        Tài khoản
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default Menu;
