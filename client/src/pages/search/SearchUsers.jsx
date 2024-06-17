import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
import { resetSearchUsersData } from '../../Redux/features/search/searchSlice';
import { useSearchUsersMutation } from '../../Redux/features/search/searchAPI';
import UserFriendLoading from '../../components/LoadingSkeleton/User/UserFriendLoading';
import InfiniteScroll from 'react-infinite-scroll-component';
import NoResult from '../../components/NoResult';
import UserSearchDetail from '../../components/User/UserSearchDetail';

const SearchUsersPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const queryValue = searchParams.get('q');
    const { pathname } = useLocation();
    const dispatch = useDispatch();

    const [page, setPage] = useState(1);
    const [paginationUser, setPaginationUser] = useState();
    const [hasMore, setHasMore] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const { usersData } = useSelector((state) => state.search);
    const [searchUsers] = useSearchUsersMutation();

    useEffect(() => {
        window.scrollTo(0, 0);

        return () => {
            dispatch(resetSearchUsersData());
        };
    }, [dispatch]);

    useEffect(() => {
        if (queryValue === '' || queryValue === undefined || queryValue === null) {
            navigate('/404');
        }
        const fetch = async () => {
            searchUsers({ q: queryValue, limit: 5, page: page })
                .unwrap()
                .then((res) => {
                    if (isLoading) setIsLoading(false);
                    setPaginationUser(res.pagination);
                });
        };
        fetch();
    }, [queryValue, page]);

    useEffect(() => {
        if (paginationUser?.links.next) {
            setHasMore(true);
        } else {
            setHasMore(false);
        }
    }, [paginationUser]);

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
                            <div className="xs:mt-2 md:mt-0 md:p-2 xs:w-full md:w-full md:max-w-[680px]">
                                {/*Users*/}
                                {isLoading ? (
                                    <div className="h-fit  bg-white rounded-lg">
                                        <UserFriendLoading />
                                    </div>
                                ) : (
                                    usersData.length > 0 && (
                                        <InfiniteScroll
                                            dataLength={usersData.length}
                                            next={() => {
                                                setPage((prev) => prev + 1);
                                            }}
                                            hasMore={hasMore}
                                            loader={<UserFriendLoading />}
                                            scrollThreshold="100px"
                                        >
                                            {usersData.map((user, index) => {
                                                return (
                                                    <div className="mb-2">
                                                        <UserSearchDetail key={index} userData={user} />
                                                    </div>
                                                );
                                            })}
                                        </InfiniteScroll>
                                    )
                                )}
                                {!isLoading && usersData.length === 0 && <NoResult />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchUsersPage;
