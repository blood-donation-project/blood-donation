import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';
import { FaPhoneAlt } from 'react-icons/fa';
import { MdLocationPin, MdBloodtype } from 'react-icons/md';

import UserPreview from './UserPreview';
import Avatar from '../Image/Avatar';

const UserBloodDonationFacility = () => {
    return (
        <div className="flex justify-between p-2 rounded-lg bg-white mb-2">
            <Tippy
                interactive={true}
                placement="bottom-start"
                delay={[400, 0]}
                appendTo={document.body}
                render={(attrs) => (
                    <div
                        className="bg-white shadow-md w-[340px] rounded-[6px] transition absolute left-[-100px] top-[-10px]"
                        tabIndex="-1"
                        {...attrs}
                    >
                        <UserPreview />
                    </div>
                )}
            >
                <Link className="flex cursor-pointer items-center" to={'/user/123'}>
                    <Avatar
                        className={'rounded-[50%] w-[60px] h-[60px] border border-[#ccc] '}
                        src={'https://vienhuyethoc.vn/wp-content/uploads/2020/01/logo.png'}
                        alt={'avatar'}
                    />
                    <div className="ml-3 flex flex-col justify-center">
                        <h4 className="text-[15px] font-semibold line-clamp-1">
                            TRUYỀN MÁU TRUNG ƯƠNG - Quận Hoàn Kiếm
                        </h4>
                        <div className="text-[12px] text-[#65676B] flex items-center">
                            <FaPhoneAlt />
                            <span className="ml-1">0123543724</span>
                        </div>
                    </div>
                </Link>
            </Tippy>
            <div className="flex-center">
                <div className=" px-2 py-0.5 text-[14px]  text-[#65676B] flex items-center">
                    <MdLocationPin />
                    <span className="ml-1">Hoàn Kiếm, Hà Nội</span>
                </div>
            </div>
        </div>
    );
};

export default UserBloodDonationFacility;
