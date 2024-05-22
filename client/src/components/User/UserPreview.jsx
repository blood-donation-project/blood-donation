import { Link } from 'react-router-dom';
import { FaLocationDot, FaFacebookMessenger } from 'react-icons/fa6';
import { IoMdPersonAdd } from 'react-icons/io';

import Avatar from '../Image/Avatar';
/*
 -- Props data
    {
        full_name : "Hoang Viet ....",
        avatar : "http://....",
        is_friend : false/true,
        address : "Hai Ba Trung, Ha Noi"
    }
*/
// Data truyền vào sẽ là thoogn tin của người dùng (Họ tên, Avatar, Đã kết bạn hay chưa, sống tại đâu )
const UserPreview = ({ data }) => {
    return (
        <div className="p-4">
            <div className="flex">
                <Link to={'/user/123'}>
                    <Avatar
                        className=" w-20  h-20 rounded-[50%] border border-[#ccc]"
                        src="https://scontent.fhan20-1.fna.fbcdn.net/v/t39.30808-1/441185472_859553369550576_4197182993968662181_n.png?stp=dst-png_p120x120&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=4FR8PvJr70sQ7kNvgH0CKF-&_nc_ht=scontent.fhan20-1.fna&oh=00_AYC5XrkeyvJ_TzA89BxoTt2ENAlVvOu0ufQ7WRq8Uu9t_w&oe=664A21C6"
                        alt="avatar"
                    />
                </Link>
                <div className="ml-2">
                    <Link className="text-[18px] font-bold " to={'/user/123'}>
                        TOP Comments
                    </Link>
                    <div className="flex items-center">
                        <FaLocationDot className="text-[#65676B]" />
                        <span className="text-[#65676B] ml-2">Đến từ Hà Nội</span>
                    </div>
                </div>
            </div>
            <div className="flex justify-between mt-2">
                <button className="flex-center w-[49%] py-1 bg-[#f0f2f5] rounded-[4px] hover:bg-[#d6d8db] ">
                    <IoMdPersonAdd />
                    <span className="ml-2">Thêm bạn bè</span>
                </button>
                <button className="flex-center w-[49%] py-1 bg-red-500 rounded-[4px] text-white hover:bg-red-600">
                    <FaFacebookMessenger />
                    <span className="ml-2">Nhắn tin</span>
                </button>
            </div>
        </div>
    );
};

export default UserPreview;
