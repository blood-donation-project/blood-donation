import Skeleton from 'react-loading-skeleton';

const UserSuggestLoading = ({ className }) => {
    return (
        <div className={`flex items-center  pl-2 py-1.5 rounded-md` + ' ' + className}>
            <div>
                <Skeleton borderRadius={50} width={36} height={36} />
            </div>
            <div className="ml-2">
                <div>
                    <Skeleton width={100} />
                </div>
                <div>
                    <Skeleton width={80} />
                </div>
            </div>
        </div>
    );
};

export default UserSuggestLoading;
