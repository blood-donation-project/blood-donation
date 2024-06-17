import { useState, useEffect } from 'react';
import Tippy from '@tippyjs/react/headless';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { IoMdSearch, IoMdNotifications } from 'react-icons/io';
import { TiHome } from 'react-icons/ti';
import { MdEvent, MdLogout } from 'react-icons/md';
import { FaRegNewspaper, FaArrowLeftLong } from 'react-icons/fa6';
import { PiUsersThree } from 'react-icons/pi';
import { FaFacebookMessenger, FaSpinner } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';

import { useSearchUsersMutation } from '../Redux/features/search/searchAPI';
import { setUsersSearch } from '../Redux/features/search/searchSlice';
import UserSearch from './User/UserSearch';
import ModalWrapper from './Modal/ModalWrapper';
import Image from './Image/Image';
import MobileSearch from './Modal/ModalContent/MobileSearch';
import logoWeb from '../assets/images/logo-web.jpg';
import MobileMenu from './Modal/ModalContent/MobileMenu';
import { useLogoutMutation } from '../Redux/features/auth/authAPI';
import useDebounce from '../hooks/useDebounce';
import Avatar from './Image/Avatar';

const NavMenu = () => {
    const [logOut] = useLogoutMutation();
    const location = useLocation();
    const pathname = location.pathname.split('/')[1] || '';
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [searchText, setSearchText] = useState('');
    const [isShowingSearchResults, setIsShowingSearchResults] = useState(false);
    const [isShowingNotify, setIsShowingNotify] = useState(false);
    const [isShowingAccountControl, setIsShowingAccountControl] = useState(false);
    const [isShowingSearchMobile, setIsShowingSearchMobile] = useState(false);
    const [isShowingMobileMenu, setIsShowingMobileMenu] = useState(false);
    const [activeId, setActiveId] = useState('1');

    const { user } = useSelector((state) => state.user);
    const { usersData } = useSelector((state) => state.search);
    const [searchUsers, { isLoading }] = useSearchUsersMutation();

    const navLinks = [
        {
            path: '/',
            icon: <TiHome className="text-[30px] " />,
            mainPath: '',
        },
        {
            path: '/surrounding-users',
            icon: <PiUsersThree className="text-[30px] " />,
            mainPath: 'surrounding-users',
        },
        {
            path: '/events',
            icon: <MdEvent className="text-[28px] " />,
            mainPath: 'events',
        },
        {
            path: '/news',
            icon: <FaRegNewspaper className="text-[28px] " />,
            mainPath: 'news',
        },
    ];

    const debounce = useDebounce(searchText, 500);

    useEffect(() => {
        if (!debounce) {
            return;
        }
        searchUsers({ q: debounce, limit: 5, page: 1 }).unwrap();
    }, [debounce]);

    const handleDivClick = (e) => {
        const dataId = e.currentTarget.getAttribute('data-id');
        setActiveId(dataId);
    };

    const searchInputChange = (e) => {
        const value = e.target.value;
        if (value.length === 0) dispatch(setUsersSearch({ data: [] }));
        if (value.startsWith(' ')) return;

        setSearchText(value);
    };

    const searchInputKeyDown = (e) => {
        if ((e.key === 'Enter' || e.keyCode === 13) && searchText.length > 0) {
            navigate(`/search/all?q=${searchText}`);
        }
    };

    const showMobileSearch = () => {
        setIsShowingSearchMobile(true);
    };

    const hideMobileSearch = () => {
        setIsShowingSearchMobile(false);
    };

    const showMobileMenu = () => {
        setIsShowingMobileMenu(true);
    };

    const hideMobileMenu = () => {
        setIsShowingMobileMenu(false);
    };

    const toggleVisibilityNotify = () => {
        setIsShowingNotify(!isShowingNotify);
    };

    const toggleVisibilityAccountControl = () => {
        setIsShowingAccountControl(!isShowingAccountControl);
    };

    const handleLogout = async () => {
        await logOut().unwrap();
        navigate('/login');
    };

    return user ? (
        <div className="md:h-[56px] xs:h-[96px] px-3 fixed top-0 left-0 right-0  bg-white shadow z-[99999]">
            {/* Nav */}
            <div className=" xs:h-[46px] items-center md:h-full md:px-[200px] lg:px-[300px]   flex xs:justify-between md:justify-center xs:border-b xs:border-b-[#ccc]">
                {/* Logo & Search */}
                <div className="xs:h-[46px] md:h-[56px] flex  items-center fixed top-0 left-0  pl-3">
                    <Link to={'/'}>
                        <Image className="w-10 h-10 rounded-[50%]" src={logoWeb} alt="logo web" />
                    </Link>

                    <Tippy
                        interactive={true}
                        appendTo={document.body}
                        onClickOutside={() => {
                            setIsShowingSearchResults(false);
                        }}
                        zIndex={'999999'}
                        visible={isShowingSearchResults}
                        render={(attrs) => (
                            <div
                                className="md:fixed z-[99999] lg:relative md:top-[-54px] md:left-[-78px] lg:top-0 lg:left-0 bg-white shadow-lg w-[280px] md:rounded-br-md  lg:rounded-b-[12px]"
                                tabIndex="-1"
                                {...attrs}
                            >
                                <div className="lg:hidden flex p-2 ">
                                    <div
                                        className="flex-center hover:cursor-pointer hover:bg-[#ebedf0] px-2"
                                        onClick={() => {
                                            setIsShowingSearchResults(false);
                                        }}
                                    >
                                        <FaArrowLeftLong />
                                    </div>
                                    <div className="xs:hidden md:flex flex-grow  ml-2 px-2 py-[6px] bg-[#f0f2f5] justify-center items-center rounded-[50px]">
                                        <div>
                                            <IoMdSearch className="text-[#65676B] text-[20px]" />
                                        </div>
                                        <input
                                            className=" px-1 text-[14px] bg-transparent outline-none "
                                            placeholder="Tìm kiếm trên ..."
                                            value={searchText}
                                            onChange={searchInputChange}
                                            onKeyDown={searchInputKeyDown}
                                        />
                                    </div>
                                </div>
                                <div className="grid p-2">
                                    {searchText && (
                                        <Link
                                            className="flex p-1.5 hover:bg-[#ebedf0] items-center  rounded-md "
                                            to={`/search/all?q=${searchText}`}
                                        >
                                            <div className="w-9 h-9 flex-center rounded-[50%] bg-[#ebedf0]">
                                                <IoMdSearch className="text-[#65676B] text-[20px]" />
                                            </div>
                                            <div className="ml-2">
                                                <p className="text-[14px] leading-[14px]">{searchText}</p>
                                            </div>
                                        </Link>
                                    )}
                                    {isLoading ? (
                                        <div className="w-full py-2 flex-center ">
                                            <div className="spinner text-[#65676B]">
                                                <FaSpinner />
                                            </div>
                                        </div>
                                    ) : (
                                        usersData.map((user, index) => {
                                            return <UserSearch key={index} userData={user} />;
                                        })
                                    )}
                                </div>
                            </div>
                        )}
                    >
                        <div className="xs:hidden md:flex  xs:cursor-pointer lg:cursor-default ml-2 px-2 py-[6px] bg-[#f0f2f5] justify-center items-center rounded-[50px]">
                            <div
                                onClick={() => {
                                    setIsShowingSearchResults(true);
                                }}
                            >
                                <IoMdSearch className="text-[#65676B] text-[20px]" />
                            </div>
                            <input
                                className="xs:hidden lg:block px-1 text-[14px] bg-transparent outline-none "
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

                    <div className="md:hidden text-[#c01b2c] font-bold ">BloodDonation</div>
                </div>
                {/* Nav PC & Tablet */}
                <div className=" xs:hidden md:grid h-full grid-cols-4 max-w-[590px] w-full ">
                    {navLinks.map((nav, i) => {
                        return (
                            <NavLink
                                className={
                                    pathname === nav.mainPath
                                        ? ' flex justify-center items-center border-b-[4px] border-b-[#386fd6]  '
                                        : ' flex justify-center items-center hover:bg-[#ebedf0] rounded-[8px] '
                                }
                                key={i}
                                to={nav.path}
                            >
                                <i className={pathname === nav.mainPath ? 'text-[#386fd6]' : 'text-[#65676B]'}>
                                    {nav.icon}
                                </i>
                            </NavLink>
                        );
                    })}
                </div>
                {/* Control Pc & Tablet */}
                <div className=" xs:hidden md:h-[56px]  md:flex items-center  fixed top-0 right-0  pr-3">
                    {/* Mobile menu icon */}
                    <div
                        className=" md:flex lg:hidden xs:hidden w-10 h-10 cursor-pointer rounded-[50%] item bg-[#e4e6eb]  flex-center mr-2"
                        onClick={showMobileMenu}
                    >
                        <FiMenu />
                    </div>
                    {/* Message */}
                    <Link
                        className="w-10 h-10 cursor-pointer rounded-[50%] item bg-[#e4e6eb]  flex-center mr-2 "
                        to="/message"
                    >
                        <FaFacebookMessenger className="text-[20px]" />
                    </Link>
                    {/* Notifications*/}
                    <Tippy
                        interactive={true}
                        onClickOutside={() => {
                            setIsShowingNotify(false);
                        }}
                        visible={isShowingNotify}
                        render={(attrs) => (
                            <div className="bg-white shadow-md w-[340px] rounded-[10px]" tabIndex="-1" {...attrs}>
                                <div className="p-2">
                                    <h1 className="text-[20px] font-bold">Thông báo</h1>
                                    <div className="flex mt-2">
                                        <div
                                            className={`mr-2 transition text-[14px] cursor-pointer px-2 rounded-[10px] hover:bg-[#ebedf0] ${activeId === '1' ? 'font-semibold text-[#386fd6] bg-[#d3e1fb]' : ''}`}
                                            data-id="1"
                                            onClick={handleDivClick}
                                        >
                                            <span>Tất cả</span>
                                        </div>
                                        <div
                                            className={`mr-2 transition text-[14px] cursor-pointer px-2 rounded-[10px] hover:bg-[#ebedf0] ${activeId === '2' ? 'font-semibold text-[#386fd6] bg-[#d3e1fb]' : ''}`}
                                            data-id="2"
                                            onClick={handleDivClick}
                                        >
                                            <span>Chưa đọc</span>
                                        </div>
                                    </div>
                                    {/* Map dữ liệu thông báo từ api */}
                                    <div className="grid pt-4">
                                        {/* <div className="flex">
                                            <div>
                                                <Image
                                                    className="w-9 h-9 rounded-[50%]"
                                                    src="https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-1/434757841_395354200092792_2139257770690806498_n.jpg?stp=cp0_dst-jpg_p80x80&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=YY8lMEJqW1sQ7kNvgG3k6WG&_nc_ht=scontent.fhan2-3.fna&oh=00_AYA_6rUZKprqrqSjicyaPOwMxHsCsjirnFsn_zO-cG5IMA&oe=66494E8C"
                                                    alt="avatar"
                                                />
                                            </div>
                                            <div className="ml-2">
                                                <p className="text-[14px] leading-[14px]">
                                                    Thông báo cái gì đó chưa nghiên cứu
                                                </p>
                                                <span className="text-[12px]">9 Giờ trước</span>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        )}
                    >
                        <div
                            className={`w-10 h-10  cursor-pointer rounded-[50%] bg-[#e4e6eb] flex-center mr-2 transition ${isShowingNotify && 'text-[#386fd6]'}`}
                            onClick={toggleVisibilityNotify}
                        >
                            <IoMdNotifications className="text-[20px]" />
                        </div>
                    </Tippy>
                    {/* User controls*/}
                    <Tippy
                        interactive={true}
                        onClickOutside={() => {
                            setIsShowingAccountControl(false);
                        }}
                        hideOnClick={true}
                        visible={isShowingAccountControl}
                        render={(attrs) => (
                            <div className="bg-white shadow-md w-[300px] rounded-[10px]" tabIndex="-1" {...attrs}>
                                <div className="p-1">
                                    <div className="px-2 py-1 hover:bg-[#ebedf0] rounded-[6px] ">
                                        <Link className="flex py-1.5 items-center " to={`/user/${user._id}`}>
                                            <div>
                                                <Avatar
                                                    className="w-9 h-9 rounded-[50%]"
                                                    src={user.avatar}
                                                    alt="avatar"
                                                />
                                            </div>
                                            <div className="ml-2">
                                                <p className="text-[16px] font-semibold ">{user.username}</p>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="w-full h-[2px] my-1  bg-[#ccc]"></div>
                                    <div className="px-2  hover:bg-[#ebedf0] rounded-[6px] ">
                                        <Link
                                            className="flex py-1.5 items-center "
                                            to={'/logout'}
                                            onClick={handleLogout}
                                        >
                                            <div className="p-1.5 bg-[#e4e6eb] rounded-[50%]">
                                                <MdLogout className="text-[20px]" />
                                            </div>
                                            <div className="ml-2">
                                                <p className="text-[14px] font-semibold ">Đăng xuất</p>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    >
                        <div onClick={toggleVisibilityAccountControl}>
                            <Avatar className="w-10 h-10 rounded-[50%] cursor-pointer" src={user.avatar} alt="avatar" />
                        </div>
                    </Tippy>
                </div>

                {/* Menu mobile */}
                <div className="h-[46px] md:hidden xs:flex items-center fixed top-0 right-0  pr-3">
                    <div
                        className=" cursor-pointer mr-2 px-2 py-[6px] bg-[#f0f2f5] justify-center items-center rounded-[50px]"
                        onClick={showMobileSearch}
                    >
                        <IoMdSearch className="text-[#65676B] text-[20px]" />
                    </div>
                    <div
                        className=" cursor-pointer  px-2 py-[6px] bg-[#f0f2f5] justify-center items-center rounded-[50px]"
                        onClick={showMobileMenu}
                    >
                        <FiMenu />
                    </div>
                </div>
            </div>

            {/* Nav mobile */}
            <div className=" xs:grid md:hidden h-[50px]  grid-cols-4  w-full ">
                {navLinks.map((nav, i) => {
                    return (
                        <NavLink
                            className={
                                pathname === nav.mainPath
                                    ? ' flex justify-center items-center  '
                                    : ' flex justify-center items-center hover:bg-[#ebedf0] rounded-[8px] '
                            }
                            key={i}
                            to={nav.path}
                        >
                            <i className={pathname === nav.mainPath ? 'text-[#386fd6]' : 'text-[#65676B]'}>
                                {nav.icon}
                            </i>
                        </NavLink>
                    );
                })}
            </div>
            <ModalWrapper isShowing={isShowingSearchMobile}>
                <MobileSearch hideModal={hideMobileSearch} />
            </ModalWrapper>
            <ModalWrapper isShowing={isShowingMobileMenu}>
                <MobileMenu hideModal={hideMobileMenu} />
            </ModalWrapper>
        </div>
    ) : (
        <div className="md:h-[56px] xs:h-[96px] px-3 fixed top-0 left-0 right-0  bg-white shadow z-[99999] flex item-center">
            <Image src={logoWeb} alt="logo" />
        </div>
    );
};

export default NavMenu;