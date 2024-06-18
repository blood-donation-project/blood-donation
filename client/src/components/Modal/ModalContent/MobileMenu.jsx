import { useEffect, useState } from 'react';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import { BsMessenger } from 'react-icons/bs';
import { HiMiniUsers } from 'react-icons/hi2';
import { FaBell } from 'react-icons/fa';
import { MdEvent, MdOutlineAdminPanelSettings } from 'react-icons/md';
import { LuLogOut } from 'react-icons/lu';
import Avatar from '../../Image/Avatar';

import { useLogoutMutation } from '../../../Redux/features/auth/authAPI';
import { useSelector } from 'react-redux';

const MobileMenu = ({ hideModal }) => {
    const { user } = useSelector((state) => state.user);
    const [searchText, setSearchText] = useState('');

    const [logOut] = useLogoutMutation();
    const navigate = useNavigate();
    const searchInputChange = (e) => {
        const value = e.target.value;
        if (value.startsWith(' ')) return;
        setSearchText(value);
    };

    const searchInputKeyDown = (e) => {
        if ((e.key === 'Enter' || e.keyCode === 13) && searchText.length > 0) {
            window.location.href = `/search/all?q=${searchText}`;
        }
    };

    const handleLogout = async () => {
        await logOut().unwrap();
        navigate('/login');
    };
    return (
        <div className=" z-[9] w-full h-full bg-[#ebedf0] relative">
            {/* Header */}
            <div className=" h-[44px] text-center  border-b boder-b-[#ccc]  items-center bg-white flex ">
                <div className="w-[44px] h-full flex-center cursor-pointer hover:bg-[#ebedf0]" onClick={hideModal}>
                    <FaArrowLeftLong />
                </div>
                <div className="px-2 py-2 ">
                    <h3 className="text-semibold text-[18px]">Menu</h3>
                </div>
            </div>
            {/* Content */}
            <div className=" overflow-y-auto w-full h-full rounded-[10px] p-2">
                {/* Link profile */}
                <div className="bg-white rounded-lg shadow  mb-2">
                    <Link
                        className="flex items-center py-2.5 px-2 hover:bg-[#ebedf0]   rounded-md"
                        to={`/user/${user?._id}`}
                    >
                        <div>
                            <Avatar
                                className="w-9 h-9 rounded-[50%] border border-[#ccc]"
                                src={user.avatar}
                                alt="avatar"
                            />
                        </div>
                        <div className="ml-2">
                            <p className="text-[14px] font-semibold leading-[14px] line-clamp-1">{user.username}</p>
                            <span className="text-[14px] text-[#65676B]">Xem trang cá nhân của bạn</span>
                        </div>
                    </Link>
                </div>
                {/* Other links */}
                <div className="grid grid-cols-2 gap-2 mb-2">
                    <div className=" bg-white rounded-lg shadow">
                        <Link
                            className="flex flex-col  py-2.5 px-2  justify-center hover:bg-[#ebedf0] pl-2  rounded-md"
                            to={`/message/${user._id}`}
                        >
                            <div className="text-[20px]">
                                <BsMessenger />
                            </div>
                            <div className="mt-2">
                                <p className="text-[14px] font-semibold leading-[14px]">Tin nhắn</p>
                            </div>
                        </Link>
                    </div>
                    <div className=" bg-white rounded-lg shadow  ">
                        <Link
                            className="flex flex-col justify-center hover:bg-[#ebedf0] py-2.5 px-2 pl-2  rounded-md"
                            to="/friends"
                        >
                            <div className="text-[20px]">
                                <HiMiniUsers />
                            </div>
                            <div className="mt-2">
                                <p className="text-[14px] font-semibold leading-[14px]">Bạn bè</p>
                            </div>
                        </Link>
                    </div>
                    <div className=" bg-white rounded-lg shadow">
                        <Link
                            className="flex flex-col justify-center  py-2.5 px-2  hover:bg-[#ebedf0] pl-2  rounded-md"
                            to="/notifications"
                        >
                            <div className="text-[20px]">
                                <FaBell />
                            </div>
                            <div className="mt-2">
                                <p className="text-[14px] font-semibold leading-[14px]">Thông báo</p>
                            </div>
                        </Link>
                    </div>
                    <div className=" bg-white rounded-lg shadow  ">
                        <Link
                            className="flex flex-col justify-center py-2.5 px-2 hover:bg-[#ebedf0] pl-2  rounded-md"
                            to="/events"
                        >
                            <div className="text-[20px]">
                                <MdEvent />
                            </div>
                            <div className="mt-2">
                                <p className="text-[14px] font-semibold leading-[14px]">Sự kiện</p>
                            </div>
                        </Link>
                    </div>
                </div>
                {/* Log out */}
                <div className="bg-white rounded-lg shadow  mb-2">
                    <Link to={'/v1/admin'} className="flex items-center hover:bg-[#ebedf0] py-2.5 px-2 rounded-md">
                        <div className="h-9 w-9 flex-center">
                            <MdOutlineAdminPanelSettings className="w-6 h-6" />
                        </div>
                        <div className="ml-2">
                            <p className="text-[14px] font-semibold leading-[14px]">Chuyển tới trang Admin</p>
                        </div>
                    </Link>
                </div>
                <div className="bg-white rounded-lg shadow  mb-2">
                    <Link
                        onClick={handleLogout}
                        className="flex items-center hover:bg-[#ebedf0] py-2.5 px-2 rounded-md"
                    >
                        <div className="h-9 w-9 flex-center">
                            <LuLogOut className="w-6 h-6" />
                        </div>
                        <div className="ml-2">
                            <p className="text-[14px] font-semibold leading-[14px]">Đăng xuất</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MobileMenu;
