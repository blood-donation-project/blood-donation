import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { SiPowerpages } from 'react-icons/si';
import { BsFillPostcardHeartFill } from 'react-icons/bs';
import { FaUserFriends } from 'react-icons/fa';
import Tippy from '@tippyjs/react/headless';

import UserPreview from '../../components/User/UserPreview';
import NoResult from '../../components/NoResult';
import NavMenu from '../../components/NavMenu';
import { NavLink } from 'react-router-dom';
import Post from '../../components/Post/Post';
import Avatar from '../../components/Image/Avatar';

const SearchAllPage = () => {
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
                        {/* <div className="flex-center">
                            <div>
                              
                                <div className="h-fit w-[680px] bg-white mt-3 rounded-lg">
                                    <div className="p-2">
                                        <h3 className="font-bold ">Mọi người</h3>
                                    </div>
                                    <div>
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
                                                <Link className="flex cursor-pointer items-center" to={'/user/123'}>
                                                    <Avatar
                                                        className={
                                                            'rounded-[50%] w-[60px] h-[60px] border border-[#ccc] '
                                                        }
                                                        src={
                                                            'https://scontent.fhan20-1.fna.fbcdn.net/v/t39.30808-1/429789909_2874433909365285_7173659383742414004_n.jpg?stp=cp0_dst-jpg_p60x60&_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=34ewEQPzElcQ7kNvgH2RU5t&_nc_ht=scontent.fhan20-1.fna&oh=00_AYAa_fvhDB3rXLfqgNKn_Yc7QarPRsHhW9pP83Lg2Qe2AQ&oe=6650C852'
                                                        }
                                                        alt={'avatar'}
                                                    />
                                                    <div className="ml-3 flex flex-col justify-center">
                                                        <h4 className="text-[15px] font-semibold">Nguyễn Đình Tú</h4>
                                                        <div className="text-[12px] text-[#65676B]">
                                                            <span className="">Sống tại Hà Nội</span>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </Tippy>
                                            <div className="flex-center">
                                                <button className="font-semibold px-2 py-0.5 bg-red-100 rounded-[4px] hover:bg-red-200 text-red-500">
                                                    Thêm bạn bè
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                          
                                <div className="h-fit w-[680px] mt-3">
                                    <Post />
                                </div>
                            </div>
                        </div> */}

                        {/* No result example */}
                        <NoResult />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchAllPage;
