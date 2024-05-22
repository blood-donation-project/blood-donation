import Skeleton from 'react-loading-skeleton';

const UserFriendLoading = ({ className }) => {
    return (
        <div className={className}>
            <div>
                <Skeleton containerClassName="object-cover w-full h-full aspect-square rounded-[8px]" />
            </div>
        </div>
    );
};

export default UserFriendLoading;
