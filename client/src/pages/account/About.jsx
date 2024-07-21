import { useState, useRef, useEffect } from 'react';
import { FaBirthdayCake, FaCity, FaPhone } from 'react-icons/fa';
import { PiGenderIntersexFill } from 'react-icons/pi';
import { MdBloodtype, MdEmail } from 'react-icons/md';
import { FaUserNurse } from 'react-icons/fa6';
import { FaCheckCircle } from "react-icons/fa";
import NavMenu from '../../components/NavMenu';
import ProfileOverview from '../../components/Profile/ProfileOverview';
import { useGetUserByIdMutation, useGetUserMutation } from '../../Redux/features/user/userAPI';
import { useParams } from 'react-router-dom';

const AboutPage = () => {
    const [getUserById, { data: userData }] = useGetUserByIdMutation();
    const [getUser, { data: userCurrentData }] = useGetUserMutation();

    const params = useParams();
    useEffect(() => {
        const fetchData = async () => {
            try {
                await getUserById(params.id).unwrap;
                await getUser().unwrap();
            } catch (error) {
                console.log(Error);
            }
        };
        fetchData();
    }, [getUserById, params.id, getUser]);

    return (
        <div>
            {/* Body content */}
            <div className="bg-gray-200 pt-4 pb-10 min-h-[calc(100vh_-_636px)] ">
                <div className="max-w-[1150px] mx-auto md:px-4">
                    <div className="bg-white p-4 md:rounded-lg overflow-hidden">
                        <div className="grid md:grid-cols-2 gap-2">
                            {userData?._id === userCurrentData?._id ||
                                userData?.role === 'Cơ sở y tế' ? (
                                    <div className=" flex  flex-col px-2 xs:py-1.5 md:py-0 xs:border-b xs:border-b-[#ccc] ">
                                        <div className="flex md:flex-col xs:flex-row">
                                            <div className="xs:w-[30px] md:w-0 text-[22px] text-[#65676B]">
                                                <MdEmail className='text-[#007bff]'/>
                                            </div>
                                            <div className="text-[#65676B] text-[16px]">Email</div>
                                        </div>
                                        <div className="text-[16px] font-bold text-[#3e3e3e] xs:ml-[30px] md:ml-0  ">
                                            <span className=" word-wrap">{userData?.email}</span>
                                        </div>
                                    </div>
                                ): ''}

                            {userData?.role === 'Cơ sở y tế' ? (
                                ''
                            ) : (
                                <div className=" flex  flex-col px-2 xs:py-1.5 md:py-0 xs:border-b xs:border-b-[#ccc]">
                                    <div className="flex md:flex-col xs:flex-row">
                                        <div className="xs:w-[30px] md:w-0 text-[22px] text-[#65676B]">
                                            <FaBirthdayCake className='text-[#FFD700]'/>
                                        </div>
                                        <div className="text-[#65676B] text-[16px]">Ngày sinh</div>
                                    </div>
                                    <div className="text-[16px] font-bold text-[#3e3e3e] xs:ml-[30px] md:ml-0">
                                        {userData?.dateOfBirth ?? 'Chưa xác định'}
                                    </div>
                                </div>
                            )}
                            {userData?.role === 'Cơ sở y tế' || userData?.status === false ? (
                                ''
                            ) : (
                                <div className=" flex  flex-col px-2 xs:py-1.5 md:py-0 xs:border-b xs:border-b-[#ccc]">
                                    <div className="flex md:flex-col xs:flex-row">
                                        <div className="xs:w-[30px] md:w-0 text-[22px] text-[#65676B]">
                                            <FaCheckCircle className='text-[#4CAF50]'/>
                                        </div>
                                        <div className="text-[#65676B] text-[16px]">Tình trạng</div>
                                    </div>
                                    <div className="text-[16px] font-bold text-[#3e3e3e] xs:ml-[30px] md:ml-0">
                                        {userData?.status && 'Sẵn sàng hiến máu'}
                                    </div>
                                </div>
                            )}
                            {userData?.role === 'Cơ sở y tế' ? (
                                ''
                            ) : (
                                <div className=" flex  flex-col px-2 xs:py-1.5 md:py-0 xs:border-b xs:border-b-[#ccc] ">
                                    <div className="flex md:flex-col xs:flex-row">
                                        <div className="xs:w-[30px] md:w-0 text-[22px] text-[#65676B]">
                                            <PiGenderIntersexFill className={`${userData?.gender === 'Nữ' ? 'text-[#ff80cc]' : 'text-[#007bff]'}`}/>
                                        </div>
                                        <div className="text-[#65676B] text-[16px]">Giới tính</div>
                                    </div>
                                    <div className="text-[16px] font-bold text-[#3e3e3e] xs:ml-[30px] md:ml-0">
                                        {userData?.gender}
                                    </div>
                                </div>
                            )}
                            <div className=" flex  flex-col px-2 xs:py-1.5 md:py-0 xs:border-b xs:border-b-[#ccc] ">
                                <div className="flex md:flex-col xs:flex-row">
                                    <div className="xs:w-[30px] md:w-0 text-[22px] text-[#65676B]">
                                        <FaCity className='text-[#FFA500]'/>
                                    </div>
                                    <div className="text-[#65676B] text-[16px]">Địa chỉ</div>
                                </div>
                                <div className="text-[16px] font-bold text-[#3e3e3e] xs:ml-[30px] md:ml-0 line-clamp-3">
                                    {(userData?._id === userCurrentData?._id || userData?.role === 'Cơ sở y tế'
                                        ? userData?.address.street +
                                          ', ' +
                                          userData?.address.ward +
                                          ', ' +
                                          userData?.address.district +
                                          ', '
                                        : '') + userData?.address.province}
                                </div>
                            </div>
                            {userData?._id === userCurrentData?._id ||
                                userData?.role === 'Cơ sở y tế' ? (
                                    <div className=" flex  flex-col px-2 xs:py-1.5 md:py-0 xs:border-b xs:border-b-[#ccc] ">
                                        <div className="flex md:flex-col xs:flex-row">
                                            <div className="xs:w-[30px] md:w-0 text-[22px] text-[#65676B]">
                                                <FaPhone  className='text-[#00CED1]'/>
                                            </div>
                                            <div className="text-[#65676B] text-[16px]">Liên hệ</div>
                                        </div>
                                        <div className="text-[16px] font-bold text-[#3e3e3e] xs:ml-[30px] md:ml-0 line-clamp-3">
                                            {userData?.phoneNumber}
                                        </div>
                                    </div>
                                ): ''}

                            {userData?.role === 'Cơ sở y tế' ? (
                                ''
                            ) : (
                                <div className=" flex  flex-col px-2 xs:py-1.5 md:py-0 xs:border-b xs:border-b-[#ccc] ">
                                    <div className="flex md:flex-col xs:flex-row">
                                        <div className="xs:w-[30px] md:w-0 text-[22px] text-[#65676B]">
                                            <MdBloodtype className='text-[#dc3545]'/>
                                        </div>
                                        <div className="text-[#65676B] text-[16px]">Nhóm máu</div>
                                    </div>
                                    <div className="text-[16px] font-bold text-[#3e3e3e] xs:ml-[30px] md:ml-0  ">
                                        <span className=" word-wrap">{userData?.bloodGroup || 'Không xác định'}</span>
                                    </div>
                                </div>
                            )}
                            {userData?._id === userCurrentData?._id && (
                                <div className=" flex  flex-col px-2 xs:py-1.5 md:py-0 xs:border-b xs:border-b-[#ccc] ">
                                    <div className="flex md:flex-col xs:flex-row">
                                        <div className="xs:w-[30px] md:w-0 text-[22px] text-[#65676B]">
                                            <FaUserNurse className='text-[#9C27B0]'/>
                                        </div>
                                        <div className="text-[#65676B] text-[16px]">Vai trò</div>
                                    </div>
                                    <div className="text-[16px] font-bold text-[#3e3e3e] xs:ml-[30px] md:ml-0  ">
                                        <span className=" word-wrap">{userData?.role}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
