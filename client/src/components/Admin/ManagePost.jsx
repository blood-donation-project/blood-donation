import React, { useState } from 'react';
import Menu from './Menu';
import { IoSearchOutline } from 'react-icons/io5';
import { Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import { MdDeleteOutline } from 'react-icons/md';

const ManagePost = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex h-screen">
            <Menu activeComponent={'post'} />
            <div className="flex-1 bg-gradient-to-b from-blue-200 via-white to-pink-200 h-full p-0 overflow-y-scroll">
                <div className="lg:py-6 py-[18px] pl-4 border-b bg-white w-full">
                    <h1 className="lg:text-3xl text-xl">Quản lý bài đăng</h1>
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
                                        <span className="ml-5">Người đăng</span>
                                    </td>
                                    <td className="w-[40%] text-start ">
                                        <span className="ml-5">Nội dung</span>
                                    </td>
                                    <td className="w-[10%]  ">Ngày viết</td>
                                    <td className="w-[10%] ">Ngày đăng</td>
                                    <td className="w-[10%] text-center "></td>
                                </tr>
                                {/* Map here */}

                                <tr
                                    key={''}
                                    className="border content-center"
                                >
                                    <td className="py-3 ">
                                        <Link
                                            to={`/events/detail-event/`}
                                            className="gap-2 flex items-center ml-5 "
                                        >
                                            <p className="hover:underline"></p>
                                        </Link>
                                    </td>
                                    <td className="text-start flex items-center  text-gray-600">
                                        <img
                                            className="w-10 h-10 rounded-full"
                                            src=""
                                            alt=""
                                        />
                                        <Link
                                            to={`/user/`}
                                            className="ml-5 hover:underline"
                                        ></Link>
                                    </td>
                                    <td>{/* Ngày viết */}</td>
                                    <td>{/* Ngày đăng */}</td>
                                    <td className="text-center content-center ">
                                        <div className="flex justify-end items-center ">
                                            <Popconfirm
                                                title={'Xóa bài viết'}
                                                description={
                                                    'Bạn chắc chắn muốn xóa bài viết này không?'
                                                }
                                                okText="Có"
                                                cancelText="Không"
                                            >
                                                <div className="p-2 mr-2  flex items-center justify-center cursor-pointer hover:bg-gray-200 rounded-full">
                                                    <MdDeleteOutline className="w-6 h-6" />
                                                </div>
                                            </Popconfirm>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManagePost;
