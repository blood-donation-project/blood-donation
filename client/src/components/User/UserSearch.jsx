import { Link } from 'react-router-dom';

import Avatar from '../Image/Avatar';
const UserSearch = ({ userData }) => {
    return (
        <Link className="flex p-1.5 hover:bg-[#ebedf0]  rounded-md " to={`/user/${userData._id}`}>
            <div>
                <Avatar className="w-9 h-9 rounded-[50%]" src={userData.avatar} alt="avatar" />
            </div>
            <div className="ml-2 flex justify-center flex-col">
                <p className="text-[14px] leading-[14px] font-semibold">{userData.username}</p>
                {userData.role === 'Cơ sở y tế' ? (
                    <p className="text-[12px]">Cơ sở y tế</p>
                ) : (
                    userData.isFriend && <p className="text-[12px]">Bạn bè</p>
                )}
            </div>
        </Link>
    );
};

export default UserSearch;
