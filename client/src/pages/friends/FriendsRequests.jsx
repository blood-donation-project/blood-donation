import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import UserRequest from '../../components/User/UserRequest';
import NoFriendsRequest from '../../components/NoFriendsRequest';

import UserFriendProfileLoading from '../../components/LoadingSkeleton/User/UserFriendProfileLoading';
import { useGetFriendRequestsMutation } from '../../Redux/features/friend/friendAPI';
import { resetFriendRequests } from '../../Redux/features/friend/friendSlice';
import InfiniteScroll from 'react-infinite-scroll-component';

const FriendsSuggest = () => {
    const dispatch = useDispatch();
    const { friendRequests } = useSelector((state) => state.friend);

    const [pagination, setPagination] = useState();
    const [hasMore, setHasMore] = useState(false);

    const [getFriendRequests, { isLoading }] = useGetFriendRequestsMutation();

    const fetchFriendRequests = (page) => {
        getFriendRequests({
            limit: 15,
            page: page || 1,
        })
            .unwrap()
            .then((res) => {
                setPagination(res.pagination);
            });
    };

    useEffect(() => {
        dispatch(resetFriendRequests());
        fetchFriendRequests();
    }, []);

    useEffect(() => {
        if (pagination?.links.next) {
            setHasMore(true);
        } else {
            setHasMore(false);
        }
    }, [pagination]);

    return (
        <div className="xs:w-full md:w-[calc(100vw_-_240px)] lg:w-[calc(100vw_-_360px)] min-h-screen">
            {friendRequests ? (
                <InfiniteScroll
                    className="mt-3 grid xs:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 py-2 px-5"
                    dataLength={friendRequests.length}
                    next={() => {
                        fetchFriendRequests(pagination?.currentPage + 1);
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
                    {friendRequests.map((request, index) => {
                        return <UserRequest key={index} userData={request} />;
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
            {!isLoading && friendRequests.length === 0 && (
                <div className=" h-screen w-full flex-center">
                    <NoFriendsRequest />
                </div>
            )}
        </div>
    );
};

export default FriendsSuggest;
