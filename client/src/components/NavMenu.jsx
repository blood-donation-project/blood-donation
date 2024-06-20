import { useState, useEffect } from 'react';

import Tippy from '@tippyjs/react/headless';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';

import { IoMdSearch, IoMdNotifications } from 'react-icons/io';
import { TiHome } from 'react-icons/ti';
import { MdEvent, MdLogout } from 'react-icons/md';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { PiUsersThree } from 'react-icons/pi';

import { FaFacebookMessenger, FaSpinner } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';

import { useSearchUsersMutation } from '../Redux/features/search/searchAPI';
import UserSearch from './User/UserSearch';
import ModalWrapper from './Modal/ModalWrapper';
import Image from './Image/Image';
import MobileSearch from './Modal/ModalContent/MobileSearch';

import logoWeb from '../assets/images/logo-web.jpg';
import MobileMenu from './Modal/ModalContent/MobileMenu';
import { useLogoutMutation } from '../Redux/features/auth/authAPI';
import useDebounce from '../hooks/useDebounce';
import Avatar from './Image/Avatar';

import { useAutoRefreshToken } from '../hooks/useAutoRefreshToken';
import { useGetReceiverMutation } from '../Redux/features/message/messageAPI';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { useGetAllNotifiMutation } from '../Redux/features/notification/notifiAPI';
import moment from 'moment';
import { useGetUserMutation } from '../Redux/features/user/userAPI';
import axios from 'axios';
const NavMenu = () => {
    useAutoRefreshToken('/api/user/get-user');
    const [logOut] = useLogoutMutation();
    const [getNotification, { isLoading: isLoadingNotifi, data: notifiData }] = useGetAllNotifiMutation();
    const location = useLocation();
    const pathname = location.pathname.split('/')[1] || '';
    const navigate = useNavigate();

    const [searchText, setSearchText] = useState('');
    const [isShowingSearchResults, setIsShowingSearchResults] = useState(false);
    const [isShowingNotify, setIsShowingNotify] = useState(false);
    const [searchResult, setSearchResult] = useState([]);

    const [isShowingAccountControl, setIsShowingAccountControl] = useState(false);

    const [isShowingSearchMobile, setIsShowingSearchMobile] = useState(false);
    const [isShowingMobileMenu, setIsShowingMobileMenu] = useState(false);

    const [searchUsers, { isLoading }] = useSearchUsersMutation();
    const [getUser, { data: getdataUser }] = useGetUserMutation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getNotification(getdataUser?._id).unwrap();
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [getNotification, getdataUser?._id]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getUser().unwrap();
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [getUser]);

    // useEffect(() => {
    //     setSearchResult(searchUsers);
    // }, [searchUsers]);

    const [getReceiver, { data: receiverMessage }] = useGetReceiverMutation();
    const params = useParams();
    useEffect(() => {
        const fetchData = async () => {
            try {
                await getReceiver().unwrap();
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [getReceiver, params.id]);

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
    ];

    const debounce = useDebounce(searchText, 500);

    useEffect(() => {
        if (!debounce) {
            return;
        }

        const fetchSearch = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/search/users`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                    params: { q: debounce, limit: 5, page: 1 },
                });
                setSearchResult(response.data.data);
            } catch (error) {
                // console.log(error);
            }
        };
        fetchSearch();
    }, [debounce]);

    const searchInputChange = (e) => {
        const value = e.target.value;
        if (value.length === 0) setSearchResult([]);
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

    return (
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
                        onHidden={() => {
                            // dispatch(setSearchResult([]));
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
                                            className=" px-1 text-[16px] bg-transparent outline-none "
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
                                                <p className="text-[16px] leading-[14px]">{searchText}</p>
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
                                        searchResult.length > 0 &&
                                        searchResult?.map((user, index) => {
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
                                className="xs:hidden lg:block px-1 text-[16px] bg-transparent outline-none "
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
                <div className=" xs:hidden md:grid h-full grid-cols-3 max-w-[590px] w-full ">
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
                        to={`/message/${receiverMessage?.[0]?.latestMessage?.receiverId || getdataUser?._id}`}
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
                                    {/* Map dữ liệu thông báo từ api */}
                                    {notifiData?.map((item, index) => (
                                        <Link
                                            key={index}
                                            className="grid py-2 hover:bg-[#d2d2d2] rounded-[6px]"
                                            to={item.content.link}
                                        >
                                            <div className="flex">
                                                {item?.content?.image && (
                                                    <div>
                                                        <Avatar
                                                            className="w-9 h-9 rounded-[50%]"
                                                            src={item?.content?.image}
                                                            alt="avatar"
                                                        />
                                                    </div>
                                                )}
                                                <div className="ml-2">
                                                    <div
                                                        className="text-[16px] leading-[14px]"
                                                        dangerouslySetInnerHTML={{ __html: item?.content.text }}
                                                    ></div>
                                                    <span className="text-[12px]">
                                                        {moment(item?.createAt).fromNow()}
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                    {!isLoadingNotifi && notifiData?.length === 0 && (
                                        <div className="py-3 flex-center">
                                            <span className="text-[#65676B] font-medium">
                                                Hiện chưa có thông báo nào
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    >
                        <div
                            className={`w-10 h-10  cursor-pointer rounded-[50%] bg-[#e4e6eb] flex-center mr-2 transition ${
                                isShowingNotify && 'text-[#386fd6]'
                            }`}
                            onClick={toggleVisibilityNotify}
                        >
                            <IoMdNotifications className="text-[20px]" />
                        </div>
                    </Tippy>
                    {/* getdataUser controls*/}
                    <Tippy
                        interactive={true}
                        onClickOutside={() => {
                            setIsShowingAccountControl(false);
                        }}
                        visible={isShowingAccountControl}
                        render={(attrs) => (
                            <div className="bg-white shadow-md w-[300px] rounded-[10px]" tabIndex="-1" {...attrs}>
                                <div className="p-1">
                                    <div className="px-2 py-1 hover:bg-[#ebedf0] rounded-[6px] ">
                                        <Link className="flex py-1.5 items-center " to={`/user/${getdataUser?._id}`}>
                                            <div>
                                                <Avatar
                                                    className="w-9 h-9 rounded-[50%]"
                                                    src={getdataUser?.avatar}
                                                    alt="avatar"
                                                />
                                            </div>
                                            <div className="ml-2">
                                                <p className="text-[16px] font-semibold ">{getdataUser?.username}</p>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="w-full h-[2px] my-1  bg-[#ccc]"></div>
                                    {getdataUser?.role === 'admin' && (
                                        <div className="px-2  hover:bg-[#ebedf0] rounded-[6px] ">
                                            <Link className="flex py-1.5 items-center " to={'/v1/admin'}>
                                                <div className="p-1.5 bg-[#e4e6eb] rounded-[50%]">
                                                    <MdOutlineAdminPanelSettings className="text-[20px]" />
                                                </div>
                                                <div className="ml-2">
                                                    <p className="text-[16px] font-semibold ">Chuyển đến Admin</p>
                                                </div>
                                            </Link>
                                        </div>
                                    )}
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
                                                <p className="text-[16px] font-semibold ">Đăng xuất</p>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    >
                        <div onClick={toggleVisibilityAccountControl}>
                            <Avatar
                                className="w-10 h-10 rounded-[50%] cursor-pointer"
                                src={getdataUser?.avatar}
                                alt="avatar"
                            />
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
    );
};

export default NavMenu;
