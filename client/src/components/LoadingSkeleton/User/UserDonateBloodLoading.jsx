import Skeleton from 'react-loading-skeleton';

const UserDonateBloodLoading = () => {
    return (
        <div className="bg-white rounded-[8px] overflow-hidden ">
            <Skeleton className="h-[70%] !leading-[1.75rem]" />

            <div className="flex flex-col justify-center px-2 py-1">
                <div>
                    <Skeleton />
                </div>
                <div>
                    <Skeleton width={50} />
                </div>
                <div>
                    <Skeleton width={90} />
                </div>
                \
            </div>
        </div>
    );
};

export default UserDonateBloodLoading;
