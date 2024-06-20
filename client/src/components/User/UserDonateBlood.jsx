import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';
import { LuUserPlus } from 'react-icons/lu';
import { MdLocationPin, MdBloodtype } from 'react-icons/md';

import UserPreview from './UserPreview';
import Avatar from '../Image/Avatar';

const UserDonateBlood = ({ className, userData }) => {
    const sendRequestHelp = () => {
        //
    };
    return (
        <div className="bg-white rounded-[8px] overflow-hidden ">
            <Link className={className} to={`/user/${userData._id}`}>
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
                            <UserPreview userData={userData} />
                        </div>
                    )}
                >
                    <div className="">
                        <Avatar
                            className="object-cover w-full h-full aspect-square  overflow-hidden"
                            src={userData.avatar}
                            alt="avatar"
                        />

                        <div className="flex flex-col justify-center p-2">
                            <h4 className="text-[16px] font-semibold">{userData.username}</h4>
                            <div className="text-[12px] text-[#65676B] flex items-center">
                                <MdBloodtype />
                                <span className="ml-1">{userData.bloodGroup || 'Không xác định'}</span>
                            </div>
                        </div>
                    </div>
                </Tippy>
            </Link>
            <div className="flex-center  p-1">
                {' '}
                <button
                    className="px-3 py-1.5 bg-[#386fd6] rounded hover:bg-[#1c5291] text-white w-full"
                    onClick={sendRequestHelp}
                    type="button"
                >
                    Gửi yêu cầu
                </button>
            </div>
        </div>
    );
};

export default UserDonateBlood;
