import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import UserFriend from '../../components/User/UserFriend';
import NoFriends from '../../components/NoFriends';
import UserFriendProfileLoading from '../../components/LoadingSkeleton/User/UserFriendProfileLoading';
import { useGetAllFriendsMutation } from '../../Redux/features/friend/friendAPI';
import { resetFriends } from '../../Redux/features/friend/friendSlice';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useAutoRefreshToken } from '../../hooks/useAutoRefreshToken';

const FriendsPage = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const { friends } = useSelector((state) => state.friend);

    const [pagination, setPagination] = useState();
    const [hasMore, setHasMore] = useState(false);
    const [tokenRefreshed, setTokenRefreshed] = useState(false);
    useAutoRefreshToken('/home/', setTokenRefreshed);

    const [getAllFriends, { isLoading }] = useGetAllFriendsMutation();

    const fetchFriends = async (page) => {
        await getAllFriends({
            userId: user?._id,
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
    }, []);
    useEffect(() => {
        if (user?._id && tokenRefreshed) {
            fetchFriends();
        }
    }, [user?._id, tokenRefreshed]);

    useEffect(() => {
        if (pagination?.links.next) {
            setHasMore(true);
        } else {
            setHasMore(false);
        }
    }, [pagination]);

    return (
        <div className="w-full">
            {friends ? (
                <InfiniteScroll
                    className=" grid xs:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 py-2 px-5 items-stretch"
                    dataLength={friends.length}
                    next={() => {
                        fetchFriends(pagination?.currentPage + 1);
                    }}
                    hasMore={hasMore}
                    loader={
                        <div className="grid lg:grid-cols-5 md:grid-cols-4 xs:grid-cols-2 gap-3 py-3 px-5">
                            {new Array(5).fill(0).map((_, index) => {
                                return <UserFriendProfileLoading key={index} />;
                            })}
                        </div>
                    }
                    scrollThreshold="100px"
                >
                    {friends.map((user, index) => {
                        return <UserFriend className={'h-full'} key={index} userData={user} />;
                    })}
                </InfiniteScroll>
            ) : (
                <div className="grid lg:grid-cols-5 md:grid-cols-4 xs:grid-cols-2 gap-3 py-3 px-5">
                    {new Array(5).fill(0).map((_, index) => {
                        return <UserFriendProfileLoading key={index} />;
                    })}
                </div>
            )}
            {/* No result example */}
            {!isLoading && friends.length === 0 && (
                <div className=" h-screen w-full flex-center">
                    <NoFriends />
                </div>
            )}
        </div>
    );
};

export default FriendsPage;
