import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { IoMdSearch } from 'react-icons/io';
import { useGetAllFriendsMutation, useSearchMyFriendsMutation } from '../../Redux/features/friend/friendAPI';
import UserFriendProfileLoading from '../../components/LoadingSkeleton/User/UserFriendProfileLoading';
import { resetFriends, resetSearchMyFriends } from '../../Redux/features/friend/friendSlice';
import InfiniteScroll from 'react-infinite-scroll-component';
import UserFriendProfile from '../../components/User/UserFriendProfile';
import useDebounce from '../../hooks/useDebounce';
import { useAutoRefreshToken } from '../../hooks/useAutoRefreshToken';

const ProfileFriendsPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { friends, searchFriends } = useSelector((state) => state.friend);
    const { otherUser } = useSelector((state) => state.user);
    const [isLoadingSearchFriend, setIsLoadingSearchFriend] = useState(false);
    const [tokenRefreshed, setTokenRefreshed] = useState(false);
    useAutoRefreshToken('/home/', setTokenRefreshed);

    const [getAllFriends, { isLoading }] = useGetAllFriendsMutation();
    const [searchMyFriends] = useSearchMyFriendsMutation();

    const [pagination, setPagination] = useState();
    const [searchText, setSearchText] = useState('');
    const [hasMore, setHasMore] = useState(false);

    const debounce = useDebounce(searchText, 500);

    useEffect(() => {
        if (!debounce) {
            return;
        }
        searchMyFriends({ q: debounce })
            .unwrap()
            .then(() => {
                setIsLoadingSearchFriend(false);
            });
    }, [debounce]);

    const fetchFriends = async (page) => {
        await getAllFriends({
            userId: id,
            limit: 15,
            page: page || 1,
        })
            .unwrap()
            .then((res) => {
                setPagination(res.pagination);
            });
    };

    useEffect(() => {
        dispatch(resetFriends());
        if (tokenRefreshed) fetchFriends();
    }, [tokenRefreshed]);

    useEffect(() => {
        if (pagination?.links.next) {
            setHasMore(true);
        } else {
            setHasMore(false);
        }
    }, [pagination]);

    const onSearchChange = (e) => {
        const value = e.target.value;
        if (value.length === 0) dispatch(resetSearchMyFriends());
        if (value.startsWith(' ')) return;
        setIsLoadingSearchFriend(true);

        setSearchText(value);
    };

    return (
        <div>
            {/* Body content */}
            <div className="bg-gray-200 pt-4 pb-10 min-h-[calc(100vh_-_636px)] ">
                <div className="max-w-[1150px] mx-auto md:px-4">
                    <div className="bg-white p-4 md:rounded-lg overflow-hidden">
                        {/*  */}
                        <div className="flex justify-between">
                            <div>
                                {otherUser?.role === 'Cơ sở y tế' ? (
                                    <h3 className="text-[18px] font-bold">Người theo dõi</h3>
                                ) : (
                                    <h3 className="text-[18px] font-bold">Bạn bè</h3>
                                )}
                            </div>
                            <div>
                                <div className=" ml-2 px-2 py-[6px] flex bg-[#f0f2f5] justify-center items-center rounded-[50px]">
                                    <IoMdSearch className="text-[#65676B] text-[20px]" />
                                    <input
                                        className="px-1 text-[16px] bg-transparent outline-none"
                                        placeholder="Tìm kiếm "
                                        value={searchText}
                                        onChange={onSearchChange}
                                    />
                                </div>
                            </div>
                        </div>

                        {/*  */}
                        {searchText.length > 0 ? (
                            <div className="mt-4">
                                <div className="">
                                    {isLoadingSearchFriend ? (
                                        <div className=" xs:grid-cols-2 sm:grid-cols-4 md:grid-cols-6 grid  gap-4 ">
                                            {new Array(6).fill(0).map((_, i) => {
                                                return <UserFriendProfileLoading key={i} className="p-2" />;
                                            })}
                                        </div>
                                    ) : searchFriends.length === 0 ? (
                                        <div className="py-6 flex-center">
                                            <span className="text-[#65676B] font-semibold">
                                                Không có kết quả cho: {searchText}
                                            </span>
                                        </div>
                                    ) : (
                                        <div className=" xs:grid-cols-2 sm:grid-cols-4 md:grid-cols-6 grid  gap-4 ">
                                            {searchFriends.map((friend, i) => {
                                                return (
                                                    <div className=" aspect-square cursor-pointer" key={i}>
                                                        <UserFriendProfile
                                                            className=" object-cover w-full h-full"
                                                            friendData={friend}
                                                        />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="mt-4">
                                <div className="">
                                    {isLoading ? (
                                        <div className=" xs:grid-cols-2 sm:grid-cols-4 md:grid-cols-6 grid  gap-4 ">
                                            {new Array(9).fill(0).map((_, i) => {
                                                return <UserFriendProfileLoading key={i} className="p-2" />;
                                            })}
                                        </div>
                                    ) : (
                                        <InfiniteScroll
                                            className="  xs:grid-cols-2 sm:grid-cols-4 md:grid-cols-6 grid  gap-4 "
                                            dataLength={friends.length}
                                            next={() => {
                                                fetchFriends(pagination?.currentPage + 1);
                                            }}
                                            hasMore={hasMore}
                                            loader={
                                                <div className=" xs:grid-cols-2 sm:grid-cols-4 md:grid-cols-6 grid  gap-4 ">
                                                    {new Array(9).fill(0).map((img, i) => {
                                                        return (
                                                            <div className=" aspect-square cursor-pointer" key={i}>
                                                                <UserFriendProfileLoading />
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            }
                                            scrollThreshold="100px"
                                        >
                                            {friends.map((friend, i) => {
                                                return (
                                                    <div className=" aspect-square cursor-pointer" key={i}>
                                                        <UserFriendProfile
                                                            className=" object-cover w-full h-full"
                                                            friendData={friend}
                                                        />
                                                    </div>
                                                );
                                            })}
                                        </InfiniteScroll>
                                    )}
                                </div>

                                {!isLoading && friends.length === 0 && (
                                    <div className="flex-center">
                                        <span className="py-2 text-[#65676B] font-medium">
                                            Hiện bạn chưa kết bạn với ai
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileFriendsPage;
