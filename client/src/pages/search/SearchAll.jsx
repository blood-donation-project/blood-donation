import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { SiPowerpages } from 'react-icons/si';
import { BsFillPostcardHeartFill } from 'react-icons/bs';
import { FaUserFriends } from 'react-icons/fa';
import Tippy from '@tippyjs/react/headless';
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

import { useSearchPostsMutation, useSearchUsersMutation } from '../../Redux/features/search/searchAPI';
import UserPreview from '../../components/User/UserPreview';
import NoResult from '../../components/NoResult';
import NavMenu from '../../components/NavMenu';
import { NavLink } from 'react-router-dom';
import Post from '../../components/Post/Post';
import Avatar from '../../components/Image/Avatar';
import UserSearchDetail from '../../components/User/UserSearchDetail';
import UserFriendLoading from '../../components/LoadingSkeleton/User/UserFriendLoading';
import PostLoading from '../../components/LoadingSkeleton/Post/PostLoading';
import { resetSearchPostsData, resetSearchUsersData } from '../../Redux/features/search/searchSlice';

const SearchAllPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const queryValue = searchParams.get('q');
    const { pathname } = useLocation();
    const dispatch = useDispatch();

    const [page, setPage] = useState(1);
    const [paginationPost, setPaginationPost] = useState();
    const [hasMore, setHasMore] = useState(false);
    const [searched, setSearched] = useState(false);
    const [isLoadingSearchPosts, setIsLoadingSearchPosts] = useState(true);

    const { usersData, postsData } = useSelector((state) => state.search);
    const [searchPosts] = useSearchPostsMutation();
    const [searchUsers, { isLoading: isLoadingSearchUsers }] = useSearchUsersMutation();

    useEffect(() => {
        if (queryValue === '' || queryValue === undefined || queryValue === null) {
            navigate('/404');
        }

        const fetch = async () => {
            if (!searched) {
                await searchUsers({ q: queryValue, limit: 5, page: page })
                    .unwrap()
                    .then(() => {
                        setSearched(true);
                    });
            }

            await searchPosts({ q: queryValue, limit: 5, page: page })
                .unwrap()
                .then((res) => {
                    setIsLoadingSearchPosts(false);
                    setPaginationPost(res.pagination);
                })
                .catch(() => {
                    setIsLoadingSearchPosts(false);
                });
        };

        fetch();
    }, [queryValue, page]);

    useEffect(() => {
        window.scrollTo(0, 0);

        return () => {
            dispatch(resetSearchUsersData());
            dispatch(resetSearchPostsData());
        };
    }, [dispatch]);

    useEffect(() => {
        if (paginationPost?.links.next) {
            setHasMore(true);
        } else {
            setHasMore(false);
        }
    }, [paginationPost]);

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
                        <div className="md:w-[240px] lg:w-[360px] xs:hidden md:block fixed h-[calc(h-screen_-_56px)] left-0 top-[56px] bg-white shadow-lg shadow-[rgba(0,0,0,0.3)] bottom-0 py-2 px-3 ">
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

                    {/* Sencondary nav mobile  */}
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
                        <div className="flex-center">
                            <div className="xs:mt-2 md:mt-0 w-full md:max-w-[680px] md:p-2 ">
                                {/* User */}
                                {isLoadingSearchUsers ? (
                                    <div className="h-fit   bg-white rounded-lg">
                                        <UserFriendLoading />
                                    </div>
                                ) : (
                                    usersData.length > 0 && (
                                        <div className="h-fit p-2  bg-white  rounded-lg">
                                            <div className="">
                                                <h3 className="font-bold ">Mọi người</h3>
                                            </div>
                                            <div>
                                                {usersData.map((user, index) => {
                                                    return <UserSearchDetail key={index} userData={user} />;
                                                })}
                                            </div>
                                        </div>
                                    )
                                )}
                                {/* Post */}
                                {isLoadingSearchPosts ? (
                                    <div className="h-fit mt-3 ">
                                        <PostLoading />
                                    </div>
                                ) : (
                                    postsData.length > 0 && (
                                        <InfiniteScroll
                                            dataLength={postsData.length}
                                            next={() => {
                                                setPage((prev) => prev + 1);
                                            }}
                                            hasMore={hasMore}
                                            loader={<PostLoading />}
                                            scrollThreshold="100px"
                                        >
                                            {postsData.map((post, index) => {
                                                return <Post key={index} postData={post} />;
                                            })}
                                        </InfiniteScroll>
                                    )
                                )}
                            </div>
                        </div>

                        {!isLoadingSearchPosts &&
                            !isLoadingSearchUsers &&
                            postsData.length === 0 &&
                            usersData.length === 0 && <NoResult />}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchAllPage;
