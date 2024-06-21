import { Link } from 'react-router-dom';

import Avatar from '../Image/Avatar';

const UserFriend = ({ className, userData }) => {
    return (
        <Link className={className} to={`/user/${userData._id}`}>
            <div className="bg-white rounded-[8px] overflow-hidden shadow-md">
                <Avatar className="object-cover w-full h-full aspect-square " src={userData.avatar} alt="avatar" />
                <div className="p-2 shadow-sm ">
                    <span className="text-[16px] font-medium line-clamp-1">{userData.username}</span>
                </div>
            </div>
        </Link>
    );
};

export default UserFriend;
