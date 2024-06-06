import React, { useState } from 'react';
import NavMenu from '../NavMenu';
import BlurBackgroundImage from '../BlurBackgroundImage';
import { IoIosCheckmarkCircleOutline, IoMdMail } from 'react-icons/io';
import {
    HiOutlinePencilSquare,
    HiUsers,
    HiOutlineXMark,
} from 'react-icons/hi2';
import { FaUser } from 'react-icons/fa';
import { FaLocationDot, FaRegMessage } from 'react-icons/fa6';
import { IoTimeSharp } from 'react-icons/io5';
import { Link, useParams } from 'react-router-dom';
import { useGetEventByIdEventQuery } from '../../Redux/features/events/eventAPI';

const DetailEvent = () => {
    const [showMore, setShowMore] = useState(false);
    const params = useParams();
    const { data } = useGetEventByIdEventQuery(params.id);

    const day = new Date(data?.donationTime).getDate();
    console.log(data);
    return (
        <div className="">
            <NavMenu />
            <div className="mt-[56px] bg-gray-100">
                {/* Header */}
                <div className="lg:max-w-6xl m-auto bg-white shadow-custom-bottom rounded-b-lg z-50">
                    <div className="relative flex justify-center">
                        <div className="relative image-container">
                            <BlurBackgroundImage
                                className="max-w-3xl h-auto"
                                src="https://res.cloudinary.com/dkjwdmndq/image/upload/v1717512306/news_images/a1rn1dslnhulqziocds3.jpg"
                                alt=""
                            />
                        </div>
                        <div className="absolute hidden md:flex z-50 -bottom-5 left-4 w-20 h-20  flex-col rounded-2xl shadow-lg ">
                            <div className="bg-red-500 w-full rounded-t-2xl h-5"></div>
                            <div className="bg-white h-[60px] rounded-b-2xl flex items-center justify-center">
                                <h1 className="text-4xl font-semibold ">
                                    {day}
                                </h1>
                            </div>
                        </div>
                    </div>
                    <div className="py-4 mt-4 ml-4 flex flex-col border-b">
                        <div className="text-red-600 text-lg font-semibold">
                            NGÀY {data?.donationTime} LÚC 21:00
                        </div>
                        <div className="text-2xl font-bold">
                            <h1>{data?.eventName}</h1>
                        </div>
                        <div className="text-[#65676B]">
                            {data?.address?.ward}, {data?.address?.district},{' '}
                            {data?.address?.province}
                        </div>
                    </div>
                    <div className="flex gap-1 items-center justify-center ssm:justify-end h-16 ">
                        <div className="p-1 hidden ssm:block">
                            <button className="px-3 py-2 rounded-lg outline-none hover:bg-gray-300 flex items-center justify-center bg-gray-200">
                                <IoIosCheckmarkCircleOutline className="w-6 h-6" />
                                <p>Tham gia</p>
                            </button>
                        </div>
                        <div className="p-1">
                            <button className="px-3 py-2 rounded-lg outline-none hover:bg-gray-300 flex items-center justify-center gap-2 bg-gray-200">
                                <IoMdMail className="w-6 h-6" />
                                <p>Mời</p>
                            </button>
                        </div>
                        <div className="p-1 ">
                            <button className="px-3 py-2 rounded-lg outline-none hover:bg-gray-300 flex items-center justify-center gap-2 bg-gray-200">
                                <HiOutlinePencilSquare className="w-6 h-6" />
                                <p>Chỉnh sửa</p>
                            </button>
                        </div>
                        <div className="p-1">
                            <button className="px-3 py-2 rounded-lg outline-none hover:bg-gray-300 flex items-center justify-center gap-2 bg-gray-200">
                                <HiOutlineXMark className="w-6 h-6" />
                                <p>Hủy sự kiện</p>
                            </button>
                        </div>
                    </div>
                </div>
                {/* Body */}
                <div className="lg:max-w-6xl m-auto ">
                    <div className="p-4">
                        {/* Map Data */}
                        <div className="max-w-3xl bg-white rounded-lg m-auto shadow-md mb-4">
                            <div className="max-w-3xl ">
                                <div className="m-1">
                                    <div>
                                        <div className="py-4">
                                            <div className="px-4 pb-4 pt-1">
                                                <h2 className="text-lg font-semibold">
                                                    Chi tiết
                                                </h2>
                                            </div>
                                            <button className="flex px-4 pt-1 pb-2 font-thin items-center hover:bg-gray-200 w-full rounded-lg gap-2">
                                                <HiUsers className="w-5 h-5 text-gray-500" />
                                                <div>
                                                    <p>1 người đã tham gia</p>
                                                </div>
                                            </button>
                                            <div className="flex px-4 py-2 font-thin items-center gap-2">
                                                <FaUser className="w-5 h-5 text-gray-500" />
                                                <div>
                                                    <p>
                                                        Sự kiện của{' '}
                                                        <span className="font-bold">
                                                            {data?.centerName}{' '}
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex px-4 py-2 font-thin items-center gap-2">
                                                <FaLocationDot className="w-5 h-5 text-gray-500" />
                                                <div>
                                                    <p className="font-bold">
                                                        {data?.address?.ward},{' '}
                                                        {
                                                            data?.address
                                                                ?.district
                                                        }
                                                        ,{' '}
                                                        {
                                                            data?.address
                                                                ?.province
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex px-4 py-2 font-thin items-center gap-2">
                                                <IoTimeSharp className="w-5 h-5 text-gray-500" />
                                                <div>
                                                    <p>
                                                        Khoảng thời gian: 7h -
                                                        11h30
                                                    </p>
                                                </div>
                                            </div>
                                            <div className=" px-4 py-2 font-thin transition-all duration-300">
                                                <div
                                                    className={`${
                                                        !showMore &&
                                                        'line-clamp-2'
                                                    } `}
                                                >
                                                    <p>
                                                        💙 CHƯƠNG TRÌNH HIẾN MÁU
                                                        MÙA HÈ NHÂN ÁI 2024 💙 🪻
                                                        Cùng đi hiến máu, làm
                                                        việc tốt, xua tan cái oi
                                                        bức của mùa hạ bằng
                                                        những điều thiện lành.
                                                        ------------------------------------------------------
                                                        💙 SỰ KIỆN HIẾN MÁU MÙA
                                                        HÈ NHÂN ÁI 2024 💙 🗓
                                                        Thời gian: 7h30 - 16h30
                                                        | Từ 03/6 - 9/6/2024
                                                        📍Địa điểm: Viện Huyết
                                                        học - Truyền máu TW
                                                        (Phạm Văn Bạch, Cầu
                                                        Giấy, Hà Nội)
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() =>
                                                        setShowMore(!showMore)
                                                    }
                                                    className="font-bold hover:underline"
                                                >
                                                    {showMore
                                                        ? 'Thu gọn'
                                                        : 'Xem thêm'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="max-w-3xl bg-white rounded-lg m-auto shadow-md mb-4">
                            <div className="max-w-3xl ">
                                <div className="m-1">
                                    <div>
                                        <div className="py-4">
                                            <div className="px-4 pb-4 pt-1 flex items-center justify-between">
                                                <h2 className="text-xl font-semibold">
                                                    Người đã tham gia
                                                </h2>
                                                <button className="text-blue-600 text-[16px] hover:underline">
                                                    Xem tất cả
                                                </button>
                                            </div>
                                            <div className="flex px-4 pt-1 pb-2 font-thin items-center justify-center gap-2 ">
                                                <button className="flex flex-col items-center rounded-lg justify-center px-10 py-2 bg-gray-100 hover:bg-gray-300">
                                                    <h1 className="text-xl font-bold">
                                                        1
                                                    </h1>
                                                    <h2 className="text-sm text-[#65676B]">
                                                        Người tham gia
                                                    </h2>
                                                </button>
                                            </div>
                                            <div className="border-b-2 border-gray-400 mt-2"></div>
                                            <div className="flex px-4 pt-4  font-thin items-center gap-2 ">
                                                <h1 className="text-xl font-bold">
                                                    Đi cùng bạn bè
                                                </h1>
                                            </div>

                                            {/* Map Friends */}
                                            <div className="my-4">
                                                <Link
                                                    to={''}
                                                    className="flex px-4  font-thin items-center gap-2 hover:bg-gray-200 rounded-xl"
                                                >
                                                    <div className="flex items-center w-full">
                                                        <div className="my-2 mr-3">
                                                            <img
                                                                className="w-9 h-9 rounded-full"
                                                                src="https://res.cloudinary.com/dkjwdmndq/image/upload/v1717557842/news_images/fcqms56gcinpofmgq0pi.jpg"
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="flex items-center justify-between w-full">
                                                            <div>
                                                                <p>
                                                                    Lê Minh Tuấn
                                                                </p>
                                                            </div>
                                                            <button className="py-2 px-4 bg-gray-300 hover:bg-gray-400 rounded-lg">
                                                                Mời
                                                            </button>
                                                        </div>
                                                    </div>
                                                </Link>
                                                <Link
                                                    to={''}
                                                    className="flex px-4  font-thin items-center gap-2 hover:bg-gray-200 rounded-xl"
                                                >
                                                    <div className="flex items-center w-full">
                                                        <div className="my-2 mr-3">
                                                            <img
                                                                className="w-9 h-9 rounded-full"
                                                                src="https://res.cloudinary.com/dkjwdmndq/image/upload/v1717557842/news_images/fcqms56gcinpofmgq0pi.jpg"
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="flex items-center justify-between w-full">
                                                            <div>
                                                                <p>
                                                                    Lê Minh Tuấn
                                                                </p>
                                                            </div>
                                                            <button className="py-2 px-4 bg-gray-300 hover:bg-gray-400 rounded-lg">
                                                                Mời
                                                            </button>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="max-w-3xl bg-white rounded-lg m-auto shadow-md mb-4">
                            <div className="max-w-3xl ">
                                <div className="m-1">
                                    <div>
                                        <div className="py-1">
                                            <div className="px-4 pb-4 pt-1">
                                                <h2 className="text-lg font-semibold">
                                                    Gặp gỡ người tổ chức
                                                </h2>
                                            </div>
                                        </div>
                                        <div className="px-7">
                                            <div className="py-2">
                                                <Link>
                                                    <div className="pb-3">
                                                        <div className="    w-full">
                                                            <div className="pt-5 px-3 pb-3 flex flex-col border-2 rounded-lg border-gray-300 hover:bg-gray-100">
                                                                <div className="flex justify-center items-center ">
                                                                    <img
                                                                        className="w-40 h-40 rounded-full"
                                                                        src="https://res.cloudinary.com/dkjwdmndq/image/upload/v1717266368/news_images/gh9z05vmpjwh0yrskfcp.jpg"
                                                                        alt=""
                                                                    />
                                                                </div>
                                                                <div className="text-center p-1 font-bold">
                                                                    <h1 className="text-xl">
                                                                        Viện
                                                                        Huyết
                                                                        học -
                                                                        Truyền
                                                                        máu
                                                                        Trung
                                                                        ương
                                                                    </h1>
                                                                </div>
                                                                <div className="border-b my-2"></div>
                                                                <div className="text-center pb-2">
                                                                    <h1 className="text-[16px] h-11">
                                                                        Viện
                                                                        chuyên
                                                                        khoa đầu
                                                                        ngành về
                                                                        Huyết
                                                                        học và
                                                                        Truyền
                                                                        máu.
                                                                    </h1>
                                                                </div>
                                                                <button className="w-full py-2 bg-gray-300 flex items-center justify-center gap-3 hover:bg-gray-400 rounded-lg">
                                                                    <FaRegMessage className="w-6 h-6" />
                                                                    <h1>
                                                                        Nhắn
                                                                        ngay
                                                                    </h1>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailEvent;
