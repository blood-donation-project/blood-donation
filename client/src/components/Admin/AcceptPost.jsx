import React, { useEffect, useState } from 'react';
import Menu from './Menu';
import { IoSearchOutline, IoFilter } from 'react-icons/io5';
import Datepicker from 'react-tailwindcss-datepicker';
import { Image } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { useGetAllUnPublishPostsQuery, usePublishPostMutation } from '../../Redux/features/post/postAPI';
import moment from 'moment';
import { toast } from 'react-toastify';

const AcceptPost = () => {
    const { data: dataUnpublishPost, refetch } = useGetAllUnPublishPostsQuery();
    const [publishPosts] = usePublishPostMutation();
    const [input, setInput] = useState('');
    const [isOpenFilter, setOpenFilter] = useState(false);
    const [dateValue, setDateValue] = useState({
        startDate: null,
        endDate: null,
    });

    const [unpublishedPosts, setUnpublishedPosts] = useState([]);

    useEffect(() => {
        if (dataUnpublishPost) {
            setUnpublishedPosts(dataUnpublishPost);
        }
    }, [dataUnpublishPost]);

    const handleDateValueChange = (newValue) => {
        setDateValue(newValue);
    };

    const handleFilter = async () => {};

    const handleSubmit = async () => {};

    const handlePublish = async (id) => {
        try {
            await publishPosts(id).unwrap();
            setUnpublishedPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
            refetch();
            toast.success('Phê duyệt thành công');
        } catch (error) {}
    };

    return (
        <div className="flex h-screen">
            <Menu activeComponent={'accept-post'} />
            <div className="flex-1 bg-gradient-to-b from-blue-200 via-white to-pink-200 h-full p-0 overflow-y-scroll">
                <div className="lg:py-6 py-[18px] pl-4 border-b bg-white w-full">
                    <h1 className="lg:text-3xl text-xl">Duyệt bài đăng</h1>
                </div>
                <div className="p-4 max-w-5xl mx-auto">
                    <div className="bg-white rounded-xl  p-4 shadow-sm">
                        <div>
                            <div className="  ">
                                <div className="bg-gray-100 flex items-center rounded-xl border-2">
                                    <IoSearchOutline className="ml-3 mr-1 w-5 h-5" />
                                    <input
                                        className="w-[90%] bg-gray-100 rounded-xl p-1 outline-none"
                                        placeholder="Tìm kiếm"
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') handleSubmit(e);
                                        }}
                                        name=""
                                        id=""
                                    />
                                </div>
                            </div>
                            {/* Filter Users */}
                            <div>
                                <div
                                    onClick={() => setOpenFilter(!isOpenFilter)}
                                    className="my-4 flex w-fit items-center gap-1 hover:underline hover:text-blue-500 text-sm ml-2 text-blue-400 cursor-pointer transition-all duration-300"
                                >
                                    <IoFilter />
                                    <p>Lọc bài đăng</p>
                                </div>
                                <div className={`${isOpenFilter ? '' : 'hidden'} mb-2`}>
                                    <div className="md:w-[300px] w-full">
                                        <Datepicker
                                            primaryColor="blue"
                                            displayFormat="DD/MM/YYYY"
                                            separator="-"
                                            value={dateValue}
                                            inputClassName={
                                                ' outline-none p-2 w-full  py-3 border border-gray-300 transition-all duration-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-lg'
                                            }
                                            onChange={handleDateValueChange}
                                            readOnly={true}
                                        />
                                    </div>

                                    <button
                                        onClick={handleFilter}
                                        className="my-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400"
                                    >
                                        Xác Nhận
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="max-w-3xl max-h-[500px] mx-auto   rounded-2xl overflow-auto">
                            {/* Map here */}
                            {unpublishedPosts?.map((item, index) => (
                                <div className="bg-gray-100 rounded-2xl mb-4 p-4">
                                    <div className="flex items-center gap-2 md:mb-4 mb-2 md:ml-4 ">
                                        <img className="w-10 h-10 rounded-full" src={item?.userId?.avatar} alt="" />
                                        <div className="flex flex-col ">
                                            <Link to={'/user/'} className="leading-none hover:underline">
                                                {item?.userId?.username}
                                            </Link>
                                            <p className="text-sm text-gray-500">{moment(item?.createdAt).fromNow()}</p>
                                        </div>
                                    </div>
                                    <div className="mb-2">
                                        <p>{item?.content}</p>
                                    </div>
                                    <div className="flex items-center justify-center mb-4">
                                        <Image className="max-h-96" src={item?.image} />
                                    </div>
                                    <div className="flex items-center justify-center gap-2">
                                        <button
                                            onClick={() => handlePublish(item?._id)}
                                            className="px-1 md:px-6 md:w-[25%] w-1/2 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg"
                                        >
                                            Phê Duyệt
                                        </button>
                                        <button className="px-6 md:w-[25%] w-1/2 py-2 bg-gray-300 hover:bg-slate-400 rounded-lg">
                                            Từ Chối
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AcceptPost;
