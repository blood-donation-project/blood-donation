import Skeleton from 'react-loading-skeleton';

const UserBloodDonationFacilityLoading = () => {
    return (
        <div className="flex justify-between p-2 rounded-lg bg-white mb-2">
            <div className="flex cursor-pointer items-center">
                <Skeleton borderRadius={50} width={60} height={60} />

                <div className="ml-3 flex flex-col justify-center">
                    <h4 className="text-[15px] font-semibold">
                        <Skeleton width={150} />
                    </h4>

                    <div className="text-[12px] text-[#65676B] flex items-center">
                        <Skeleton width={70} />
                    </div>
                </div>
            </div>

            <div className="flex-center">
                <div className=" px-2 py-0.5 text-[14px]  text-red-500 flex items-center">
                    <Skeleton width={60} />
                </div>
            </div>
        </div>
    );
};

export default UserBloodDonationFacilityLoading;
