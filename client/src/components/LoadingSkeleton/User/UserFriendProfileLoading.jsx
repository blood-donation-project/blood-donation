import Skeleton from 'react-loading-skeleton';

const UserFriendProfileLoading = ({ className }) => {
    return (
        <div className="bg-white rounded-[8px] overflow-hidden ">
            <Skeleton className="h-[210px] !leading-[1.75rem]" />

            <div className="flex flex-col justify-center px-2 py-1">
                <div>
                    <Skeleton />
                </div>
            </div>
        </div>
    );
};

export default UserFriendProfileLoading;
