import { IoMdClose } from 'react-icons/io';
import { FaArrowLeftLong } from 'react-icons/fa6';

const UserRoundingFilter = ({ accountId, hideModal, isShowing }) => {
    return (
        <div className=" z-[9] xs:w-full md:w-[700px] xs:h-screen md:h-[calc(100vh_-_60px)] bg-white md:rounded-[10px] md:shadow-lg md:shadow-[rgba(0,0,0,0.4)]   relative">
            <div className={`box-zoom-in   h-[100%]  `}>
                <div className="  md:flex-center xs:flex   h-[50px] border-b border-b-[#ccc]">
                    <span
                        className="w-[50px] h-[50px] md:hidden flex-center text-[18px]     hover:bg-[#f1f5f9] cursor-pointer"
                        onClick={hideModal}
                    >
                        <i>
                            <FaArrowLeftLong />
                        </i>
                    </span>
                    <div className="flex items-center md:justify-center md:w-full">
                        <h3 className="text-[18px] font-semibold">Bộ lọc</h3>
                    </div>
                    <span
                        className="w-[36px] xs:hidden md:flex text-[18px] h-[36px] flex-center absolute right-4 top-2 rounded-[50%] bg-[#f1f5f9] cursor-pointer"
                        onClick={hideModal}
                    >
                        <i>
                            <IoMdClose />
                        </i>
                    </span>
                </div>
                <div className="p-2 h-[calc(100%_-_50px)] overflow-y-scroll">
                    <div>
                        <div className="mb-4">
                            {' '}
                            <div>
                                <h3>Thành phố/Tỉnh thành</h3>
                            </div>
                            <select className="bg-[#ebedf0] w-full rounded outline-none cursor-pointer mt-2 py-1">
                                <option>Hà Nội</option>
                                <option>Hồ Chí Minh</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            {' '}
                            <div>
                                <h3>Vai trò</h3>
                            </div>
                            <select className="bg-[#ebedf0] w-full rounded outline-none cursor-pointer mt-2 py-1">
                                <option>Người hiến máu</option>
                                <option>Người nhận máu</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            {' '}
                            <div>
                                <h3>Nhóm máu</h3>
                            </div>
                            <select className="bg-[#ebedf0] w-full rounded outline-none cursor-pointer mt-2 py-1">
                                <option>A</option>
                                <option>B</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <button className="w-full py-2 flex-center bg-red-500 text-white rounded font-semibold hover:bg-red-600">
                            Tìm kiếm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserRoundingFilter;
