import Skeleton from 'react-loading-skeleton';

const UserFriendLoading = () => {
    return (
        <div className="flex items-center  pl-2 py-1.5 rounded-md">
            <div>
                <Skeleton borderRadius={50} width={36} height={36} />
            </div>
            <div className="ml-2">
                <Skeleton width={100} />
            </div>
        </div>
    );
};

export default UserFriendLoading;
