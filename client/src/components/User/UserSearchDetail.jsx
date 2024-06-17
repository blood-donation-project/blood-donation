import Tippy from '@tippyjs/react/headless';
import { Link } from 'react-router-dom';

import UserPreview from './UserPreview';
import Avatar from '../Image/Avatar';

const UserSearchDetail = ({ userData }) => {
    return (
        <div className="flex justify-between p-2 rounded-lg bg-white">
            <Tippy
                interactive={true}
                placement="bottom-start"
                delay={[400, 0]}
                render={(attrs) => (
                    <div
                        className="bg-white shadow-md w-[340px] rounded-[6px] transition absolute left-[-100px] top-[-10px]"
                        tabIndex="-1"
                        {...attrs}
                    >
                        <UserPreview userData={userData} />
                    </div>
                )}
            >
                <Link className="flex cursor-pointer items-center" to={'/user/123'}>
                    <Avatar
                        className={'rounded-[50%] w-[60px] h-[60px] border border-[#ccc] '}
                        src={userData.avatar}
                        alt={'avatar'}
                    />
                    <div className="ml-3 flex flex-col justify-center">
                        <h4 className="text-[15px] font-semibold">{userData.username}</h4>
                        <div className="text-[12px] text-[#65676B]">
                            <span className="">Sống tại {userData.address.province}</span>
                        </div>
                    </div>
                </Link>
            </Tippy>
        </div>
    );
};

export default UserSearchDetail;
