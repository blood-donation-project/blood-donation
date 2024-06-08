import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { SiPowerpages } from 'react-icons/si';
import { BsFillPostcardHeartFill } from 'react-icons/bs';
import { FaUserFriends } from 'react-icons/fa';
import Tippy from '@tippyjs/react/headless';

import UserPreview from '../../components/User/UserPreview';
import NavMenu from '../../components/NavMenu';
import { NavLink } from 'react-router-dom';
import Post from '../../components/Post/Post';
import Avatar from '../../components/Image/Avatar';
import UserSuggestLoading from '../../components/LoadingSkeleton/User/UserSuggestLoading';

const SearchUsersPage = () => {
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
            title: 'Tất cả',
            icon: <SiPowerpages />,
            path: `/search/all?q=${queryValue}`,
            mainPath: '/search/all',
        },
        {
            title: 'Bài viết',
            icon: <BsFillPostcardHeartFill />,
            path: `/search/posts?q=${queryValue}`,
            mainPath: '/search/posts',
        },
        {
            title: 'Mọi người',
            icon: <FaUserFriends />,
            path: `/search/users?q=${queryValue}`,
            mainPath: '/search/users',
        },
    ];

    return (
        <>
            <NavMenu />
            <div className="xs:pt-[96px] md:pt-0 md:mt-[56px] bg-[#ebedf0]">
                <div className="md:flex ">
                    {/* Sidebar left */}
                    <div className="xs:hidden md:block md:w-[240px] lg:w-[360px]">
                        <div className="md:w-[240px] lg:w-[360px] xs:hidden md:block fixed h-[calc(h-screen_-_56px)] left-0 top-[56px] bg-white shadow-lg shadow-[rgba(0,0,0,0.3)] bottom-0 py-2 px-3">
                            <div className="py-2 border-b border-[#ccc]">
                                <h2 className="text-[20px] font-bold">Kết quả tìm kiếm</h2>
                            </div>
                            <div className="">
                                <div className="py-2">
                                    <h2 className=" font-semibold">Bộ lọc</h2>
                                </div>
                                <div>
                                    {navSidebarLeftLinks.map((nav, i) => {
                                        return (
                                            <NavLink
                                                className={`flex items-center py-1.5 rounded-[6px] cursor-pointer  ${pathname === nav.mainPath ? 'bg-[#ebedf0]' : 'hover:bg-[#d2d2d2]'}`}
                                                to={nav.path}
                                                key={i}
                                            >
                                                <div
                                                    className={`p-2  rounded-[50%]  ${pathname === nav.mainPath ? 'text-white bg-[#386fd6]' : 'text-[#212121] bg-[#ebedf0]'}   `}
                                                >
                                                    {nav.icon}
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
                    <div className=" xs:w-full md:w-[calc(100vw_-_240px)] lg:w-[calc(100vw_-_360px)] min-h-screen">
                        <div className="flex-center ">
                            <div className="md:px-2 xs:w-full md:w-full md:max-w-[680px]">
                                {/*Users*/}

                                <div className="h-fit   bg-white mt-3 rounded-lg">
                                    {/*  */}
                                    <div className="flex justify-between p-2 rounded-lg bg-white">
                                        <Tippy
                                            interactive={true}
                                            placement="bottom-start"
                                            delay={[400, 0]}
                                            render={(attrs) => (
                                                <div
                                                    className="bg-white shadow-md w-[340px] rounded-[6px] transition absolute left-[-100px] top-[-10px]"
                                                    tabIndex="-1"
                                                    {...attrs}
                                                >
                                                    <UserPreview />
                                                </div>
                                            )}
                                        >
                                            <div className="flex  items-center">
                                                <Link className="cursor-pointer" to={'/user/123'}>
                                                    <Avatar
                                                        className={
                                                            'rounded-[50%] w-[60px] h-[60px] border border-[#ccc] '
                                                        }
                                                        src={
                                                            'https://scontent.fhan20-1.fna.fbcdn.net/v/t39.30808-1/429789909_2874433909365285_7173659383742414004_n.jpg?stp=cp0_dst-jpg_p60x60&_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=34ewEQPzElcQ7kNvgH2RU5t&_nc_ht=scontent.fhan20-1.fna&oh=00_AYAa_fvhDB3rXLfqgNKn_Yc7QarPRsHhW9pP83Lg2Qe2AQ&oe=6650C852'
                                                        }
                                                        alt={'avatar'}
                                                    />
                                                </Link>
                                                <div className="ml-3 flex flex-col justify-center">
                                                    <Link
                                                        className="text-[15px] font-semibold cursor-pointer"
                                                        to={'/user/123'}
                                                    >
                                                        Nguyễn Đình Tú
                                                    </Link>
                                                    <div className="text-[12px] text-[#65676B]">
                                                        <span className="">Sống tại Hà Nội</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Tippy>
                                        <div className="flex-center">
                                            <button className="font-semibold px-2 py-0.5 bg-red-100 rounded-[4px] hover:bg-red-200 text-red-500">
                                                Thêm bạn bè
                                            </button>
                                        </div>
                                    </div>
                                    {/*  */}
                                </div>
                                <div className="my-2">
                                    {/* Loading demo */}
                                    <UserSuggestLoading className={'bg-white'} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchUsersPage;
