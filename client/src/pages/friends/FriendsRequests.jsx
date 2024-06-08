import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { HiMiniUserPlus } from 'react-icons/hi2';
import { HiMiniUsers } from 'react-icons/hi2';

import NoResult from '../../components/NoResult';
import NavMenu from '../../components/NavMenu';
import { NavLink } from 'react-router-dom';
import { RiUserShared2Fill } from 'react-icons/ri';
import UserRequest from '../../components/User/UserRequest';
import NoFriends from '../../components/NoFriends';
import NoFriendsRequest from '../../components/NoFriendsRequest';
import UserFriendLoading from '../../components/LoadingSkeleton/User/UserFriendLoading';
import UserFriendProfile from '../../components/User/UserFriendProfile';
import UserFriendProfileLoading from '../../components/LoadingSkeleton/User/UserFriendProfileLoading';

const FriendsSuggest = () => {
    const [searchParams] = useSearchParams();
    const queryValue = searchParams.get('q');
    const { pathname } = useLocation();

    useEffect(() => {
        if (queryValue === '' || queryValue === undefined || queryValue === null) {
            // Go 404 page
        }
    }, [queryValue]);

    const navSidebarLeftLinks = [
        {
            title: 'Tất cả bạn bè',
            icon: <HiMiniUsers />,
            path: `/friends`,
            mainPath: '/friends',
        },
        {
            title: 'Lời mời kết bạn',
            icon: <RiUserShared2Fill />,
            path: `/friends/requests`,
            mainPath: '/friends/requests',
        },
        {
            title: 'Gợi ý cho bạn',
            icon: <HiMiniUserPlus />,
            path: `/friends/suggest`,
            mainPath: '/friends/suggest',
        },
    ];

    return (
        <>
            <NavMenu />
            <div className="xs:pt-[96px] md:pt-0 md:mt-[56px] bg-[#ebedf0]">
                <div className="md:flex ">
                    {/* Sidebar left */}
                    <div className="xs:hidden md:block md:w-[240px] lg:w-[360px]">
                        <div className="md:w-[240px] lg:w-[360px] xs:hidden md:block fixed h-[calc(h-screen_-_56px)] left-0 top-[56px] bg-white shadow-lg shadow-[rgba(0,0,0,0.3)] bottom-0 py-2 px-3 ">
                            <div className="py-2 ">
                                <h2 className="text-[22px] font-bold">Bạn bè</h2>
                            </div>
                            <div className="">
                                <div>
                                    {navSidebarLeftLinks.map((nav, i) => {
                                        return (
                                            <NavLink
                                                className={`flex items-center py-1.5 rounded-[6px] cursor-pointer  ${pathname === nav.mainPath ? 'bg-[#ebedf0]' : 'hover:bg-[#ebedf0]'}`}
                                                to={nav.path}
                                                key={i}
                                            >
                                                <div
                                                    className={`p-2  rounded-[50%]  ${pathname === nav.mainPath ? 'bg-[#386fd6]' : 'bg-[#ebedf0]'}  `}
                                                >
                                                    <div
                                                        className={` ${pathname === nav.mainPath ? 'text-white' : 'text-[#212121]'}  `}
                                                    >
                                                        {' '}
                                                        {nav.icon}
                                                    </div>
                                                </div>
                                                <span className="ml-2 font-semibold text-[#212121]">{nav.title}</span>
                                            </NavLink>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sencondary nav */}
                    <div className="md:hidden w-full  bg-white mt-2 py-1 ">
                        <div className="flex items-center ">
                            {navSidebarLeftLinks.map((nav, i) => {
                                return (
                                    <NavLink
                                        className={` ml-2 py-0.5 px-1.5 rounded-[8px] cursor-pointer  ${pathname === nav.mainPath ? 'bg-red-100 ' : 'bg-[#ebedf0]'}`}
                                        to={nav.path}
                                        key={i}
                                    >
                                        <span
                                            className={`${pathname === nav.mainPath ? 'text-red-500  ' : 'text-[#212121]'} font-semibold `}
                                        >
                                            {nav.title}
                                        </span>
                                    </NavLink>
                                );
                            })}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="xs:w-full md:w-[calc(100vw_-_240px)] lg:w-[calc(100vw_-_360px)] min-h-screen">
                        <div className="grid lg:grid-cols-5 md:grid-cols-4 xs:grid-cols-2 gap-3 py-3 px-5">
                            {new Array(5).fill(0).map(() => {
                                return <UserRequest />;
                            })}
                        </div>
                        <div className="grid lg:grid-cols-5 md:grid-cols-4 xs:grid-cols-2 gap-3 py-3 px-5">
                            {new Array(5).fill(0).map(() => {
                                return <UserFriendProfileLoading />;
                            })}
                        </div>
                        {/* No result example */}
                        {/* <NoFriendsRequest /> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default FriendsSuggest;
