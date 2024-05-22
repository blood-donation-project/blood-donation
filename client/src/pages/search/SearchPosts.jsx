import { useState, useRef, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { SiPowerpages } from 'react-icons/si';
import { BsFillPostcardHeartFill } from 'react-icons/bs';
import { FaUserFriends } from 'react-icons/fa';

import UserSuggestLoading from '../../components/LoadingSkeleton/User/UserSuggestLoading';
import NavMenu from '../../components/NavMenu';
import { NavLink } from 'react-router-dom';
import Post from '../../components/Post/Post';

const SearchPostsPage = () => {
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
            <div className="mt-[56px]">
                <div className="flex bg-[#ebedf0]">
                    {/* Sidebar left */}
                    <div className="w-[360px]">
                        <div className="fixed h-[calc(h-screen_-_56px)] left-0 top-[56px] bg-white shadow-lg shadow-[rgba(0,0,0,0.3)] bottom-0 py-2 px-3 w-[360px]">
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
                                                className={`flex items-center py-1.5 rounded-[6px] cursor-pointer  ${pathname === nav.mainPath ? 'bg-[#ebedf0]' : 'hover:bg-[#ebedf0]'}`}
                                                to={nav.path}
                                                key={i}
                                            >
                                                <div
                                                    className={`p-2 bg-[#ebedf0] rounded-[50%]  ${pathname === nav.mainPath ? 'text-red-500' : 'text-[#212121]'}  `}
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

                    {/* Content */}
                    <div className=" w-[calc(100vw_-_360px)] min-h-screen">
                        <div className="flex-center">
                            <div>
                                {/*Posts*/}
                                <div className="h-fit w-[680px] mt-3">
                                    <div className="mb-2">
                                        {/* Loading demo */}
                                        <UserSuggestLoading className={'bg-white'} />
                                    </div>
                                    <Post />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchPostsPage;
