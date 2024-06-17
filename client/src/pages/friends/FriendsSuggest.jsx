import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HiMiniUserPlus } from 'react-icons/hi2';
import { HiMiniUsers } from 'react-icons/hi2';

import NavMenu from '../../components/NavMenu';
import { NavLink } from 'react-router-dom';
import { RiUserShared2Fill } from 'react-icons/ri';
import UserSuggest from '../../components/User/UserSuggest';
import UserFriendProfileLoading from '../../components/LoadingSkeleton/User/UserFriendProfileLoading';
import { useGetSuggestedUsersMutation } from '../../Redux/features/friend/friendAPI';
import { resetSuggestedFriends } from '../../Redux/features/friend/friendSlice';
import InfiniteScroll from 'react-infinite-scroll-component';

const FriendsSuggest = () => {
    const dispatch = useDispatch();
    const { suggestedFriends } = useSelector((state) => state.friend);

    const [pagination, setPagination] = useState();
    const [hasMore, setHasMore] = useState(false);

    const [getSuggestedUsers, { isLoading }] = useGetSuggestedUsersMutation();

    const fetchFriends = (page) => {
        getSuggestedUsers({
            limit: 15,
            page: page || 1,
        })
            .unwrap()
            .then((res) => {
                setPagination(res.pagination);
            });
    };

    useEffect(() => {
        dispatch(resetSuggestedFriends());
        fetchFriends();
    }, []);

    useEffect(() => {
        if (pagination?.links.next) {
            setHasMore(true);
        } else {
            setHasMore(false);
        }
    }, [pagination]);

    return (
        <div className="w-full">
            {suggestedFriends ? (
                <InfiniteScroll
                    className="mt-3 grid xs:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 py-2 px-5"
                    dataLength={suggestedFriends.length}
                    next={() => {
                        fetchFriends(pagination?.currentPage + 1);
                    }}
                    hasMore={hasMore}
                    loader={
                        <div className="grid lg:grid-cols-5 md:grid-cols-4 xs:grid-cols-2 gap-3 py-2 px-5">
                            {new Array(5).fill(0).map((_, index) => {
                                return <UserFriendProfileLoading key={index} />;
                            })}
                        </div>
                    }
                    scrollThreshold="100px"
                >
                    {suggestedFriends.map((user, index) => {
                        return <UserSuggest key={index} userData={user} />;
                    })}
                </InfiniteScroll>
            ) : (
                <div className="grid lg:grid-cols-5 md:grid-cols-4 xs:grid-cols-2 gap-3 py-2 px-5">
                    {new Array(5).fill(0).map((_, index) => {
                        return <UserFriendProfileLoading key={index} />;
                    })}
                </div>
            )}
        </div>
    );
};

export default FriendsSuggest;
