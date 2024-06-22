import React, { useEffect, useState } from 'react';
import Menu from './Menu';
import { IoSearchOutline } from 'react-icons/io5';
import { Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import { MdDeleteOutline } from 'react-icons/md';
import { FaEye } from 'react-icons/fa';
import { useDeletePostByAdminMutation, useGetAllPostsByAdminMutation } from '../../Redux/features/post/postAPI';
import moment from 'moment';
import { toast } from 'react-toastify';
import DetailPosts from './DetailPosts';
import { useAutoRefreshToken } from '../../hooks/useAutoRefreshToken';
const ManagePost = () => {
    useAutoRefreshToken('/home/');

    const [searchTerm, setSearchTerm] = useState('');
    const [getAllPost] = useGetAllPostsByAdminMutation();
    const [deletePostByAdmin] = useDeletePostByAdminMutation();
    const [postId, setPostId] = useState('');
    const [allPost, setAllPost] = useState([]);
    // Open Popup Detail Post
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const posts = await getAllPost().unwrap();
                setAllPost(posts);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [getAllPost]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await getAllPost(searchTerm).unwrap();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeletePost = async (postId) => {
        try {
            await deletePostByAdmin(postId).unwrap();
            setAllPost((prev) => prev.filter((item) => item?._id !== postId));
            toast.success('Xóa bài viết thành công!');
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
                <div className="p-4 max-w-6xl mx-auto">
                    <div className="bg-white rounded-xl w-full p-4 shadow-sm">
                        <div className="mb-5">
                            <div className="  ">
                                <div className="bg-gray-100 flex items-center rounded-xl border-2">
                                    <IoSearchOutline className="ml-3 mr-1 w-5 h-5" />
                                    <input
                                        className="w-[90%] bg-gray-100 rounded-xl p-1 outline-none"
                                        placeholder="Tìm kiếm bài đăng"
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') handleSubmit(e);
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
                                {allPost?.map((item, index) => (
                                    <tr key={item?._id} className="border content-center">
                                        <td className="text-start flex items-center p-1">
                                            <img className="w-10 h-10 rounded-full" src={item?.userId?.avatar} alt="" />
                                            <Link to={`/user/${item?.userId?._id}`} className="ml-5 hover:underline">
                                                {item?.userId?.username}
                                            </Link>
                                        </td>
                                        <td className="py-3 w-[40%] max-w-[40%]">
                                            <div className="gap-2 flex items-center ml-5 ">
                                                <p className=" line-clamp-1 ">{item?.content}</p>
                                            </div>
                                        </td>

                                        <td>{moment(item?.createdAt).format('DD/MM/YYYY')}</td>
                                        <td>{moment(item?.updateAt).format('DD/MM/YYYY')}</td>
                                        <td className="text-center content-center">
                                            <div className="flex justify-end items-center gap-2">
                                                <button
                                                    className="hover:bg-gray-200 p-2 rounded-full"
                                                    onClick={() => {
                                                        setPostId(item?._id);
                                                        togglePopup();
                                                    }}
                                                >
                                                    <FaEye />
                                                </button>
                                                <Popconfirm
                                                    title={'Xóa bài viết'}
                                                    description={'Bạn chắc chắn muốn xóa bài viết này không?'}
                                                    onConfirm={() => handleDeletePost(item?._id)}
                                                    okText="Có"
                                                    cancelText="Không"
                                                >
                                                    <div className="p-2 mr-2  flex items-center justify-center cursor-pointer hover:bg-gray-200 rounded-full">
                                                        <MdDeleteOutline className="w-6 h-6" />
                                                    </div>
                                                </Popconfirm>
                                            </div>
                                            <DetailPosts isOpen={isPopupOpen} onClose={togglePopup} postId={postId} />
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

export default ManagePost;
