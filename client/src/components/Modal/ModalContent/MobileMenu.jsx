import { useState } from 'react';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { BsMessenger } from 'react-icons/bs';
import { HiMiniUsers } from 'react-icons/hi2';
import { FaBell } from 'react-icons/fa';
import { MdEvent } from 'react-icons/md';
import { LuLogOut } from 'react-icons/lu';


const MobileMenu = ({ hideModal }) => {
    const [searchText, setSearchText] = useState('');
    const searchInputChange = (e) => {
        const value = e.target.value;
        if (value.startsWith(' ')) return;
        setSearchText(value);
    };

    const searchInputKeyDown = (e) => {
        if ((e.key === 'Enter' || e.keyCode === 13) && searchText.length > 0) {
            window.location.href = `/search/all?q=${searchText}`;
        }
    };

    return (
        <div className=" z-[9] w-full h-full bg-[#ebedf0] relative">
            {/* Header */}
            <div className=" h-[44px] text-center  border-b boder-b-[#ccc]  items-center bg-white flex ">
                <div className="w-[44px] h-full flex-center cursor-pointer hover:bg-[#ebedf0]" onClick={hideModal}>
                    <FaArrowLeftLong />
                </div>
                <div className="px-2 py-2 ">
                    <h3 className="text-semibold text-[18px]">Menu</h3>
                </div>
            </div>
            {/* Content */}
            <div className=" overflow-y-auto w-full h-full rounded-[10px] p-2">
                {/* Link profile */}
                <div className="bg-white rounded-lg shadow  mb-2">
                    <Link className="flex items-center py-2.5 px-2 hover:bg-[#ebedf0]   rounded-md" to="/user/123">
                        <div>
                            {/* <Avatar
                                className="w-9 h-9 rounded-[50%] border border-[#ccc]"
                                src="https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-1/329007355_5877024832378876_105945048897552486_n.jpg?stp=dst-jpg_p111x111&_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=lX3PfZ5K7WsQ7kNvgF8tMYE&_nc_ht=scontent.fhan2-3.fna&oh=00_AYCnQUCyq4KDq4Bt3bEbopzMjdxg8nMxgBPhfHuOmOEM1Q&oe=664A370D"
                                alt="avatar"
                            /> */}
                        </div>
                        <div className="ml-2">
                            <p className="text-[14px] font-semibold leading-[14px]">Hoàng Xuân Việt</p>
                            <span className="text-[14px] text-[#65676B]">Xem trang cá nhân của bạn</span>
                        </div>
                    </Link>
                </div>
                {/* Other links */}
                <div className="grid grid-cols-2 gap-2 mb-2">
                    <div className=" bg-white rounded-lg shadow">
                        <Link
                            className="flex flex-col  py-2.5 px-2  justify-center hover:bg-[#ebedf0] pl-2  rounded-md"
                            to="/"
                        >
                            <div className="text-[20px]">
                                <BsMessenger />
                            </div>
                            <div className="mt-2">
                                <p className="text-[14px] font-semibold leading-[14px]">Tin nhắn</p>
                            </div>
                        </Link>
                    </div>
                    <div className=" bg-white rounded-lg shadow  ">
                        <Link
                            className="flex flex-col justify-center hover:bg-[#ebedf0] py-2.5 px-2 pl-2  rounded-md"
                            to="/"
                        >
                            <div className="text-[20px]">
                                <HiMiniUsers />
                            </div>
                            <div className="mt-2">
                                <p className="text-[14px] font-semibold leading-[14px]">Bạn bè</p>
                            </div>
                        </Link>
                    </div>
                    <div className=" bg-white rounded-lg shadow">
                        <Link
                            className="flex flex-col justify-center  py-2.5 px-2  hover:bg-[#ebedf0] pl-2  rounded-md"
                            to="/notifications"
                        >
                            <div className="text-[20px]">
                                <FaBell />
                            </div>
                            <div className="mt-2">
                                <p className="text-[14px] font-semibold leading-[14px]">Thông báo</p>
                            </div>
                        </Link>
                    </div>
                    <div className=" bg-white rounded-lg shadow  ">
                        <Link
                            className="flex flex-col justify-center py-2.5 px-2 hover:bg-[#ebedf0] pl-2  rounded-md"
                            to="/"
                        >
                            <div className="text-[20px]">
                                <MdEvent />
                            </div>
                            <div className="mt-2">
                                <p className="text-[14px] font-semibold leading-[14px]">Sự kiện</p>
                            </div>
                        </Link>
                    </div>
                </div>
                {/* Log out */}
                <div className="bg-white rounded-lg shadow  mb-2">
                    <Link className="flex items-center hover:bg-[#ebedf0] py-2.5 px-2 rounded-md" to="/">
                        <div className="h-9 w-9 flex-center">
                            <LuLogOut />
                        </div>
                        <div className="ml-2">
                            <p className="text-[14px] font-semibold leading-[14px]">Đăng xuất</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MobileMenu;
