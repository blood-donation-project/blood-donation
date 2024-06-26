import { useState, useRef, useEffect } from 'react';
import { FaBirthdayCake, FaCity, FaPhone } from 'react-icons/fa';
import { PiGenderIntersexFill } from 'react-icons/pi';
import { MdBloodtype, MdEmail } from 'react-icons/md';
import { FaUserNurse } from 'react-icons/fa6';

import NavMenu from '../../components/NavMenu';
import ProfileOverview from '../../components/Profile/ProfileOverview';
import { useGetUserByIdMutation } from '../../Redux/features/user/userAPI';
import { useParams } from 'react-router-dom';
import { useAutoRefreshToken } from '../../hooks/useAutoRefreshToken';

const AboutPage = () => {
    const [getUserById, { data: userData }] = useGetUserByIdMutation();
    const [tokenRefreshed, setTokenRefreshed] = useState(false);
    useAutoRefreshToken('/home/', setTokenRefreshed);

    const params = useParams();
    useEffect(() => {
        const fetchData = async () => {
            try {
                await getUserById(params.id).unwrap;
            } catch (error) {
                console.log(Error);
            }
        };
        if (tokenRefreshed) fetchData();
    }, [getUserById, params.id, tokenRefreshed]);

    return (
        <div>
            {/* Body content */}
            <div className="bg-gray-200 pt-4 pb-10 min-h-[calc(100vh_-_636px)] ">
                <div className="max-w-[1150px] mx-auto md:px-4">
                    <div className="bg-white p-4 md:rounded-lg overflow-hidden">
                        <div className="grid md:grid-cols-2 gap-2">
                            <div className=" flex  flex-col px-2 xs:py-1.5 md:py-0 xs:border-b xs:border-b-[#ccc] ">
                                <div className="flex md:flex-col xs:flex-row">
                                    <div className="xs:w-[30px] md:w-0 text-[22px] text-[#65676B]">
                                        <MdEmail />
                                    </div>
                                    <div className="text-[#65676B] text-[16px]">Email</div>
                                </div>
                                <div className="text-[16px] font-bold text-[#3e3e3e] xs:ml-[30px] md:ml-0  ">
                                    <span className=" word-wrap">{userData?.email}</span>
                                </div>
                            </div>
                            <div className=" flex  flex-col px-2 xs:py-1.5 md:py-0 xs:border-b xs:border-b-[#ccc]">
                                <div className="flex md:flex-col xs:flex-row">
                                    <div className="xs:w-[30px] md:w-0 text-[22px] text-[#65676B]">
                                        <FaBirthdayCake />
                                    </div>
                                    <div className="text-[#65676B] text-[16px]">Ngày sinh</div>
                                </div>
                                <div className="text-[16px] font-bold text-[#3e3e3e] xs:ml-[30px] md:ml-0">
                                    {userData?.dateOfBirth}
                                </div>
                            </div>
                            <div className=" flex  flex-col px-2 xs:py-1.5 md:py-0 xs:border-b xs:border-b-[#ccc] ">
                                <div className="flex md:flex-col xs:flex-row">
                                    <div className="xs:w-[30px] md:w-0 text-[22px] text-[#65676B]">
                                        <PiGenderIntersexFill />
                                    </div>
                                    <div className="text-[#65676B] text-[16px]">Giới tính</div>
                                </div>
                                <div className="text-[16px] font-bold text-[#3e3e3e] xs:ml-[30px] md:ml-0">
                                    {userData?.gender}
                                </div>
                            </div>
                            <div className=" flex  flex-col px-2 xs:py-1.5 md:py-0 xs:border-b xs:border-b-[#ccc] ">
                                <div className="flex md:flex-col xs:flex-row">
                                    <div className="xs:w-[30px] md:w-0 text-[22px] text-[#65676B]">
                                        <FaCity />
                                    </div>
                                    <div className="text-[#65676B] text-[16px]">Địa chỉ</div>
                                </div>
                                <div className="text-[16px] font-bold text-[#3e3e3e] xs:ml-[30px] md:ml-0 line-clamp-3">
                                    {userData?.address.street +
                                        ', ' +
                                        userData?.address.ward +
                                        ', ' +
                                        userData?.address.district +
                                        ', ' +
                                        userData?.address.province}
                                </div>
                            </div>
                            <div className=" flex  flex-col px-2 xs:py-1.5 md:py-0 xs:border-b xs:border-b-[#ccc] ">
                                <div className="flex md:flex-col xs:flex-row">
                                    <div className="xs:w-[30px] md:w-0 text-[22px] text-[#65676B]">
                                        <FaPhone />
                                    </div>
                                    <div className="text-[#65676B] text-[16px]">Liên hệ</div>
                                </div>
                                <div className="text-[16px] font-bold text-[#3e3e3e] xs:ml-[30px] md:ml-0 line-clamp-3">
                                    {userData?.phoneNumber}
                                </div>
                            </div>

                            <div className=" flex  flex-col px-2 xs:py-1.5 md:py-0 xs:border-b xs:border-b-[#ccc] ">
                                <div className="flex md:flex-col xs:flex-row">
                                    <div className="xs:w-[30px] md:w-0 text-[22px] text-[#65676B]">
                                        <MdBloodtype />
                                    </div>
                                    <div className="text-[#65676B] text-[16px]">Nhóm máu</div>
                                </div>
                                <div className="text-[16px] font-bold text-[#3e3e3e] xs:ml-[30px] md:ml-0  ">
                                    <span className=" word-wrap">{userData?.bloodGroup || 'Không xác định'}</span>
                                </div>
                            </div>
                            <div className=" flex  flex-col px-2 xs:py-1.5 md:py-0 xs:border-b xs:border-b-[#ccc] ">
                                <div className="flex md:flex-col xs:flex-row">
                                    <div className="xs:w-[30px] md:w-0 text-[22px] text-[#65676B]">
                                        <FaUserNurse />
                                    </div>
                                    <div className="text-[#65676B] text-[16px]">Vai trò</div>
                                </div>
                                <div className="text-[16px] font-bold text-[#3e3e3e] xs:ml-[30px] md:ml-0  ">
                                    <span className=" word-wrap">{userData?.role}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
