import React, { useEffect } from 'react';
import { useGetAllPostsByAdminMutation } from '../../Redux/features/post/postAPI';
import { FaXmark } from 'react-icons/fa6';
import moment from 'moment';

const DetailPosts = ({ isOpen, onClose, postId }) => {
    const [getAllPost, { data: dataPosts }] = useGetAllPostsByAdminMutation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getAllPost(postId).unwrap();
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [getAllPost, postId]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="relative mx-auto p-5 border w-full max-w-2xl h-auto max-h-full overflow-y-auto shadow-lg rounded-lg bg-white">
                <button className="absolute top-0 right-0 m-3 text-gray-600 hover:text-gray-900" onClick={onClose}>
                    <FaXmark className="w-5 h-5" />
                </button>
                <div className="flex">
                    <img className="w-12 h-12 rounded-full mr-4" src={dataPosts?.[0]?.userId?.avatar} alt="Avatar" />
                    <div className="flex justify-start flex-col">
                        <h3 className="text-lg font-semibold w-fit ">{dataPosts?.[0]?.userId?.username}</h3>
                        <p className="text-sm text-gray-500 w-fit">{moment(dataPosts?.[0]?.createdAt).fromNow()}</p>
                    </div>
                </div>
                <p className="mt-4 text-start">{dataPosts?.[0]?.content}</p>
                <img className="mt-4 w-full h-auto" src={dataPosts?.[0]?.image} alt="" />
            </div>
        </div>
    );
};

export default DetailPosts;
