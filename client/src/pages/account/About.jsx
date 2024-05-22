import { useState, useRef, useEffect } from 'react';
import { FaBirthdayCake, FaCity, FaPhone } from 'react-icons/fa';
import { PiGenderIntersexFill } from 'react-icons/pi';
import { MdBloodtype, MdEmail } from 'react-icons/md';
import { FaUserNurse } from 'react-icons/fa6';

import NavMenu from '../../components/NavMenu';
import ProfileOverview from '../../components/Profile/ProfileOverview';

const AboutPage = () => {
    return (
        <>
            <NavMenu />
            <div className="mt-[56px]  ">
                <div className="max-w-[1150px] mx-auto  px-4 ">
                    <ProfileOverview />
                </div>
                {/* Body content */}
                <div className="bg-gray-200 pt-4 pb-10 min-h-[calc(100vh_-_636px)] ">
                    <div className="max-w-[1150px] mx-auto px-4">
                        <div className="bg-white p-4 rounded-lg overflow-hidden">
                            <div className="grid grid-cols-7">
                                <div className=" flex  flex-col px-2 ">
                                    <div className="text-[24px] text-[#65676B]">
                                        <MdEmail />
                                    </div>
                                    <div className="text-[#65676B] text-[14px]">Email</div>
                                    <div className="text-[14px] font-bold text-[#3e3e3e]  ">
                                        <span className=" word-wrap">hoangxuanviet1312@gmail.com</span>
                                    </div>
                                </div>
                                <div className=" flex  flex-col px-2">
                                    <div className="text-[24px] text-[#65676B]">
                                        <FaBirthdayCake />
                                    </div>
                                    <div className="text-[#65676B] text-[14px]">Ngày sinh</div>
                                    <div className="text-[14px] font-bold text-[#3e3e3e]">13/12/2003</div>
                                </div>
                                <div className=" flex  flex-col px-2 ">
                                    <div className="text-[24px] text-[#65676B]">
                                        <PiGenderIntersexFill />
                                    </div>
                                    <div className="text-[#65676B] text-[14px]">Giới tính</div>
                                    <div className="text-[14px] font-bold text-[#3e3e3e]">Nam</div>
                                </div>
                                <div className=" flex  flex-col px-2 ">
                                    <div className="text-[24px] text-[#65676B]">
                                        <FaCity />
                                    </div>
                                    <div className="text-[#65676B] text-[14px]">Địa chỉ</div>
                                    <div className="text-[14px] font-bold text-[#3e3e3e] line-clamp-3">
                                        Giải Phóng, Hai Bà Trưng, TP.Hà Nội
                                    </div>
                                </div>
                                <div className=" flex  flex-col px-2 ">
                                    <div className="text-[24px] text-[#65676B]">
                                        <FaPhone />
                                    </div>
                                    <div className="text-[#65676B] text-[14px]">Liên hệ</div>
                                    <div className="text-[14px] font-bold text-[#3e3e3e] line-clamp-3">0345678123</div>
                                </div>

                                <div className=" flex  flex-col px-2 ">
                                    <div className="text-[24px] text-[#65676B]">
                                        <MdBloodtype />
                                    </div>
                                    <div className="text-[#65676B] text-[14px]">Nhóm máu</div>
                                    <div className="text-[14px] font-bold text-[#3e3e3e]  ">
                                        <span className=" word-wrap">AB+</span>
                                    </div>
                                </div>
                                <div className=" flex  flex-col px-2 ">
                                    <div className="text-[24px] text-[#65676B]">
                                        <FaUserNurse />
                                    </div>
                                    <div className="text-[#65676B] text-[14px]">Vai trò</div>
                                    <div className="text-[14px] font-bold text-[#3e3e3e]  ">
                                        <span className=" word-wrap">Người hiến máu</span>
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

export default AboutPage;
