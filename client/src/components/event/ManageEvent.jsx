import React, { useState } from 'react';
import schedule from '../../assets/img/schedule.png';
import { IoCreateOutline } from 'react-icons/io5';
import CreateEvent from './CreateEvent';
import imghienmauTPHCM from '../../assets/img/TTHMNDTPHCM.png';
import { PiUsersThreeLight } from 'react-icons/pi';
const ManageEvent = () => {
    const [isEvent, setEvent] = useState(true);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    };
    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    return (
        <div className="max-w-7xl h-full mx-auto py-4">
            <div className="flex justify-end">
                <button
                    onClick={handleOpenPopup}
                    className="bg-[#28a745] mr-1 hover:bg-[#218838] outline-none 
                transition-colors flex items-center gap-1 justify-center duration-200 rounded-lg p-4 text-white"
                >
                    <IoCreateOutline className="w-6 h-6" />
                    Thêm sự kiện mới
                </button>
            </div>
            <div>
                <CreateEvent
                    isOpen={isPopupOpen}
                    onClose={handleClosePopup}
                />
            </div>
            {isEvent ? (
                <div className="mt-10">
                    <div className="mb-10">
                        <div className="w-[90%] flex flex-col md:flex-row">
                            <div className="w-full md:w-1/4 flex-1 min-h-36 flex justify-center items-center bg-white">
                                <img
                                    src={imghienmauTPHCM}
                                    alt=""
                                />
                            </div>
                            <div className="p-[1%] w-full md:w-1/2 bg-[#f4f4f4]  ">
                                <div className="flex flex-row m-1 items-start text-xl text-rose-400 font-semibold justify-start">
                                    Chương trình hiến máu "Chung dòng máu Việt"
                                    năm 2024
                                </div>
                                <div className="flex flex-row m-1 items-start text-lg text-[#386fd6] font-semibold justify-start">
                                    Trung Tâm Hiến Máu Nhân Đạo Tp.HCM
                                </div>
                                <div className="flex flex-row m-1 items-start justify-start">
                                    <span className="max-w-fit text-[#7a7a7a] flex-1 text-[16px] whitespace-nowrap">
                                        Địa chỉ:
                                    </span>
                                    <p className="ml-1">
                                        106 Thiên Phước, Phường 9, Quận Tân
                                        Bình, TP.HCM
                                    </p>
                                </div>
                                <div className="flex flex-row m-1 items-start justify-start">
                                    <span className="max-w-fit text-[#7a7a7a] flex-1 text-[16px] whitespace-nowrap">
                                        Thời gian hoạt động:
                                    </span>
                                    <p className="ml-1">
                                        24/05/2024 - Từ 07:00 đến 16:30
                                    </p>
                                </div>
                                <div className="flex flex-row m-1 items-start justify-start">
                                    <span className="max-w-fit text-[#7a7a7a] flex-1 text-[16px] whitespace-nowrap">
                                        Thời gian hiến máu:
                                    </span>
                                    <p className="ml-1">
                                        07:00 - 11:00; 13:00 - 16:00
                                    </p>
                                </div>
                            </div>
                            <div className="w-full md:w-1/4 p-[1%] bg-[#f4f4f4] md:flex items-center justify-end">
                                <div className="flex flex-row md:flex-col h-full md:items-center justify-between md:justify-evenly">
                                    <div className="">
                                        <div className="flex flex-row items-center  text-[#7a7a7a]">
                                            <PiUsersThreeLight className="w-6 h-6" />
                                            <span className="text-sm ml-1 flex-1">
                                                Số lượng tham gia
                                            </span>
                                        </div>
                                        {/* Map */}
                                        <h5 className="text-2xl text-[#386fd6] font-medium">
                                            129/200{' '}
                                            <span className="text-sm font-normal">
                                                Người
                                            </span>
                                        </h5>
                                    </div>
                                    <div>
                                        <button className="outline-none w-40 h-14 hover:bg-[#1c5291] bg-[#386fd6] rounded-lg text-white">
                                            Xem chi tiết
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className=" flex flex-col justify-center items-center my-20">
                    <div>
                        <img
                            className="w-40 h-40"
                            src={schedule}
                            alt=""
                        />
                    </div>
                    <h1 className="text-lg text-gray-500">
                        Bạn chưa tạo sự kiện nào
                    </h1>
                </div>
            )}
        </div>
    );
};

export default ManageEvent;
