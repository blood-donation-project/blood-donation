import React from 'react';
import { HiMiniUsers } from 'react-icons/hi2';
import { TbCalendarEvent } from 'react-icons/tb';
import { BsFilePost } from 'react-icons/bs';
import BarChartUser from './Chart/BarChartUser';
import DoughnutUser from './Chart/DoughnutUser';
import BarChartPost from './Chart/BarChartPost';
import BarChartEvent from './Chart/BarChartEvent';
import { useGetUserByMonthsQuery } from '../../Redux/features/user/userAPI';
import { useGetEventByMonthsQuery } from '../../Redux/features/events/eventAPI';
import Menu from './Menu';
const HomeAdmin = () => {
    const { data: getUserByMonths } = useGetUserByMonthsQuery();
    const { data: eventDataByMonth } = useGetEventByMonthsQuery();
    return (
        <div className="h-screen flex">
            <Menu activeComponent={'home'}/>
            <div className="flex-1 bg-[#f3f4f6] h-full overflow-y-scroll">
                <div className="lg:py-6 py-[18px] px-4 border-b bg-white w-full ">
                    <h1 className="lg:text-3xl text-xl">Trang Chủ</h1>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 p-4 gap-8">
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
                        <div>
                            <p className="text-sm text-[#6B7280]">
                                Tổng số người dùng
                            </p>
                            <p className="text-xl font-semibold">
                                {getUserByMonths?.totalUsers}
                            </p>
                        </div>
                        <div>
                            <HiMiniUsers className="w-9 h-9" />
                        </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
                        <div>
                            <p className="text-sm text-[#6B7280]">
                                Tổng số bài đăng
                            </p>
                            <p className="text-lg">Map here!</p>
                        </div>
                        <div>
                            <BsFilePost className="w-9 h-9" />
                        </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
                        <div>
                            <p className="text-sm text-[#6B7280]">
                                Tổng số sự kiện
                            </p>
                            <p className="text-lg">
                                {eventDataByMonth?.totalEvents}
                            </p>
                        </div>
                        <div>
                            <TbCalendarEvent className="w-9 h-9" />
                        </div>
                    </div>
                </div>
                {/* Satistics */}

                <div className="grid grid-cols-1 lg:grid-cols-3 p-4 gap-8">
                    <div className="col-span-2 bg-white rounded-lg shadow-md">
                        <div className="flex items-center p-4 border-b">
                            <h1>Biểu đồ số lượng người dùng theo tháng</h1>
                        </div>
                        <div className=" flex items-center justify-center h-72 p-4">
                            <BarChartUser />
                        </div>
                    </div>
                    {/* Doughnut chart card */}
                    <div className="bg-white rounded-lg shadow-md">
                        <div className="flex items-center p-4 border-b">
                            Biểu đồ tỉ lệ người dùng
                        </div>
                        <div className=" flex items-center justify-center p-4 h-72">
                            <DoughnutUser />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 p-4 gap-8">
                    <div className=" bg-white rounded-lg shadow-md">
                        <div className="flex items-center p-4 border-b">
                            <h1>Biểu đồ số lượng bài đăng theo tháng</h1>
                        </div>
                        <div className=" flex items-center justify-center h-72 p-4">
                            <BarChartPost />
                        </div>
                    </div>
                    {/* Doughnut chart card */}
                    <div className="bg-white  rounded-lg shadow-md">
                        <div className="flex items-center p-4 border-b">
                            Biểu đồ số lượng sự kiện theo tháng
                        </div>
                        <div className=" flex items-center justify-center p-4 h-72">
                            <BarChartEvent />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeAdmin;
