import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdManageAccounts, MdVerified } from 'react-icons/md';
import { TbCalendarEvent } from 'react-icons/tb';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';
import { BsFilePost } from 'react-icons/bs';
import { IoNotifications, IoArrowBackSharp } from 'react-icons/io5';
const Menu = ({ activeComponent }) => {
    const [isOpenPost, setIsOpenPost] = useState(false);

    return (
        <div class="flex flex-col items-center lg:justify-between z-30 shadow-md border-r lg:w-48 w-16 h-full overflow-hidden text-gray-700 bg-gray-100 rounded transition-all duration-300">
            <div>
                <Link class="lg:flex lg:items-center w-full lg:px-3 lg:mt-3" href="#">
                    <img
                        className="lg:w-14 lg:h-14 w-36"
                        src={
                            'https://res.cloudinary.com/dkjwdmndq/image/upload/v1718331321/news_images/rgn6rzvyaeg33j8u6sil.svg'
                        }
                        alt=""
                    />
                    <span class="ml-2 lg:block hidden gradient-text text-sm font-bold">Blood Donation</span>
                </Link>
                <div class="w-full px-2">
                    <div class="flex flex-col items-center w-full lg:mt-3 border-t border-gray-300">
                        <Link
                            to={'/v1/admin'}
                            class={`${
                                activeComponent === 'home' ? 'bg-gray-300 text-gray-800' : ''
                            } flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300`}
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
                            <span class="ml-2 hidden lg:block text-sm font-medium">Trang Chủ</span>
                        </Link>
                        <Link
                            class={`${
                                activeComponent === 'user' ? 'bg-gray-300 text-gray-800' : ''
                            } flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300`}
                            to={'/v1/admin/manage-users'}
                        >
                            <MdManageAccounts className="w-6 h-6" />
                            <span class="ml-2 hidden lg:block text-sm font-medium">Người dùng</span>
                        </Link>
                        <Link
                            class={`${
                                activeComponent === 'post' || activeComponent === 'accept-post'
                                    ? 'bg-gray-300 text-gray-800'
                                    : ''
                            } flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300`}
                            to={'/v1/admin/manage-post'}
                            onClick={() => setIsOpenPost(!isOpenPost)}
                        >
                            <BsFilePost className="w-6 h-6" />
                            <span class="ml-2 flex-1 hidden lg:flex items-center justify-between text-sm font-medium">
                                Bài Đăng
                                {isOpenPost || activeComponent === 'accept-post' ? <FaAngleUp /> : <FaAngleDown />}
                            </span>
                        </Link>
                        {/* Dropdown Menu Post */}
                        <Link
                            class={`${
                                activeComponent === 'accept-post'
                                    ? 'bg-gray-300 text-gray-800 border-l-4 border-blue-400'
                                    : ''
                            } ${
                                isOpenPost || activeComponent === 'accept-post' ? 'flex' : 'hidden'
                            } items-center w-full ml-3 h-12 px-3 mt-1 rounded hover:bg-gray-300`}
                            to={'/v1/admin/manage-post/accept-post'}
                        >
                            <MdVerified className="w-6 h-6 text-green-500" />
                            <span class="ml-2 hidden lg:block text-sm font-medium">Chờ duyệt bài</span>
                        </Link>
                        <Link
                            class={`${
                                activeComponent === 'event' ? 'bg-gray-300 text-gray-800' : ''
                            } flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300`}
                            to={'/v1/admin/manage-events'}
                        >
                            <TbCalendarEvent className="w-6 h-6" />
                            <span class="ml-2 hidden lg:block text-sm font-medium">Sự Kiện</span>
                        </Link>
                    </div>
                    <div class="flex flex-col items-center w-full mt-2 border-t border-gray-300">
                        <Link
                            class={`${
                                activeComponent === 'notification' ? 'bg-gray-300 text-gray-800' : ''
                            } flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300`}
                            to={'/v1/admin/notification'}
                        >
                            <IoNotifications className="w-6 h-6" />
                            <span class="ml-2 hidden lg:block text-sm font-medium">Thông báo</span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="w-full">
                <Link
                    class="flex items-center justify-center w-full h-12 lg:h-16  bg-gray-200 hover:bg-gray-300"
                    to={'/'}
                >
                    <IoArrowBackSharp className="w-6 h-6" />
                    <span class="ml-2 hidden lg:block text-sm font-medium">Quay lại Blood Donation</span>
                </Link>
            </div>
        </div>
    );
};

export default Menu;
