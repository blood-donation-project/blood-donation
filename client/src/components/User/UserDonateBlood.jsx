import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';
import { LuUserPlus } from 'react-icons/lu';
import { MdLocationPin, MdBloodtype } from 'react-icons/md';

import UserPreview from './UserPreview';
import Avatar from '../Image/Avatar';

/*
    {
        // Data user (name,email,....)
    }
*/

const UserDonateBlood = ({ className, data }) => {
    return (
        <Link className={className}>
            <Tippy
                interactive={true}
                placement="bottom-start"
                delay={[400, 0]}
                appendTo={document.body}
                render={(attrs) => (
                    <div
                        className="bg-white shadow-md z-[99] shadow-black w-[340px] rounded-[6px] transition absolute left-[-100px] top-[-10px]"
                        tabIndex="-1"
                        {...attrs}
                    >
                        <UserPreview data={null} />
                    </div>
                )}
            >
                <div className="bg-white rounded-[8px] overflow-hidden ">
                    <Avatar
                        className="object-cover w-full h-full aspect-square  overflow-hidden"
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
                        alt="avatar"
                    />

                    <div className="flex flex-col justify-center p-2">
                        <h4 className="text-[15px] font-semibold">Nguyễn Đình Tú</h4>
                        <div className="text-[12px] text-[#65676B] flex items-center">
                            <MdBloodtype />
                            <span className="ml-1">AB+</span>
                        </div>
                        {/* User donate blood  */}

                        <div className="text-[12px] text-[#65676B] flex items-center">
                            <LuUserPlus />
                            <span className="ml-1">Người hiến máu</span>
                        </div>
                    </div>
                </div>
            </Tippy>
        </Link>
    );
};

export default UserDonateBlood;
