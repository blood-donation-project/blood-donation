import { useState } from 'react';
import NavMenu from '../../components/NavMenu';

const Notification = () => {
    const [activeId, setActiveId] = useState('1');
    const handleDivClick = (e) => {
        const dataId = e.currentTarget.getAttribute('data-id');
        setActiveId(dataId);
    };
    return (
        <>
            <NavMenu />
            <div className="flex justify-center xs:mt-[96px] md:mt-[50px] py-3  min-h-screen bg-[#f0f2f5] ">
                {/* Content */}
                <div className=" xs:w-full h-fit md:w-[680px] md:px-4 bg-white shadow-md  md:rounded-[10px]">
                    <div className="">
                        <div className="p-2">
                            <h1 className="text-[22px] font-bold">Thông báo</h1>
                            <div className="flex mt-4">
                                <div
                                    className={`mr-2 transition text-[14px] cursor-pointer px-2 rounded-[10px] hover:bg-[#ebedf0] ${activeId === '1' ? 'font-semibold text-red-500 bg-red-100' : ''}`}
                                    data-id="1"
                                    onClick={handleDivClick}
                                >
                                    <span>Tất cả</span>
                                </div>
                                <div
                                    className={`mr-2 transition text-[14px] cursor-pointer px-2 rounded-[10px] hover:bg-[#ebedf0] ${activeId === '2' ? 'font-semibold text-red-500 bg-red-100' : ''}`}
                                    data-id="2"
                                    onClick={handleDivClick}
                                >
                                    <span>Chưa đọc</span>
                                </div>
                            </div>
                            {/* Map dữ liệu thông báo từ api */}
                            <div className="grid pt-6">
                                <div className="flex hover:cursor-pointer hover:bg-[#ebedf0] px-2 py-2 rounded">
                                    <div>
                                        <img
                                            className="w-9 h-9 rounded-[50%]"
                                            src="https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-1/434757841_395354200092792_2139257770690806498_n.jpg?stp=cp0_dst-jpg_p80x80&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=YY8lMEJqW1sQ7kNvgG3k6WG&_nc_ht=scontent.fhan2-3.fna&oh=00_AYA_6rUZKprqrqSjicyaPOwMxHsCsjirnFsn_zO-cG5IMA&oe=66494E8C"
                                            alt="avatar"
                                        />
                                    </div>
                                    <div className="ml-2">
                                        <p className="text-[14px] leading-[14px]">
                                            Thông báo cái gì đó chưa nghiên cứu
                                        </p>
                                        <span className="text-[12px]">9 Giờ trước</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Notification;
