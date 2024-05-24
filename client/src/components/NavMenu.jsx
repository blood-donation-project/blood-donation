import { useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import { Link, NavLink, useLocation } from 'react-router-dom';

import { IoMdSearch, IoMdNotifications } from 'react-icons/io';
import { TiHome } from 'react-icons/ti';
import { MdEvent, MdLogout } from 'react-icons/md';
import { FaRegNewspaper } from 'react-icons/fa6';
import { PiUsersThree } from 'react-icons/pi';
import { FaFacebookMessenger } from 'react-icons/fa';

import logoWeb from '../assets/img/logo-web.jpg';

const NavMenu = () => {
    const { pathname } = useLocation();

    const [searchText, setSearchText] = useState('');
    const [isShowingSearchResults, setIsShowingSearchResults] = useState(false);
    const [isShowingNotify, setIsShowingNotify] = useState(false);
    const [isShowingAccountControl, setIsShowingAccountControl] =
        useState(false);
    const [activeId, setActiveId] = useState('1');

    const navLinks = [
        {
            path: '/',
            icon: <TiHome className="text-[30px] " />,
        },
        {
            path: '/surrounding-users',
            icon: <PiUsersThree className="text-[30px] " />,
        },
        {
            path: '/appointment',
            icon: <MdEvent className="text-[28px] " />,
        },
        {
            path: '/news',
            icon: <FaRegNewspaper className="text-[28px] " />,
        },
    ];
    const handleDivClick = (e) => {
        const dataId = e.currentTarget.getAttribute('data-id');
        setActiveId(dataId);
    };

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

    const toggleVisibilityNotify = () => {
        setIsShowingNotify(!isShowingNotify);
    };

    const toggleVisibilityAccountControl = () => {
        setIsShowingAccountControl(!isShowingAccountControl);
    };

    return (
        <div className="px-3 fixed top-0 left-0 right-0 h-[56px] bg-white shadow z-10">
            <div className="flex justify-center  h-full">
                <div className="flex  items-center fixed top-0 left-0 h-[56px] pl-3">
                    <Link to={'/'}>
                        <img
                            className="w-10 h-10 rounded-[50%]"
                            src={logoWeb}
                            alt="logo web"
                        />
                    </Link>
                    <Tippy
                        interactive={true}
                        onClickOutside={() => {
                            setIsShowingSearchResults(false);
                        }}
                        visible={isShowingSearchResults}
                        render={(attrs) => (
                            <div
                                className="bg-white shadow-md w-[280px]  rounded-b-[12px]"
                                tabIndex="-1"
                                {...attrs}
                            >
                                {/* Map kết quả tìm kiếm từ api */}
                                <div className="grid px-2 pb-2">
                                    {searchText && (
                                        <Link
                                            className="flex p-1.5 hover:bg-[#ebedf0] items-center  rounded-md "
                                            to={`/search/all?q=${searchText}`}
                                        >
                                            <div className="w-9 h-9 flex-center rounded-[50%] bg-[#ebedf0]">
                                                <IoMdSearch className="text-[#65676B] text-[20px]" />
                                            </div>
                                            <div className="ml-2">
                                                <p className="text-[14px] leading-[14px]">
                                                    {searchText}
                                                </p>
                                            </div>
                                        </Link>
                                    )}
                                    <Link
                                        className="flex p-1.5 hover:bg-[#ebedf0]  rounded-md "
                                        to={'/'}
                                    >
                                        <div>
                                            <img
                                                className="w-9 h-9 rounded-[50%]"
                                                src="https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-1/434757841_395354200092792_2139257770690806498_n.jpg?stp=cp0_dst-jpg_p80x80&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=YY8lMEJqW1sQ7kNvgG3k6WG&_nc_ht=scontent.fhan2-3.fna&oh=00_AYA_6rUZKprqrqSjicyaPOwMxHsCsjirnFsn_zO-cG5IMA&oe=66494E8C"
                                                alt="avatar"
                                            />
                                        </div>
                                        <div className="ml-2">
                                            <p className="text-[14px] leading-[14px]">
                                                Hoa Nguyen
                                            </p>
                                            <span className="text-[12px]">
                                                Bạn bè
                                            </span>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        )}
                    >
                        <div className=" ml-2 px-2 py-[6px] flex bg-[#f0f2f5] justify-center items-center rounded-[50px]">
                            <IoMdSearch className="text-[#65676B] text-[20px]" />
                            <input
                                className="px-1 text-[14px] bg-transparent outline-none"
                                placeholder="Tìm kiếm trên ..."
                                onFocus={() => {
                                    setIsShowingSearchResults(true);
                                }}
                                value={searchText}
                                onChange={searchInputChange}
                                onKeyDown={searchInputKeyDown}
                            />
                        </div>
                    </Tippy>
                </div>
                <div className="grid grid-cols-4 w-[590px]">
                    {navLinks.map((nav, i) => {
                        return (
                            <NavLink
                                className={({ isActive }) =>
                                    isActive
                                        ? ' flex justify-center items-center border-b-[4px] border-b-red-500  '
                                        : ' flex justify-center items-center hover:bg-[#ebedf0] rounded-[8px]'
                                }
                                key={i}
                                to={nav.path}
                            >
                                <i
                                    className={
                                        pathname === nav.path
                                            ? 'text-red-500'
                                            : 'text-[#65676B]'
                                    }
                                >
                                    {nav.icon}
                                </i>
                            </NavLink>
                        );
                    })}
                </div>
                <div className="flex items-center  fixed top-0 right-0 h-[56px] pr-3">
                    <Link
                    to={'/message'}
                    className="w-10 h-10 flex cursor-pointer rounded-[50%] item bg-[#e4e6eb] items-center justify-center  mr-2 ">
                        <FaFacebookMessenger className="text-[20px]" />
                    </Link>
                    {/* Thông báo */}
                    <Tippy
                        interactive={true}
                        onClickOutside={() => {
                            setIsShowingNotify(false);
                        }}
                        visible={isShowingNotify}
                        render={(attrs) => (
                            <div
                                className="bg-white shadow-md w-[340px] rounded-[10px]"
                                tabIndex="-1"
                                {...attrs}
                            >
                                <div className="p-2">
                                    <h1 className="text-[20px] font-bold">
                                        Thông báo
                                    </h1>
                                    <div className="flex mt-2">
                                        <div
                                            className={`mr-2 transition text-[14px] cursor-pointer px-2 rounded-[10px] hover:bg-[#ebedf0] ${
                                                activeId === '1'
                                                    ? 'font-semibold text-red-500 bg-red-100'
                                                    : ''
                                            }`}
                                            data-id="1"
                                            onClick={handleDivClick}
                                        >
                                            <span>Tất cả</span>
                                        </div>
                                        <div
                                            className={`mr-2 transition text-[14px] cursor-pointer px-2 rounded-[10px] hover:bg-[#ebedf0] ${
                                                activeId === '2'
                                                    ? 'font-semibold text-red-500 bg-red-100'
                                                    : ''
                                            }`}
                                            data-id="2"
                                            onClick={handleDivClick}
                                        >
                                            <span>Chưa đọc</span>
                                        </div>
                                    </div>
                                    {/* Map dữ liệu thông báo từ api */}
                                    <div className="grid pt-4">
                                        <div className="flex">
                                            <div>
                                                <img
                                                    className="w-9 h-9 rounded-[50%]"
                                                    src="https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-1/434757841_395354200092792_2139257770690806498_n.jpg?stp=cp0_dst-jpg_p80x80&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=YY8lMEJqW1sQ7kNvgG3k6WG&_nc_ht=scontent.fhan2-3.fna&oh=00_AYA_6rUZKprqrqSjicyaPOwMxHsCsjirnFsn_zO-cG5IMA&oe=66494E8C"
                                                    alt="avatar"
                                                />
                                            </div>
                                            <div className="ml-2">
                                                <p className="text-[14px] leading-[14px]">
                                                    Thông báo cái gì đó chưa
                                                    nghiên cứu
                                                </p>
                                                <span className="text-[12px]">
                                                    9 Giờ trước
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    >
                        <div
                            className={`w-10 h-10  cursor-pointer rounded-[50%] bg-[#e4e6eb] flex items-center justify-center mr-2 transition ${
                                isShowingNotify && 'text-red-500'
                            }`}
                            onClick={toggleVisibilityNotify}
                        >
                            <IoMdNotifications className="text-[20px]" />
                        </div>
                    </Tippy>
                    {/* Bảng điều khiển người dùng */}
                    <Tippy
                        interactive={true}
                        onClickOutside={() => {
                            setIsShowingAccountControl(false);
                        }}
                        visible={isShowingAccountControl}
                        render={(attrs) => (
                            <div
                                className="bg-white shadow-md w-[300px] rounded-[10px]"
                                tabIndex="-1"
                                {...attrs}
                            >
                                <div className="p-1">
                                    <div className="px-2 py-1 hover:bg-[#ebedf0] rounded-[6px] ">
                                        <Link
                                            className="flex py-1.5 items-center "
                                            to={`/user/${12312}`}
                                        >
                                            <div>
                                                <img
                                                    className="w-9 h-9 rounded-[50%]"
                                                    src="https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-1/434757841_395354200092792_2139257770690806498_n.jpg?stp=cp0_dst-jpg_p80x80&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=YY8lMEJqW1sQ7kNvgG3k6WG&_nc_ht=scontent.fhan2-3.fna&oh=00_AYA_6rUZKprqrqSjicyaPOwMxHsCsjirnFsn_zO-cG5IMA&oe=66494E8C"
                                                    alt="avatar"
                                                />
                                            </div>
                                            <div className="ml-2">
                                                <p className="text-[16px] font-semibold ">
                                                    Hoàng Xuân Việt
                                                </p>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="w-full h-[2px] my-1  bg-[#ccc]"></div>
                                    <div className="px-2  hover:bg-[#ebedf0] rounded-[6px] ">
                                        <Link
                                            className="flex py-1.5 items-center "
                                            to={'/'}
                                        >
                                            <div className="p-1.5 bg-[#e4e6eb] rounded-[50%]">
                                                <MdLogout className="text-[20px]" />
                                            </div>
                                            <div className="ml-2">
                                                <p className="text-[14px] font-semibold ">
                                                    Đăng xuất
                                                </p>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    >
                        <div onClick={toggleVisibilityAccountControl}>
                            <img
                                className="w-10 h-10 rounded-[50%] cursor-pointer"
                                src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/361256160_1420481928775878_514483897564070731_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=JnEgyCSJGO0Q7kNvgGkTvWu&_nc_ht=scontent.fhan2-5.fna&oh=00_AYBkfNMc23WtT5ya7AaKej7YpsHqnqvNuxDYHg7CIe0NOQ&oe=664955EB"
                                alt="avatar"
                            />
                        </div>
                    </Tippy>
                </div>
            </div>
        </div>
    );
};

export default NavMenu;
