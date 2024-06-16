import React, { useEffect, useState } from 'react';
import Menu from './Menu';
import { Popconfirm } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { IoSearchOutline } from 'react-icons/io5';
import {
    useDeleteEventByAdminMutation,
    useGetAllEventsMutation,
} from '../../Redux/features/events/eventAPI';
import { MdDeleteOutline } from 'react-icons/md';
import { toast } from 'react-toastify';
const ManageEventAd = () => {
    const [deleteEventByAdmin] = useDeleteEventByAdminMutation();
    const [getAllEvent, { data: eventData }] = useGetAllEventsMutation();
    const [eventId, setEvenId] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                await getAllEvent(searchTerm).unwrap();
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [getAllEvent]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await getAllEvent(searchTerm).unwrap();
        } catch (error) {
            console.log(error);
        }
    };

    const handleCancelEvent = async () => {
        try {
            await deleteEventByAdmin(eventId).unwrap();
            toast.success('Xóa sự kiện thành công');
            navigate(0);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="h-screen flex">
            <Menu activeComponent={'event'} />
            <div className="flex-1 bg-gradient-to-b from-blue-200 via-white to-pink-200 h-full overflow-y-scroll">
                <div className="lg:py-6 py-[18px] pl-4 border-b bg-white w-full">
                    <h1 className="lg:text-3xl text-xl">Quản lý sự kiện</h1>
                </div>
                <div className="p-4 max-w-5xl mx-auto">
                    <div className="bg-white rounded-xl w-full p-4 shadow-sm">
                        <div className="mb-5">
                            <div className="  ">
                                <div className="bg-gray-100 flex items-center rounded-xl border-2">
                                    <IoSearchOutline className="ml-3 mr-1 w-5 h-5" />
                                    <input
                                        className="w-[90%] bg-gray-100 rounded-xl p-1 outline-none"
                                        placeholder="Tìm kiếm sự kiện"
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter')
                                                handleSubmit(e);
                                        }}
                                        name=""
                                        id=""
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-full overflow-auto h-[500px]">
                            <table className="border w-full ">
                                <tr className="sticky -top-1 bg-white shadow-sm">
                                    <td className="w-[30%] text-start py-2 font-medium">
                                        <span className="ml-5">
                                            Tên sự kiện ({eventData?.length})
                                        </span>
                                    </td>
                                    <td className="w-[30%] text-start ">
                                        <span className="ml-5">
                                            Tên cơ sở tổ chức
                                        </span>
                                    </td>
                                    <td className="w-[40%] text-center ">
                                        Địa điểm
                                    </td>
                                </tr>
                                {/* Map here */}
                                {eventData?.map((item) => (
                                    <tr
                                        key={''}
                                        className="border content-center"
                                    >
                                        <td className="py-3 ">
                                            <Link
                                                to={`/events/detail-event/${item?._id}`}
                                                className="gap-2 flex items-center ml-5 "
                                            >
                                                <p className="hover:underline">
                                                    {item?.eventName}
                                                </p>
                                            </Link>
                                        </td>
                                        <td className="text-start flex items-center  text-gray-600">
                                            <img
                                                className="w-10 h-10 rounded-full"
                                                src={item?.userId?.avatar}
                                                alt=""
                                            />
                                            <Link
                                                to={`/user/${item?.userId?._id}`}
                                                className="ml-5 hover:underline"
                                            >
                                                {item?.userId?.username}
                                            </Link>
                                        </td>
                                        <td className="text-center content-center ">
                                            <div className="flex justify-between items-center ">
                                                <p className="w-[80%]">{`${item?.address?.street}, ${item?.address?.ward}, ${item?.address?.district}, ${item?.address?.province}`}</p>
                                                <Popconfirm
                                                    title={'Hủy sự kiện'}
                                                    description={
                                                        'Bạn chắc chắn muốn hủy sự kiện này không?'
                                                    }
                                                    onConfirm={
                                                        handleCancelEvent
                                                    }
                                                    okText="Có"
                                                    cancelText="Không"
                                                >
                                                    <div
                                                        onClick={() =>
                                                            setEvenId(item?._id)
                                                        }
                                                        className="p-2 mr-2  flex items-center justify-center cursor-pointer hover:bg-gray-200 rounded-full"
                                                    >
                                                        <MdDeleteOutline className="w-6 h-6" />
                                                    </div>
                                                </Popconfirm>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageEventAd;
