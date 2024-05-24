import React, { useState } from 'react';
import schedule from '../../assets/img/schedule.png';
import imghienmauTPHCM from '../../assets/img/TTHMNDTPHCM.png';
import { PiUsersThreeLight } from 'react-icons/pi';
const SearchEvent = () => {
    const [isResults, setResults] = useState(true);
    return (
        <div>
            {isResults ? (
                <div className="max-w-5xl h-full m-auto py-4">
                    {/* Database amount */}
                    <h1 className="text-2xl mb-2 text-[#1C5291]">1 Kết quả</h1>
                    <div className="mt-10">
                        {/* Map */}
                        <div className="mb-10">
                            <div className="w-full flex flex-col md:flex-row">
                                <div className="w-full md:w-1/4 flex-1 min-h-36 flex justify-center items-center bg-white">
                                    <img
                                        src={imghienmauTPHCM}
                                        alt=""
                                    />
                                </div>
                                <div className="p-[1%] w-full md:w-1/2 bg-[#f4f4f4]  ">
                                    <div className="flex flex-row m-1 items-start text-lg text-[#386fd6] font-semibold justify-start">
                                        Hiến máu - Trung Tâm Hiến Máu Nhân Đạo
                                        Tp.HCM
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
                                                Tham Gia
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="h-screen overflow-y-hidden">
                    <h1 className="text-2xl px-10 pt-10 text-[#1C5291]">
                        0 Kết quả
                    </h1>
                    <div className="flex justify-center items-center flex-col h-full">
                        <img
                            src={schedule}
                            alt=""
                        />
                        <p className="text-lg text-[#7a7a7a]">
                            Không có chương trình hiến máu vào ngày này
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchEvent;
