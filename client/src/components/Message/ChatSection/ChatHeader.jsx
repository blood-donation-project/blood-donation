import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetUserByIdMutation } from '../../../Redux/features/user/userAPI';

// Chat Header component
const ChatHeader = () => {
    const [getUserById, { data: userProfile }] = useGetUserByIdMutation();
    const params = useParams();
    useEffect(() => {
        const fetchData = async (req, res) => {
            try {
                const userId = params.id;
                await getUserById(userId).unwrap();
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [getUserById, params.id]);
    console.log(userProfile);
    return (
        <div className="chat-header  px-6 py-2 flex flex-row flex-none justify-between items-center border-b shadow-lg">
            <Link
                to={`/user/${userProfile?.user?._id}`}
                className="flex hover:bg-gray-200 p-2 rounded-lg cursor-pointer"
            >
                <div className="w-12 h-12  mr-4 relative flex flex-shrink-0">
                    <img
                        className="shadow-md rounded-full w-full h-full object-cover"
                        src={userProfile?.user?.avatar}
                        alt=""
                    />
                </div>
                <div className="text-sm flex items-center">
                    <p className="font-bold text-lg">
                        {userProfile?.user?.username}
                    </p>
                    <p>{userProfile?.lastActive}</p>
                </div>
            </Link>

            <div className="flex">
                {/* Additional icons or actions can be added here */}
            </div>
        </div>
    );
};

export default ChatHeader;
