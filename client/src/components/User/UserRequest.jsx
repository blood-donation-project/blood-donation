import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';

import Avatar from '../Image/Avatar';
import UserPreview from './UserPreview';

/*
-- Props data
    {
        image : "http://....",
        full_name : "Hung Phi"
    }
*/
const UserRequest = ({ className, data }) => {
    return (
        <Link className={className}>
            <div className="bg-white rounded-[8px] overflow-hidden shadow-md">
                <Avatar
                    className="object-cover w-full h-full aspect-square "
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
                    alt="avatar"
                />
                <div className="p-2 shadow-sm">
                    <span className="text-[14px] font-semibold">Hung Phi</span>
                    <div className="flex flex-col">
                        <button
                            type="button"
                            className="rounded py-1 text-[14px] hover:bg-[#1c5291] text-white font-medium bg-[#386fd6]"
                        >
                            Xác nhận
                        </button>
                        <button
                            type="button"
                            className="rounded py-1 text-[14px] mt-2 bg-[#ebedf0;] hover:bg-[#d2d2d2] "
                        >
                            Xóa
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default UserRequest;
