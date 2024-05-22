import Skeleton from 'react-loading-skeleton';

const PostLoading = () => {
    return (
        <div className=" bg-white rounded-[8px] shadow mb-3  ">
            <div className="px-2 py-3 ">
                {/* Thông tin người đăng */}
                <div className="flex">
                    <div>
                        <Skeleton width={40} height={40} borderRadius={50} />
                    </div>
                    <div className="ml-2 flex flex-col">
                        <Skeleton width={150} />
                        <Skeleton width={50} />
                    </div>
                </div>

                {/* Mô tả bài đăng */}
                <div className="">
                    <Skeleton width={200} />
                </div>
            </div>

            {/* Hình ảnh/Video nếu có */}
            <div className=" flex-center cursor-pointer">
                <Skeleton containerClassName="w-full" height={400} />
            </div>

            {/* Bình luận/cảm xúc */}
            <div className="px-2 py-1">
                <div className="flex py-1 justify-between border-b border-b-[#ccc]">
                    <Skeleton width={60} />
                    <Skeleton width={60} />
                </div>
                <div className="flex pt-1">
                    <div className="cursor-pointer flex-center py-1.5 w-[50%] rounded-md hover:bg-[#f0f2f5]">
                        <Skeleton width={80} />
                    </div>
                    <div className="cursor-pointer flex-center py-1.5 w-[50%] rounded-md hover:bg-[#f0f2f5]">
                        <Skeleton width={80} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostLoading;
