// src/components/DetailJoiner.js
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetEventByIdEventQuery } from '../../Redux/features/events/eventAPI';
const DetailJoiner = ({
    isOpen,
    onClose,
    userRegister,
    userData,
    userRegisted,
}) => {
    const params = useParams();
    const { data, error } = useGetEventByIdEventQuery(params.id);
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-30">
            <div className="bg-white rounded-lg max-w-2xl w-full p-8 mx-auto">
                <div className="flex justify-between items-center border-b pb-4">
                    <h2 className="text-xl font-bold">Người tham gia</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                <div className="mt-6">
                    <div className="pb-2 border-b-2 border-blue-500 text-blue-500">
                        Sẽ tham gia ({userRegister?.data?.count})
                    </div>
                    <div className="mt-6">
                        <div className="">
                            <div className="flex items-center space-x-6 mb-6">
                                <div className="bg-gray-300 text-white rounded-full h-12 w-12 flex items-center justify-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M17 20h5v-2a4 4 0 00-3-3.87M9 20h6m-6 0a4 4 0 01-4-4V5a2 2 0 012-2h10a2 2 0 012 2v11a4 4 0 01-4 4m-6 0v2m6-2v2M7 10h.01M11 10h.01M15 10h.01M7 14h.01M11 14h.01M15 14h.01"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <div className="font-semibold">
                                        Có {userRegister?.data?.count} người
                                        phản hồi là tham gia
                                    </div>
                                    <div className="text-gray-500">
                                        Những người phản hồi là tham gia sẽ hiển
                                        thị ở đây.
                                    </div>
                                </div>
                            </div>
                            {userData?.role === 'Cơ sở y tế' &&
                            userData?._id === data?.userId ? (
                                <div className={`overflow-y-auto max-h-80`}>
                                    {userRegister?.data?.result?.map(
                                        (item, index) => (
                                            <Link
                                                key={item?.userId?._id}
                                                to={`/user/${item?.userId?._id}`}
                                                className="flex items-center space-x-6 hover:bg-gray-200 p-1 mb-2 rounded-xl"
                                            >
                                                <img
                                                    className="w-12 h-12 rounded-full"
                                                    src={
                                                        item?.userId?.avatar ||
                                                        `https://res.cloudinary.com/dkjwdmndq/image/upload/v1717860215/news_images/yelzul3f8fofpghnwmig.jpg`
                                                    }
                                                    alt=""
                                                />
                                                <div className="text-lg">
                                                    {item?.userId.username}
                                                </div>
                                            </Link>
                                        )
                                    )}
                                </div>
                            ) : (
                                <div className={`overflow-y-auto max-h-80`}>
                                    {userRegisted?.map((item, index) => (
                                        <Link
                                            key={item?.userId?._id}
                                            to={`/user/${item?.userId?._id}`}
                                            className="flex items-center space-x-6 hover:bg-gray-200 p-1 mb-2 rounded-xl"
                                        >
                                            <img
                                                className="w-12 h-12 rounded-full"
                                                src={
                                                    item?.userId?.avatar ||
                                                    `https://res.cloudinary.com/dkjwdmndq/image/upload/v1717860215/news_images/yelzul3f8fofpghnwmig.jpg`
                                                }
                                                alt=""
                                            />
                                            <div className="text-lg">
                                                {item?.userId.username}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailJoiner;
